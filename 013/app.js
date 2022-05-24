//jshint esversion:6
const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const app=express();

//설정
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
mongoose.connect("mongodb+srv://user1:pass1@cluster0.cw4wk.mongodb.net/workoutDB");
const workoutSchema = new mongoose.Schema({
  work_name: {
    type: String,
    required: true
  },
  work_weight: {
    type: Number,
    required: true,
    min: 0
  },
  work_desc: String
})
const Workout = new mongoose.model("Workout", workoutSchema);
let data=[];

//메인
app.route("/")
.get((req, res)=>{
  Workout.find((err, founds)=>{
    data=founds;
    res.render("main", {data: data});
  })
})
.post((req, res)=>{
  const work_name=req.body.wName;
  const work_weight=req.body.wWeight;
  const newWorkout = new Workout({
    work_name: work_name,
    work_weight: work_weight
  })
  newWorkout.save(()=>{
    Workout.find((err, founds)=>{
      data=founds;
      res.render("main", {data: data});
    })
  });
});

app.route("/update")
.get((req, res)=>{
  Workout.find((err, founds)=>{
    data=founds;
    res.render("main", {data: data});
  })
})
.post((req, res)=>{
  const postID=req.body.wID;
  const postBtn=Number(req.body.btn);
  console.log(postID);
  Workout.findById(postID, (err, found)=>{
    const changes=found.work_weight + postBtn;
    Workout.updateOne(
      {_id: postID},
      {work_weight: changes},
      (err, result)=>{
        Workout.find((err, founds)=>{
          data=founds;
          res.render("main", {data: data});
        })
      }
    )
  })
});

app.route("/delete")
.get((req, res)=>{
  Workout.find((err, founds)=>{
    data=founds;
    res.render("main", {data: data});
  })
})
.post((req, res)=>{
  const postID=req.body.wID;
  console.log(postID);
  Workout.findById(postID, (err, found)=>{
    Workout.deleteOne(
      {_id: postID},
      (err, result)=>{
        console.log(deletedCount+"개 삭제");
        Workout.find((err, founds)=>{
          data=founds;
          res.render("main", {data: data});
        });
      }
    )
  })
});


app.listen(3000, (err)=>{
    !err?console.log("Server started on port 3000."):console.log(err);
})
