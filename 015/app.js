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

const storySchema = new mongoose.Schema ({
    author: String,
    title: String,
    place: [{
        placeName: String,
        address: String,
        coordinate: String,
    }],
    descript: String,
    imgUrl: String
});
const Story = new mongoose.model("Story", storySchema);

app.get("/", (req, res) => {
    res.render("start");
});

app.route("/stories")
.get((req, res) => {
    res.render("main");
});

app.route("/stories/:id")
.get((req, res) => {
    console.log(req.params);
    // 게시물 특정해서 render
    res.render("stories");
});

app.route("/upload")
.get((req, res) => {
    res.render("upload");
})
.post((req, res) => {
    console.log("new post")
    const newStory = ({
        author: req.body.author,
        title: req.body.title,
        place: [{
            placeName: req.body.placeName,
            address: req.body.address
        }],
        descript: req.body.descript,
        imgUrl: req.body.picture
    });
    console.log(newStory);
    res.render("stories");
});


//
app.listen(3000, (req, res) => {
    console.log("Server started on port 3000.");
});