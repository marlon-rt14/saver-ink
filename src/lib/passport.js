const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const pool = require("../database");
const helper = require("../lib/helpers");

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const users = await pool.query("SELECT * FROM users WHERE username = ?", [
        username,
      ]);
      if (users.length > 0) {
        const user = users[0];
        const validPassword = await helper.matchPassword(
          password,
          user.password
        );
        if (validPassword) {
          return done(null, user, req.flash("success", "Welcome " + user.username));
        } else {
          return done(null, false, req.flash("message", "Incorrect password"));
        }
      } else {
        return done(
          null,
          false,
          req.flash("message", "This username does not exists")
        );
      }
    }
  )
);

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { fullname } = req.body;
      const newUser = {
        fullname,
        username,
        password,
      };
      newUser.password = await helper.encryptPassword(password);
      const result = await pool.query("INSERT INTO users SET ?", [newUser]);
      newUser.id_user = result.insertId;
      return done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id_user);
});

passport.deserializeUser(async (id_user, done) => {
  const users = await pool.query("SELECT * from users WHERE id_user = ?", [id_user]);
  done(null, users[0]);
});
