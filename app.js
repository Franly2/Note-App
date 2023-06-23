const fungsi = require("./database");
const methodOverride = require("method-override");
const express = require("express");
const app = express();
app.use(methodOverride("_method"));
const ejs = require("ejs");
app.set("view engine", "ejs");
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.use(express.static("public"));
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

// ! CREATE new note
app.post("/submit", async (req, res) => {
  let data = req.body;
  console.log(data);

  fungsi.createNote(req.body);
  res.redirect("/");

  // let notes = await fungsi.getAllNotes();
  // res.render("index", {
  //   layout: "layouts/main-layout",
  //   notes,
  // });
});

// ! GET all notes
app.get(`/`, async function (req, res) {
  let notes = await fungsi.getAllNotes();
  res.render("index", {
    layout: "layouts/main-layout",
    notes,
  });
});

// ! UPDATE note
app.put("/update", async (req, res) => {
  let data = req.body.title;
  console.log(data);
  const id = req.body.id;
  const title = req.body.title;
  const content = req.body.content;

  fungsi.updateNote(title, content, id);
  res.redirect("/");

  // let notes = await fungsi.getAllNotes();
  // res.render("index", {
  //   layout: "layouts/main-layout",
  //   notes,
  // });
});

// ! DELETE note
app.delete("/delete", async (req, res) => {
  let id = req.body.id;
  // console.log(id);

  fungsi.deleteNote(id);
  res.redirect("/");

  // let notes = await fungsi.getAllNotes();
  // res.render("index", {
  //   layout: "layouts/main-layout",
  //   notes,
  // });
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000");
});
