document.addEventListener("DOMContentLoaded", function(){
  const btn_modal_open=document.querySelector(".btn.modal_open");
  const btn_modal_close=document.querySelector(".btn.close");
  const btn_share=document.querySelector(".btn.share");

  const btn_start=document.querySelector(".btn.start");
  const fieldValue=document.querySelector("#field_input");
  const timeValue=document.querySelector("#time_input");
  const field_result=document.querySelector("#field_result");
  const time_result=document.querySelector("#time_result");
  const year_result=document.querySelector("#year_result");
  let user_field="";
  let user_time="";
  read_url();
  let timeValue_int=user_time; //tmp

  function cut_num_under_24(){
    timeValue_int=Number(timeValue.value);
    if(timeValue_int > 99){
      timeValue.value=timeValue.value.slice(0, 2)
    } else if (timeValue_int > 24){
      alert("24시간 이하의 값을 입력해주세요.");
    }
  }
  function calculate(){
    let timeValue_int=Number(timeValue.value);
    if(fieldValue.value=="" || timeValue_int==""){
      alert("내용을 입력해주세요.");
      fieldValue.value==""?fieldValue.focus():timeValue.focus();
      return false;
    }
    result_start();
    send_result(fieldValue.value, timeValue_int);
  };
  function result_start(){
    hide_display(document.querySelector(".result"));
    show_display(document.querySelector(".loading_result"));
    setTimeout(()=>{
      hide_display(document.querySelector(".loading_result"));
      show_display(document.querySelector(".result"));
    }, 500);
  }
  function send_result(field, time){
    let calc_time=innerText=(10000/time).toFixed(0);
    let by_year=(calc_time/365).toFixed(1)
    field_result.innerText=field;
    time_result.innerText=calc_time;
    year_result.innerText=by_year;
  }
  // 주소
  function copy_url(){
    let url=location.href;
    url=url.split("?")[0];
    url=url+"?field="+field_result.innerText+"&time="+timeValue_int;
    let tmp_input=document.createElement('input');

    document.body.appendChild(tmp_input);
    tmp_input.value=url;
    tmp_input.select();
    document.execCommand("copy");
    console.log(tmp_input.value);
    document.body.removeChild(tmp_input);

    alert("URL주소가 복사되었습니다.");
    window.location.href=url;
  };
  function read_url(){
    if(url=location.href.indexOf("?")>0){
      user_field=get_url_info("field");
      user_time=get_url_info("time");
      send_result(user_field, user_time);
      show_display(document.querySelector(".result"));
    };
    result_start();
  };
  function get_url_info(key){
      let url=location.href.split("?");
      url=url.length>1?url[1]:null;
      let tmp_part=url.split("&");
      if(url!=null){
          let crumb;
          for(let i=0; i<tmp_part.length; i++){
              crumb=tmp_part[i].split("=")
              if(crumb[0]==key){
                  return crumb[1]
              }
          }
      };
  };
  // 디스플레이
  function show_display(el){
    el.classList.add("show");
  }
  function hide_display(el){
    el.classList.remove("show");
  }
  function openModal(){
    show_display(document.querySelector(".modal_wrap"));
  };
  function closeModal(){
    hide_display(document.querySelector(".modal_wrap"));
  };
  // 이벤트리스너
  timeValue.addEventListener("keyup", cut_num_under_24);
  btn_start.addEventListener('click', calculate);
  btn_modal_open.addEventListener('click', openModal);
  btn_modal_close.addEventListener('click', closeModal);
  btn_share.addEventListener('click', copy_url);
});
