// Date and Time

let dayInput = document.querySelector("#dayInput");
let timeInput = document.querySelector("#timeInput");

let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mai",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];

dayInput.innerHTML = `${date} ${month} ${year}`;
timeInput.innerHTML = `${hours}:${minutes}`;

// Forecast

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "ff068e4aaab8fae778c7c68d42cdde7b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}



// Search for a City

let h2 = document.querySelector("h2");

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchYourCity");
  h2.innerHTML = `${searchInput.value}`;
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", searchCity);


// Temperature
function citySearch(event) {
  event.preventDefault();
  let heading = document.querySelector("h2");
  let newCity = document.querySelector("#searchYourCity");
  let apiKey = "ff068e4aaab8fae778c7c68d42cdde7b";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=metric`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(displayTemp);
  heading.innerHTML = `${newCity.value}`;
  console.log(apiURL);
}

let cityChange = document.querySelector("#searchForm");
cityChange.addEventListener("submit", citySearch);

function displayTemp(response) {
  let yourTemp = Math.round(response.data.main.temp);
  let currentCity = document.querySelector("h2");
  currentCity.innerHTML = response.data.name;
  let weatherCondition = document.querySelector("#weather-description");
  weatherCondition.innerHTML = response.data.weather[0].main;
  let yourWeather = document.querySelector("#current-temperature");
  yourWeather.innerHTML = `${yourTemp}°`;
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

// Get current location

function getLocation(position) {
  let apiKey = "ff068e4aaab8fae778c7c68d42cdde7b";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let positionUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;
  axios.get(positionUrl).then(displayTemp);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let locationButton = document.querySelector(".get-location");
locationButton.addEventListener("click", searchLocation);