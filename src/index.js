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
function timeDecorChange() {
  let dailyIcon = document.querySelector('#bigWeatherIcon');
  let entireCard = document.getElementsByClassName('entire-card')[0];
  if (hour >= 18) {
    dailyIcon.classList.remove('fa-sun');
    dailyIcon.classList.add('fa-moon');
    entireCard.style.backgroundImage ="url(https://cdn.dribbble.com/users/925716/screenshots/3333720/attachments/722375/night.png?resize=800x600&vertical=center)";
  }
}
clock.innerHTML = `It is currently ${day} ${hour}:${minutes}!`;
timeDecorChange();

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
  axios.get(apiUrl).then(displayTemperature);
});
function displayTemperature(response) {
  let dailyTemperature = document.querySelector("#dailyTemperature");
  let temperature = response.data.temperature.current;
  dailyTemperature.textContent = `${Math.round(
    response.data.temperature.current
  )}℃`;
  // Temperature tip
  let firstTip = document.querySelector('#firstTip');
  if (temperature <= 14) {
    firstTip.textContent = 'Wear something warm!';
  }
  if (temperature >= 25) {
    firstTip.textContent = "Stay dehydrated and drink water!";
  }
  if (temperature > 14 && temperature < 25) {
    firstTip.textContent = "It feels nice outside."
  } 
  let secondTip = document.querySelector('#secondTip');
  let dailyCondition = document.querySelector("#day-conditon");
  let condition = response.data.condition.description;
  dailyCondition.textContent = `${day} | ${condition}`;
  let dailyIcon = document.querySelector('#bigWeatherIcon');
  if (condition === 'few clouds' || condition === 'scattered clouds' || condition === 'broken clouds' || condition === 'overcast clouds') {
    dailyIcon.classList.remove('fa-regular', 'fa-sun', 'fa-moon');
    dailyIcon.classList.add('fa-solid', 'fa-cloud');
    secondTip.textContent = "Look at the sky!"
  }
  if (condition === 'rain' || condition === 'shower rain') {
    dailyIcon.classList.remove('fa-regular', 'fa-sun', 'fa-moon');
    dailyIcon.classList.add('fa-solid', 'fa-cloud-rain');
    secondTip.textContent = "Stay inside."
  }
  if (condition === 'thunderstorm') {
    dailyIcon.classList.remove('fa-regular', 'fa-sun', 'fa-moon');
    dailyIcon.classList.add('fa-solid', 'fa-cloud-bolt');
    secondTip.textContent = "It might be loud."
  }
  if (condition === 'snow') {
    dailyIcon.classList.remove('fa-regular', 'fa-sun', 'fa-moon');
    dailyIcon.classList.add('fa-solid', 'fa-snowflake');
    secondTip.textContent = "Snowball fight!"
  }
  if (condition === 'mist') {
    dailyIcon.classList.remove('fa-regular', 'fa-sun', 'fa-moon');
    dailyIcon.classList.add('fa-solid', 'fa-wind');
    secondTip.textContent = "Drive safe!"
  }
  if (condition === 'clear sky') {
    secondTip.textContent = "Go for a walk."
  }
  let dailyHumidity = document.querySelector("#humidityValue");
  let humidity = response.data.temperature.humidity;
  dailyHumidity.textContent = `${humidity}`;
  let dailyWind = document.querySelector("#windValue");
  let wind = response.data.wind.speed;
  dailyWind.textContent = `${wind}`;
}
timeDecorChange();