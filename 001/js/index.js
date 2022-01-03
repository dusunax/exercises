document.addEventListener("DOMContentLoaded", function(){
    const btn_submit=document.getElementById("btn_submit");
    const new_title=document.getElementById("new_title");
    const new_desc=document.getElementById("new_desc");
    const item_box=document.querySelector(".item_container");
    let chk_btn;
    let fruit=["🍋","🥑","🍎","🍉","🥦","🥝","🍒"]
    // date
    let d_time=new Date;
    let date=zero(d_time.getDate());
    let month=zero(d_time.getMonth()+1);
    let year=d_time.getFullYear();
    function zero(input){
        return input<10?input="0"+input:"";
    }
    let curr_time=`${date}/${month}/${year}`
    function complete_timeset(el){        
        let siblings=el.parentNode.children;
        siblings[5].innerText=`completed: ${curr_time}`
    }
    // 리스트추가
    btn_submit.addEventListener("click", function(){
        event.defaultPrevented;
        if(new_title.value==""){
            alert("제목을 입력하세요.");
            new_title.focus();
            return;
        }
        else if(new_desc.value==""){
            alert("내용을 입력하세요.");
            new_desc.focus();
            return;
        }
        add_item();
        chk_btn_init();
    });    
    function add_item(){
        let rand=Math.floor((Math.random() * 7));
        let el=document.createElement("div");
        let el_html=`
            <div class="item">
                <input type="checkbox"  class="chk_box">
                <h3>${new_title.value}</h3>
                <p>${new_desc.value}</p>
                <small>created: ${curr_time}</small>
                <span>${fruit[rand]}</span>
                <small class="created_at"></small>
            </div>`;
        el.innerHTML=el_html;
        item_box.prepend(el);
        new_title.value="";
        new_desc.value="";
    }
    chk_btn_init();
    function chk_btn_init(){
        chk_btn=document.querySelectorAll(".chk_box");
        chk_btn.forEach((chk_btn)=>{
            chk_btn.addEventListener("click", chk_box_active); 
        })
    }
    function chk_box_active(){
        this.parentNode.classList.remove("done");
        let siblings=this.parentNode.children;
        siblings[5].innerHTML="";
        if(this.checked==true){
            this.parentNode.classList.add("done");
            complete_timeset(this);
        };
    }
    // 전체리스트 수정/삭제
    const check_all=document.getElementById("chk_all");
    // const delete_checked=document.getElementById("btn_del");
    const delete_done=document.getElementById("btn_del_done");
    check_all.addEventListener("click", function(){
        if(check_all.checked){
            let yn=confirm("정말 전부 체크할까요?");
            if(yn){
                let every_item=document.querySelectorAll(".item");
                every_item.forEach((every_item)=>{
                    every_item.classList.add("done");
                    every_item.children[0].checked=true;
                })
            }
            else {
                check_all.checked=false;
            }
        }
    });
    delete_done.addEventListener("click", function(){
        let yn=confirm("완료된 리스트를 정말 지울까요?");
        let every_item=document.querySelectorAll(".item");
        every_item.forEach((every_item)=>{
            every_item.classList.contains("done")?every_item.remove():""
        })
    });
})

// delete_checked.addEventListener("click", function(){
//     let yn=confirm("선택한 리스트를 전부 지울까요?");
//     if(yn){
//         let every_item=document.querySelectorAll(".item");
//         every_item.forEach((every_item)=>{
//             every_item.children[0].checked?every_item.remove():""
//         })
//     }
// });    

// load_data_item();
// function load_data_item(){
//     $.ajax({
//         url: "php/data_item.php",
//         data: {},
//         type: "GET",
//         dataType: "json",
//         success:function(data){
//             data_item=data
//         },
//         error:function(request, error){
//             console.log("PHP연결 실패")
//         }
//     });
// }
//     var btn = document.getElementById("btn_submit");
//     btn.addEventListener("click", () => {
//     //XMLHttpRequest 객체 생성
//     var xhr = new XMLHttpRequest();

//     //요청을 보낼 방식, 주소, 비동기여부 설정 
//     xhr.open('GET', './ajax.php?id=asdf', true);
//     //요청 전송 
//     xhr.send();
//     //통신후 작업 
//     xhr.onload = () => {
//     //통신 성공 
//     if (xhr.status == 200) { console.log(xhr.response); console.log("통신 성공"); } else { //통신 실패 
//     console.log("통신 실패"); } } });
