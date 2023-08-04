
const localTimeInterval = setInterval(() => {
  let localTime = new Date();
  let timeElement = document.querySelector('.time');



  if (localTime.getHours() < 10 && localTime.getMinutes() < 10 && localTime.getSeconds() <10) {
    timeElement.innerText = `0${localTime.getHours()}:0${localTime.getMinutes()}:0${localTime.getSeconds()}`;
  } else if (localTime.getHours() < 10 && localTime.getMinutes() >= 10 && localTime.getSeconds() <10) {
    timeElement.innerText = `0${localTime.getHours()}:${localTime.getMinutes()}:0${localTime.getSeconds()}`;
  } else if (localTime.getHours() < 10 && localTime.getMinutes() >= 10 && localTime.getSeconds() >=10) {
    timeElement.innerText = `0${localTime.getHours()}:${localTime.getMinutes()}:${localTime.getSeconds()}`; 
  } else if (localTime.getHours() >= 10 && localTime.getMinutes() < 10 && localTime.getSeconds() <10) {
    timeElement.innerText = `${localTime.getHours()}:0${localTime.getMinutes()}:0${localTime.getSeconds()}`;
  } else if (localTime.getHours() >= 10 && localTime.getMinutes() < 10 && localTime.getSeconds() >=10) {
    timeElement.innerText = `${localTime.getHours()}:0${localTime.getMinutes()}:${localTime.getSeconds()}`;
  } else if (localTime.getHours() < 10 && localTime.getMinutes() < 10 && localTime.getSeconds() >=10) {
    timeElement.innerText = `0${localTime.getHours()}:0${localTime.getMinutes()}:${localTime.getSeconds()}`;
  } else if (localTime.getHours() >= 10 && localTime.getMinutes() >= 10 && localTime.getSeconds() <10) {
    timeElement.innerText = `${localTime.getHours()}:${localTime.getMinutes()}:0${localTime.getSeconds()}`;
  } else if (localTime.getHours() >= 10 && localTime.getMinutes() >= 10 && localTime.getSeconds() >=10) {
    timeElement.innerText = `${localTime.getHours()}:${localTime.getMinutes()}:${localTime.getSeconds()}`;
  }


  timeElement.innerHTML = timeElement.innerHTML.replaceAll(":", " &#183; ");


}, 1000);

const searchBarElement = document.querySelector('.search');
searchBarElement.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    let locationName = searchBarElement.value;
    weather.fetchWeather(locationName);
    searchBarElement.value = '';
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1920x1080/?${locationName}?night')`;

  }
});

const searchButtonElement = document.querySelector('.search-button');
searchButtonElement.addEventListener('click', function() {
  let locationName = searchBarElement.value;
  weather.fetchWeather(locationName);
  searchBarElement.value = '';
  document.body.style.backgroundImage = `url('https://source.unsplash.com/1920x1080/?${locationName}?night')`;
});


let weather = {
  apiKey : "20d0074fa6ed4e7689b90538230208",
  fetchWeather: function (locationName) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${locationName}&aqi=no`)
    .then(response => response.json())
    .then(data => this.displayWeather(data));
  },
  displayWeather: function(data) {
    let cityName = data.location.name;
    let countryName = data.location.country;
    if (data.location.country === "United States of America") {
      countryName = "U.S.A.";
    }
    if (cityName !== countryName) {
      document.querySelector('.location').innerText = `Weather in ${cityName},  ${countryName}`;
    } else {
      document.querySelector('.location').innerText = `Weather in ${cityName}`;
    }

    let temperature = data.current.temp_c;
    document.querySelector('.temperature').innerHTML = `Temperature &#9900; ${temperature} &#8451;`;
    let humidity = data.current.humidity;
    document.querySelector('.humidity').innerHTML = `Humidity &#9900; ${humidity}%`;
    let windSpeed = data.current.wind_kph;
    let windSpeedElement = document.querySelector('.wind-speed');
    windSpeedElement.innerHTML = `Wind Speed &#9900; ${windSpeed} kph`;

  }

};


