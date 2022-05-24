//jshint esversion:6
const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const md5=require('md5');
const ejs=require("ejs");
const { stringify } = require("querystring");
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
  work_desc: String,
  userID: String
})
const Workout = new mongoose.model("Workout", workoutSchema);
const userSchema = {
  userID: {
    type: String,
    unique: true,
    required: true
  },
  userPW: String
};
const WorkUser = new mongoose.model("WorkUser", userSchema);
let data=[];

//메인
app.route("/")
.get((req, res)=>{
  res.render('main', {stage: "login"});
  // WorkUser.deleteMany({}, (err, result)=>{
  //   !err?console.log(result.deletedCount+"개 삭제완료"):"";
  // })
});

// 멤버
app.route("/login")
.get((req, res)=>{
  res.render('main', {stage: "login"});
})
.post((req, res)=>{
  const postID=req.body.userID;
  const postPW=md5(req.body.userPW);
  WorkUser.findOne({userID: postID}, (err, found)=>{
    if(found){
      console.log(postPW, found.userPW);
      if(found.userPW == postPW){
        Workout.find((err, founds)=>{
          data=founds;
          res.render("workout", {data: data, userID: postID});
        })
      } else {
        console.log("비밀번호 틀림");
        res.render('main', {stage: "login"});
      }
    } else {
      res.send("<h4 style='text-align: center; margin: 20% auto'>잘못된 로그인 요청입니다.<br>(아이디를 확인해주세요.)</h4>");
      res.render('main', {stage: "login"});
    }
  })
});

app.route("/user")
.get((req, res)=>{
  res.render('main', {stage: "register"});
})
.post((req, res)=>{
  const newUser=new WorkUser({
    userID: req.body.userID,
    userPW: md5(req.body.userPW)
  })
  console.log(newUser);
  newUser.save((err)=>{
    if(err){
      res.send("<h4 style='text-align: center; margin: 20% auto'>잘못된 회원가입 요청입니다.<br>(아이디를 확인해주세요.)</h4>");
    } else {
      console.log("new user created.");
      Workout.find((err, founds)=>{
        data=founds;
        res.render("workout", {data: data, userID: req.body.userID});
      })
    }
  });
});

// 아이템
app.route("/add")
.get((req, res)=>{
  Workout.find((err, founds)=>{
    data=founds;
    res.render("workout", {data: data, userID: req.body.userID});
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
      res.render("workout", {data: data, userID: req.body.userID});
    })
  });
});

app.route("/update")
.get((req, res)=>{
  Workout.find((err, founds)=>{
    data=founds;
    res.render("workout", {data: data, userID: req.body.userID});
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
          res.render("workout", {data: data, userID: req.body.userID});
        })
      }
    )
  })
});

app.route("/delete")
.get((req, res)=>{
  Workout.find((err, founds)=>{
    data=founds;
    res.render("workout", {data: data, userID: req.body.userID});
  })
})
.post((req, res)=>{
  const postID=req.body.wID;
  console.log(postID);
  Workout.findById(postID, (err, found)=>{
    Workout.deleteOne(
      {_id: postID},
      (err, result)=>{
        Workout.find((err, founds)=>{
          data=founds;
          res.render("workout", {data: data, userID: req.body.userID});
        });
      }
    )
  })
});

app.listen(3000, (err)=>{
    !err?console.log("Server started on port 3000."):console.log(err);
})
