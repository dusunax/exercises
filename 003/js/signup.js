document.addEventListener("DOMContentLoaded", function() {
  // 셀렉트
  const aside_contents = Array.from(document.querySelectorAll(".aside_content"));
  const main_contents = Array.from(document.querySelectorAll(".main_content"));
  const main_contents_bot = Array.from(document.querySelectorAll(".content_bot"));
  const btn_start=document.getElementById("btn_start");
  const btn_next=document.getElementById("btn_next");
  const btn_prev=document.getElementById("btn_prev");
  const btn_signUp=document.getElementById("btn_start_signUp");
  const btn_skip=document.querySelector(".text_link_skip");
  // init // .on=d-flex, 짭컴포넌트
  let page_index=0;
  let main_bottom_type=0;
  // 정보
  let u_ID;
  let u_PW;
  let u_data=new Array();

  addClassOn_to_indexContent(main_contents, page_index);
  // n번째 컨텐츠에 .on달음
  function addClassOn_to_indexContent(contents, index) {
    contents.forEach((contents) => {
      contents.classList.remove("on");
    })
    contents[index].classList.add('on');
  };
  // 페이지 넘김(event)
  function pageEvent(){
    goPage(this);
    showHide_skipBtn();
    showHide_prevBtn();
    get_AllInputValue();
  }
  btn_next.addEventListener('click', pageEvent);
  btn_prev.addEventListener('click', pageEvent);
  btn_skip.addEventListener('click', pageEvent);

  function goPage(el){
    if(el.getAttribute('id')=="btn_prev"){
      addClassOn_to_indexContent(main_contents, --page_index);
    }
    if(el.getAttribute('id')=="btn_next"){
      addClassOn_to_indexContent(main_contents, ++page_index);
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
  function get_AllInputValue(){
    const current_query=`.content_${page_index+1} input`
    const current_inputs=document.querySelectorAll(current_query)
    console.log(current_inputs);
    return current_inputs;
  }

  function setData(name){
    const input=document.getElementsByName(name)[0];
    u_data.push(`${name}:${input.value}`);
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
  // 이벤트리스너
  btn_start.addEventListener('click', function(){
    addClassOn_to_indexContent(main_contents, page_index=1);
    document.querySelector(".main_bot_container").classList.remove("d-none")
    addClassOn_to_indexContent(main_contents_bot, main_bottom_type=0);
    setData("u_area");
    get_AllInputValue();
  });
  btn_signUp.addEventListener('click', function(){
    let inputs=get_AllInputValue();
    // if(inputs[3])
    console.log(inputs[3]);
    setID(inputs[0], inputs[1].value, inputs[2].value);

    addClassOn_to_indexContent(main_contents, page_index=2);
    addClassOn_to_indexContent(main_contents_bot, main_bottom_type=1);
  })
});
