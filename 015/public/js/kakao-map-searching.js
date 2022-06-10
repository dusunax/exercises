function check(input){
    // const userAddress = "서울 중랑구 망우로 297";
    const userAddress = input.value;
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(userAddress, (result, status)=>{
        if(result.length == 0 || status == "ZERO_RESULT"){
            alert("도로명주소를 다시 확인해주세요.");
            document.getElementById("address").focus();
        }
    });
}