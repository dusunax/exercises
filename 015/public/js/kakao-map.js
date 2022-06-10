//docs: https://apis.map.kakao.com/web/sample/addr2coord/

var mapContainer = document.getElementById('map'),
    mapOption = { 
        center: new kakao.maps.LatLng(5.54699, 100.09598), 
        level: 4
    };
var map = new kakao.maps.Map(mapContainer, mapOption);

// 주소검색: geocoder
const userAddress=document.getElementById("address").innerText;
var geocoder = new kakao.maps.services.Geocoder();
geocoder.addressSearch(userAddress, function(result, status) {
    if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        
        // 마커 이미지
        var imageSrc = '/img/icon01.png',   
        imageSize = new kakao.maps.Size(64, 69),
        imageOption = {offset: new kakao.maps.Point(27, 69)};

        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
        var marker = new kakao.maps.Marker({
            map: map,
            position: coords,
            image: markerImage
        });

        marker.setMap(map);  
        map.setCenter(coords);
    } 
});    
