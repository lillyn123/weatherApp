import "./styles.css";
let input = document.querySelector("#floatingInputGroup1");
let city = input.value;

// Current Day and Time
let now = new Date();
let days = [
  "Monday",  
  "Sunday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes().toString().padStart(2, "0");
let clock = document.querySelector(".clock");
clock.innerHTML = `It is currently ${day} ${hour}:${minutes}!`;

// Search Bar and Results
let form = document.querySelector("form");
let searchButton = document.querySelector("#searchButton");
let selectedCity = document.querySelector("#selectedCity");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let input = document.querySelector("#floatingInputGroup1");
  let city = input.value;
  selectedCity.textContent = input.value;
  let apiKey = "4da3041f575cfo3990b647f9504e3t4f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayTemperature);
});
console.log(form);
function displayTemperature(response) {
  console.log(response.data);
  let dailyTemperature = document.querySelector("#dailyTemperature");
  let temperature = response.data.temperature;
  dailyTemperature.textContent = `${Math.round(
    response.data.temperature.current
  )}℃`;
  let dailyCondition = document.querySelector("#day-conditon");
  let condition = response.data.condition.description;
  dailyCondition.textContent = `${day} | ${condition}`;
  let dailyHumidity = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;
  dailyHumidity.textContent = `Humidity: ${humidity}`;
  let dailyWind = document.querySelector("#wind");
  let wind = response.data.wind.speed;
}