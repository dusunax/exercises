let btnColor = ['cyan', 'magenta', 'yellow', 'black'];
let level = 0;
let gamemode = 1;
let idx_chking=0;
let rand;
let randColor = btnColor[rand];
let gamePattern = [];
let userChosenColor;
let userChosenPattern=[];
let anwser;

// 게임진행
$(document).keydown(function() {
  if(level==0){
    switch(event.key){
      case 'Enter':
        nextSequence();
        break;
      case '0':
        gamemode = 2;
        nextSequence();
        break;
      default:
    }
  }
  if(!anwser){
    switch(event.key){
      case 'r':
        location.reload();
        break;
      default:
    }
  }
});
function nextSequence() {
  console.log('레벨업');
  rand = Math.floor(Math.random() * 4);
  gamePattern.push(rand);
  for (let i = 0; i < gamePattern.length; i++) {
    setTimeout(() => {
      btnPressActive(gamePattern[i]);
      showNextEffect(gamePattern[i]);
      if(i==gamePattern.length-1){$('.btn').removeClass('unable')}
    }, ((i+1) * 500 / gamemode));
  }
  $('.title_top').html(`레벨: ${level++}`)
  $('.btn').addClass('unable');
  console.log(gamePattern);
}
// 버튼 클릭이벤트 핸들, 키다운이벤트(trigger)
$('.btn').click(function() {
  if(level==0){
    alert('시작하려면 enter키를 눌러주세요.');
    return;
  }
  btnPressActive(userChosenColor = $(this).index());
  userChosenPattern.push(userChosenColor);
  if(anwser=chkAnswer()){
      chooseRight(userChosenColor);
      idx_chking+=1;
      if(idx_chking == level){
        setTimeout(()=>{
          nextSequence();
        }, 500)
        idx_chking=0;
        userChosenPattern=[];
      }
  } else {
    chooseWrong(userChosenColor);
  }
});
$(document).keydown(function(){
  switch(event.key){
    case '1':
      $('.btn').eq(0).trigger('click');
      break;
    case '2':
      $('.btn').eq(1).trigger('click');
      break;
    case '3':
      $('.btn').eq(2).trigger('click');
      break;
    case '4':
      $('.btn').eq(3).trigger('click');
      break;
    default:
  }
})
// 함수들
function chkAnswer(){
  if(gamePattern[idx_chking] == userChosenPattern[idx_chking]){
    return true;
  } else {
    return false;
  }
}
function btnPressActive(idx) {
  btnPlaySound(idx);
  $('.btn').eq(idx).css({
    animation: 'none'
  })
  console.log('press'+idx);
}
function showNextEffect(idx) {
  setTimeout(() => {
    $('.btn').eq(idx).css({
      animation: 'btn_click 0.3s'
    })
  }, 100)
}
function chooseRight(idx) {
  setTimeout(() => {
    $('.btn').eq(idx).css({
      animation: 'btn_click 0.3s, btn_right 0.2s'
    })
  }, 100)
}
function chooseWrong(idx) {
  setTimeout(() => {
    $('.btn').eq(idx).css({
      animation: 'btn_click 0.3s, btn_wrong 0.2s'
    })
  }, 100)
  let audio = new Audio(`sounds/wrong.mp3`)
  audio.play();
  gameover();
}
function btnPlaySound(idx) {
  let audio = new Audio(`sounds/${btnColor[idx]}.mp3`)
  audio.play();
}
// 게임오버
function gameover(){
  $('.record').html(level-1);
  $('.gameover').show();
  $('.restart').click(function(){
    location.reload();
  });
}
