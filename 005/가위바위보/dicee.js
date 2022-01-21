window.addEventListener("DOMContentLoaded", function() {
  let dice_box=document.querySelectorAll('.dice');
  let dice_left_img = document.querySelector(".img_player1");
  let dice_right_img = document.querySelector(".img_player2");
  let result_text=document.querySelector(".result_text");
  // console.log(dice_left_img.setAttribute('src', 'images/dice2.png'));
  let btn=document.querySelector('.btn');
  btn.addEventListener('click', dice_active);


  function dice_active(){
    let num_player1=int_rand();
    let num_player2=int_rand();
    set_dice_img({
      el:dice_left_img,
      num:num_player1,
    });
    set_dice_img({
      el:dice_right_img,
      num:num_player2,
    });
    dice_box.forEach((dice)=>{dice.classList.remove("win")});
    if(num_player1==num_player2){
      result_text.innerHTML="Draw!😮";
      dice_box.forEach((dice)=>{dice.classList.add("win")});
    } else if (num_player1>num_player2){
      result_text.innerHTML="🏆 <span>Player 1</span> is Win!";
      dice_box[0].classList.add('win');
    } else {
      result_text.innerHTML="<span>Player 2</span> is Win! 🏆";
      dice_box[1].classList.add('win');
    }
  }
  function int_rand(){
    let rand_num=Math.floor((Math.random()*6))+1;
    return rand_num;
  }
  function set_dice_img(input){
    let img_src="images/dice"+input.num+".png";
    input.el.setAttribute('src', img_src);
  }

});
