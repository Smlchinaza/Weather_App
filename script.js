const apikey = "696121274d4a9a16186886f4d0edc4b8";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDisplay = document.querySelector(".weather");
const errorMessage = document.getElementById("errorMessage");

// Fetch Weather Data
async function checkWeather(city) {
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    try {
        const response = await fetch(apiURL + city + `&appid=${apikey}`);
        
        if (!response.ok) {
            throw new Error("City not found.");
        }

        const data = await response.json();
        
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update Weather Icon
        const weatherConditions = {
            "Clouds": "images/clouds.png",
            "Clear": "images/clear.png",
            "Rain": "images/rain.png",
            "Drizzle": "images/drizzle.png",
            "Mist": "images/mist.png"
        };

        weatherIcon.src = weatherConditions[data.weather[0].main] || "images/default.png";

        weatherDisplay.style.display = "block";
        errorMessage.style.display = "none";

    } catch (error) {
        errorMessage.style.display = "block";
        weatherDisplay.style.display = "none";
    }
}

// Search Button Click Event
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value.trim());
});
