const express = require("express");
const router = express.Router();

const pool = require("../database");
const { isLoggedIn } = require('../lib/auth');

router.get("/", isLoggedIn, async (req, res) => {
  const links = await pool.query("SELECT * FROM links WHERE id_user = ?", [req.user.id_user]);
  res.render("links/list", { links });
});

router.get("/add", isLoggedIn, (req, res) => {
  res.render("links/add");
});

router.post("/add", async (req, res) => {
  const { title, url, description } = req.body;
  const newLink = {
    title,
    url,
    description,
    id_user: req.user.id_user
  };
  await pool.query("INSERT INTO links SET ?", [newLink]);
  req.flash("success", "Link was added successfully");
  res.redirect("/links");
});

router.get("/delete/:id",isLoggedIn, async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM links WHERE id_link = ?", [id]);
  res.redirect("/links");
});

router.get("/edit/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const link = await pool.query("SELECT * FROM links WHERE id_link = ?", [id]);
  res.render("links/edit", { link: link[0] });
});

router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { title, url, description } = req.body;
  const newLink = {
    title,
    url,
    description,
  };
	await pool.query("UPDATE links SET ? WHERE id_link = ?", [newLink, id]);
	res.redirect('/links');
});

module.exports = router;
