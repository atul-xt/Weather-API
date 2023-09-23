const apiKey = "a2e771c16c0081623a0d0e21b162aff5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const icon = document.querySelector(".weather-icon");
const input = document.querySelector("#input");
const btn = document.querySelector("#btn");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");


btn.addEventListener("click", function () {
    let city = input.value;
    checkWeather(city);
})


async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);

    if (data.cod == 404) {
        error.style.display = "block";
        weather.style.display = "none";
    } else {
        document.querySelector("#temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector("#city").innerHTML = data.name;
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        
        if (data.weather[0].main == "Clouds") {
            icon.src = "./img/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            icon.src = "./img/clear.png"
        } else if (data.weather[0].main == "Drizzle") {
            icon.src = "./img/drizzle.png"
        } else if (data.weather[0].main == "Mist") {
            icon.src = "./img/mist.png"
        } else if (data.weather[0].main == "Rain") {
            icon.src = "./img/rain.png"
        } else if (data.weather[0].main == "Snow") {
            icon.src = "./img/snow.png"
        } else if (data.weather[0].main == "Haze") {
            icon.src = "./img/haze.png"
        }
        
        error.style.display = "none";
        weather.style.display = "block";

        var tl = gsap.timeline();

        tl.from(".weather-icon", {
            opacity: 0,
            scale: .8,
            duration: 2,
            ease: "Expo.easeInOut"
        },'-=.5')
        tl.from("#temp",{
            y: -50,
            opacity: 0,
            duration: 1,
            ease: "Expo.easeInOut"
        },'-=1.5')
        tl.from("#city",{
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "Expo.easeInOut"
        },'-=1.5')
        tl.from(".col",{
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "Expo.easeInOut"
        },'-=1.5')
        
    }
}
