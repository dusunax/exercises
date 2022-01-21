window.addEventListener("DOMContentLoaded", function() {
  let winning_set=3;
  let auto_wins=0;
  let user_wins=0;
  let player_box=document.querySelectorAll('.player');
  let r_p_s_array=["rock", "paper", "scissors"]
  let img_left = document.querySelector(".img_player1");
  let img_right = document.querySelector(".img_player2");
  let result_text=document.querySelector(".result_text");
  let btns=document.querySelectorAll('.btn');
  btns.forEach((btn)=>{
    btn.addEventListener('click', btn_press_event);
  })
  function btn_press_event(){
    let user_selected=this.getAttribute('id');
    let auto_selected=r_p_s_array[int_rand()];
    set_r_p_s_img({
      el:img_left,
      choose:auto_selected,
    });
    set_r_p_s_img({
      el:img_right,
      choose:user_selected,
    });
    calc_match(auto_selected, user_selected)
  }
  function calc_match(auto, user){
    player_box.forEach((r_p_s)=>{r_p_s.classList.remove("win")});
    if(auto==user){
      draw();
    } else if(user=="scissors"){
      if (auto=="paper"){
        you_win();
      } else {
        you_lose();
      }
    } else if(user=="rock"){
      if (auto=="scissors"){
        you_win();
      } else {
        you_lose();
      }
    } else if(user=="paper"){
      if (auto=="rock"){
        you_win();
      } else {
        you_lose();
      }
    }
  }
  function draw(){
    result_text.innerHTML="<span>비겼어요!</span><br>Draw!😮";
    player_box.forEach((r_p_s)=>{r_p_s.classList.add("win")});
  }
  function you_win(){ 
    result_text.innerHTML="이겼습니다!<br><span>You</span> Win! 🏆 ";
    player_box[1].classList.add('win');
    player_box[1].lastElementChild.children[user_wins].classList.add("on");
    user_wins+=1;
    if(user_wins==3){
      setTimeout(()=>{
          alert("승리! :-)");
          location.reload();
      }, 300)
    }
  }
  function you_lose(){ 
    result_text.innerHTML="졌습니다!<br><span>You</span> lose!😢";
    player_box[0].classList.add('win');
    player_box[0].lastElementChild.children[auto_wins].classList.add("on");
    auto_wins+=1;
    if(auto_wins==3){
      setTimeout(()=>{
          alert("패배! :-(")
          location.reload();
      }, 300)
    }
  }
  function int_rand(){
    let rand_num=Math.floor((Math.random()*3));
    return rand_num;
  }
  function set_r_p_s_img(input){
    let img_src="images/rock_paper_scissors/"+input.choose+".png";
    input.el.setAttribute('src', img_src);
  }
});
