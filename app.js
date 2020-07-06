const api = {
  key: "70b123e5b92b2cb65a74ff88dc650610",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchBox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let temp = document.querySelector(".temp");
  temp.innerText = Math.floor(`${weather.main.temp}`);

  let description = document.querySelector(".weather");
  description.innerText = `${weather.weather[0].description}`;

  let hiTemp = document.querySelector(".hi");
  hiTemp.innerText = "Hi: " + Math.ceil(`${weather.main.temp_max}`);

  let lowTemp = document.querySelector(".low");
  lowTemp.innerText = "// Low: " + Math.floor(`${weather.main.temp_min}`);

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
