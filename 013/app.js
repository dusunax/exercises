//jshint esversion:6
const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const md5=require('md5');
const ejs=require("ejs");
const { stringify } = require("querystring");
const app=express();
let idx=0;

//설정
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
mongoose.connect("mongodb+srv://user1:pass1@cluster0.cw4wk.mongodb.net/workoutDB");
//구조 바꾸기---------------------------------------------
// const workoutSchema = new mongoose.Schema({
//   idx: Number,
//   userID: String,
//   work_name: {
//     type: String,
//     required: true
//   },
//   work_weight: {
//     type: Number,
//     required: true,
//     min: 0
//   },
//   work_desc: String
// })
const newWorkoutSchema = new mongoose.Schema({
  userID: String,
  items: [{
    item_idx: Number,
    work_name: String,
    work_weight: {
      type: Number,
      min: 0
    },
    work_desc: String
  }]
})
const Workout = new mongoose.model("Workout", newWorkoutSchema);
const userSchema = {
  userID: {
    type: String,
    unique: true
  },
  userPW: String,
  googleId: String,
  kakaoId: String
};
const WorkUser = new mongoose.model("WorkUser", userSchema);
let data=[];

//메인
app.route("/")
.get((req, res)=>{
  res.render('main', {stage: "login"});
  // Workout.deleteMany({}, (err, result)=>{
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
      // console.log(postPW, found.userPW);
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
        //
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
    if(changes > 0){
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
    } else {
      Workout.deleteOne(
        {_id: postID},
        (err)=>{
          Workout.find((err, founds)=>{
            data=founds;
            res.render("workout", {data: data, userID: req.body.userID});
          })
        }
      )
    }
  })
})
.patch((req, res)=>{
  // 운동 이름바꾸기---------------------------------------------
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

let port=process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}
app.listen(port, (err)=>{
    !err?console.log("Server started"):console.log(err);
})
