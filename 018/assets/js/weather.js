// temp key: dusuna
const API_KEY='a2e8922539a2e4f37866cc7d173c8be2'
// 
const weatherResetTime=30*1000
setInterval(()=>{
    askForCoords();
}, weatherResetTime)
askForCoords();
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}
function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}
function handleGeoError() {
    console.log('위치를 찾을 수 없습니다.');
}

function getWeather(lat, lon) {
    // console.log("현재 좌표: " + lat, lon);
    fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        )
        .then((response)=>{
            return response.json();
        })
        .then((json)=>{
            const temparature = json.main.temp;
            const place = json.name;
            const string = json.weather[0].main.toLowerCase();
            console.log(string.toLowerCase());
            const icon = json.weather[0].icon;


            weather.innerHTML =
                `
            <strong>${temparature.toFixed(1)}℃</strong>
            <img src="http://openweathermap.org/img/wn/${icon}@2x.png" />`;
            
            
            // <img src="https://ssl.gstatic.com/onebox/weather/64/${string}.png" />
            // <img src="http://openweathermap.org/img/wn/${icon}.png"
            // <img src="http://openweathermap.org/img/w/${icon}.png"
            // <span>도시: ${place}</span>
        });
}