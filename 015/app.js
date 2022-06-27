//jshint esversion:6
require("dotenv").config();
const fs = require("fs");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { render } = require("express/lib/response");

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(`mongodb+srv://user1:pass1@cluster0.cw4wk.mongodb.net/StoryDB`);

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
    // 게시물 특정해서 render
    Story.findById(req.params.id, (err, found)=>{
        if(err){ console.log(err) } else {
            res.render("stories", {foundItem: found, mapKey: process.env.MAP_KEY});
        }
    })
});

app.route("/upload")
.get((req, res) => {
    // res.render("upload");
    res.render("upload", {mapKey: process.env.MAP_KEY});
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
    newStory.save((err, result)=>{
        if(err){
            console.log(err);
        } else {
            console.log("New story saved!");
            res.render("stories", {foundItem: result, mapKey: process.env.MAP_KEY});
        }
    });
});

// app.listen(process.env.PORT || 3000, ()=>{
//     console.log("server started.", this.address().port, app.settings.env);
// });
app.listen(3000, ()=>{
    console.log("server started.");
});

// file업로드: multer
const multer = require("multer");
var storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb)=> {
        cb(null, file.originalname);
    }
})
var upload = multer({ storage: storage })

app.get('/uploading', (req, res)=>{
    res.render('start');
});
app.post('/uploading', upload.single('userfile'), (req, res)=> {
    console.log(req.file);
    res.render('confirmation', {
        file: req.body.file
    });
});