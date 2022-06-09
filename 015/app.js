//jshint esversion:6
require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(`mongodb+srv://${process.env.ID}:${process.env.PW}@cluster0.cw4wk.mongodb.net/StoryDB`);

const storySchema = new mongoose.Schema ({
    author: String,
    title: String,
    placeName: String,
    address: String,
    descript: String,
    imgUrl: String
});
const Story = new mongoose.model("Story", storySchema);

app.get("/", (req, res) => {
    res.render("start");
    // Story.deleteMany((err)=>{console.log("all del");})
});

app.route("/stories")
.get((req, res) => {
    Story.find({}, (err, found)=>{
        res.render("main", {items: found});
    })
});

app.route("/stories/:id")
.get((req, res) => {
    console.log(req.params);
    // 게시물 특정해서 render
    Story.findById(req.params.id, (err, found)=>{
        if(err){ console.log(err) } else {
            res.render("stories", {foundItem: found});
        }
    })
});

app.route("/upload")
.get((req, res) => {
    res.render("upload");
})
.post((req, res) => {
    const newStory = new Story({
        author: req.body.author,
        title: req.body.title,
        placeName: req.body.placeName,
        address: req.body.address,
        descript: req.body.descript,
        imgUrl: req.body.picture
    });
    console.log(newStory);
    newStory.save((err, result)=>{
        if(err){
            console.log(err);
        } else {
            console.log("New story saved!");
            res.render("stories", {foundItem: result});
        }
    });
});

//
let port=process.env.PORT;
(port == "" || port == null)?port=3000:"";
app.listen(port, (req, res) => {
    console.log("Server started on port "+port);
});