const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const MySQLStorage = require("express-mysql-session")(session);
const flash = require("connect-flash");
const passport = require("passport");

const { database } = require("./keys");
require("./lib/passport");

// Initializations
const app = express();

// Settings
app.set("port", process.env.PORT || "4000");
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars"),
  })
);
app.set("view engine", ".hbs");

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "saverlinkbymarlonruiz",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStorage(database),
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Global Variables
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.message = req.flash('message');
  app.locals.user = req.user;
  next();
});

// Routes
app.use(require("./routes"));
app.use("/links", require("./routes/linker"));
app.use("/", require("./routes/authentication"));

// Public
app.use(express.static(path.join(__dirname, "public")));

// Startin Server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
