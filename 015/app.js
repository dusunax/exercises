//jshint esversion:6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017");

app.get("/", (req, res) => {
    res.render("main");
});
app.route("/stories")
.get((req, res) => {
    res.render("main");
});

app.listen(3000, (req, res) => {
    console.log("Server started on port 3000.");
});