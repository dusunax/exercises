document.addEventListener("DOMContentLoaded", function() {
  const aside_contents = Array.from(document.querySelectorAll(".aside_content"));
  const main_contents = Array.from(document.querySelectorAll(".main_content"));
  const main_contents_bot = Array.from(document.querySelectorAll(".content_bot"));
  const btn_start=document.getElementById("btn_start");
  const btn_next=document.getElementById("btn_next");
  const btn_prev=document.getElementById("btn_prev");
  const btn_signUp=document.getElementById("btn_start_signUp");
  const btn_skip=document.querySelector(".text_link_skip");
  let u_ID;
  let u_PW;
  let u_data=new Array();
  // init, on=flex, page index 짭컴포넌트
  let page_index=0;
  let main_bottom_type=0;
  init_allContent_of(main_contents, page_index);
  function init_allContent_of(contents, index) {
    contents.forEach((contents) => {
      contents.classList.remove("on");
    })
    contents[index].classList.add('on');
  };
  function goNextPage(){
    if(page_index<main_contents.length-1){
      init_allContent_of(main_contents, ++page_index);
      showHide_skipBtn();
      showHide_prevBtn();
      get_AllInputValue();
    }
  }
  function goPrevPage(){
    if(page_index>1){
      init_allContent_of(main_contents, --page_index);
      showHide_skipBtn();
      showHide_prevBtn();
      get_AllInputValue();
    }
  }
  function showHide_skipBtn(){
    if(page_index==5 || page_index==6){
      btn_skip.classList.add("able");
    }
    else {
      btn_skip.classList.contains("able")?btn_skip.classList.remove("able"):"";
    }
  }
  function showHide_prevBtn(){
    if(page_index>2 || page_index<6){
      btn_prev.classList.add("able");
    }
    else {
      btn_prev.classList.contains("able")?btn_prev.classList.remove("able"):"";
    }
  }
  function setData(name){
    const input=document.getElementsByName(name)[0];
    u_data.push(`${name}:${input.value}`);
    console.log(u_data);
  }
  function setID(id, pw1, pw2){
    if(pw1==pw2){
      u_ID=id;
      u_PW=pw1;
    }
    else {
      alert("확인 비밀번호가 일치하지 않습니다.");
    }
  }
  function get_AllInputValue(){
    const current_query=`.content_${page_index+1} input`
    const current_inputs=document.querySelectorAll(current_query)
    console.log(current_inputs);
    return current_inputs;
  }
  // 이벤트리스너
  btn_start.addEventListener('click', function(){
    init_allContent_of(main_contents, page_index=1);
    document.querySelector(".main_bot_container").classList.remove("d-none")
    init_allContent_of(main_contents_bot, main_bottom_type=0);
    setData("u_area");
    get_AllInputValue();
  });
  btn_signUp.addEventListener('click', function(){
    let inputs=get_AllInputValue();
    // if(inputs[3])
    console.log(inputs[3]);
    setID(inputs[0], inputs[1].value, inputs[2].value);

    init_allContent_of(main_contents, page_index=2);
    init_allContent_of(main_contents_bot, main_bottom_type=1);
  })
  btn_next.addEventListener('click', goNextPage);
  btn_prev.addEventListener('click', goPrevPage);
  btn_skip.addEventListener('click', goNextPage);
});
