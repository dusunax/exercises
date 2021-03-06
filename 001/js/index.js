document.addEventListener("DOMContentLoaded", function(){
    const btn_submit=document.getElementById("btn_submit");
    const new_title=document.getElementById("new_title");
    const new_desc=document.getElementById("new_desc");
    const item_box=document.querySelector(".item_container");
    let chk_btn;
    let fruit=["π","π₯","π","π","π₯¦","π₯","π"]
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
    // λ¦¬μ€νΈμΆκ°
    btn_submit.addEventListener("click", function(){
        event.defaultPrevented;
        if(new_title.value==""){
            alert("μ λͺ©μ μλ ₯νμΈμ.");
            new_title.focus();
            return;
        }
        else if(new_desc.value==""){
            alert("λ΄μ©μ μλ ₯νμΈμ.");
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
    // μ μ²΄λ¦¬μ€νΈ μμ /μ­μ 
    const check_all=document.getElementById("chk_all");
    // const delete_checked=document.getElementById("btn_del");
    const delete_done=document.getElementById("btn_del_done");
    check_all.addEventListener("click", function(){
        if(check_all.checked){
            let yn=confirm("μ λ§ μ λΆ μ²΄ν¬ν κΉμ?");
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
        let yn=confirm("μλ£λ λ¦¬μ€νΈλ₯Ό μ λ§ μ§μΈκΉμ?");
        let every_item=document.querySelectorAll(".item");
        every_item.forEach((every_item)=>{
            every_item.classList.contains("done")?every_item.remove():""
        })
    });
})

// delete_checked.addEventListener("click", function(){
//     let yn=confirm("μ νν λ¦¬μ€νΈλ₯Ό μ λΆ μ§μΈκΉμ?");
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
//             console.log("PHPμ°κ²° μ€ν¨")
//         }
//     });
// }
//     var btn = document.getElementById("btn_submit");
//     btn.addEventListener("click", () => {
//     //XMLHttpRequest κ°μ²΄ μμ±
//     var xhr = new XMLHttpRequest();

//     //μμ²­μ λ³΄λΌ λ°©μ, μ£Όμ, λΉλκΈ°μ¬λΆ μ€μ  
//     xhr.open('GET', './ajax.php?id=asdf', true);
//     //μμ²­ μ μ‘ 
//     xhr.send();
//     //ν΅μ ν μμ 
//     xhr.onload = () => {
//     //ν΅μ  μ±κ³΅ 
//     if (xhr.status == 200) { console.log(xhr.response); console.log("ν΅μ  μ±κ³΅"); } else { //ν΅μ  μ€ν¨ 
//     console.log("ν΅μ  μ€ν¨"); } } });
