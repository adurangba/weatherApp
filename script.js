const apiKey = "241679dad682fb78895d81d2b7115315";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        const weatherCode = data.weather[0].id;

        if (weatherCode >= 200 && weatherCode < 300) {
            weatherIcon.src = "./images/storm.png";
        } else if (weatherCode >= 300 && weatherCode < 500) {
            weatherIcon.src = "./images/drizzle.png";
        } else if (weatherCode >= 500 && weatherCode < 600) {
            weatherIcon.src = "./images/rain.png";
        } else if (weatherCode >= 600 && weatherCode < 700) {
            weatherIcon.src = "./images/snow.png";
        } else if (weatherCode >= 700 && weatherCode < 800) {
            weatherIcon.src = "./images/mist.png";
        } else if (weatherCode === 800) {
            weatherIcon.src = "./images/sunny.png";
        } else if (weatherCode > 800 && weatherCode < 900) {
            weatherIcon.src = "./images/cloud.png";
        } else {
            weatherIcon.src = "./images/question.png"; // Add a default image or handle other cases
        }
        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
