var APIKey = "&appid=e3ef58b786bc1cbed4ae1585e495bb1b";

$("#searchBtn").on("click", function () {
  var city = $("#citySearch").val();
  $("#citySearch").val("");

  getWeather(city)
  getForecast(city)
})


function getWeather(city) {
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + APIKey;

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      console.log(response);
      getUVI(response.coord.lat, response.coord.lon)

      // City Name, Weather Icon, Temperature, Humidity, Wind Speed, UV Index

      var cityName = $("<div>");
      cityName.addClass("h1").text(response.name)
      $("#cityContainer").append(cityName)

      var weatherIcon = $("<img>");
      weatherIcon.attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
      $("#cityContainer").append(weatherIcon)
      console.log(weatherIcon)

      var cityTemp = $("<div>");
      console.log((response.main.temp - 273.15) * 1.80 + 32)
      cityTemp.text("Temperature: " + (Math.floor((response.main.temp - 273.15) * 1.80 + 32)) + "F" )
      $("#cityContainer").append(cityTemp)

      var humidityValue = $("<div>");
      humidityValue.text("Humidity: " + response.main.humidity + " %")
      $("#cityContainer").append(humidityValue)

      var windSpeed = $("<div>");
      windSpeed.text("Wind Speed: " + response.wind.speed + "mph")
      $("#cityContainer").append(windSpeed)
    })
}

// 5 day
function getForecast(city) {
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + APIKey;

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      console.log(response);

      for (var i = 0; i < response.list.length; i++) {
        if (response.list[i].dt_txt.includes("12:00:00")) {
          forecastCard(response.list[i])
          
        }
      }
    })
}

function forecastCard(weather) {
  // date, icon, temp humidity
var weatherIcon = $("<img>");
weatherIcon.attr("src", "https://openweathermap.org/img/w/" + weather.weather[0].icon + ".png")
$("#fiveDayForecast").append(weatherIcon);
//split dt_txt: "2020-08-25 03:00:00"

  // weather.dt_txt.split(" ")


  // weather.main.humidity

  var humidityValue = $("<div>");
  humidityValue.text("Humidity: " + weather.main.humidity)
  $("#fiveDayForecast").append(humidityValue)

  // var cityTemp = $("<div>");
  console.log((weather.main.temp - 273.15) * 1.80 + 32)
  // cityTemp.text("Temperature: " + (Math.floor((weather.main.temp - 273.15) * 1.80 + 32)))
  // $("#fiveDayForecast").append(cityTemp)

  console.log(forecastCard)
}

function getUVI(lat, lon) {
  var queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + APIKey;

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      console.log(response);
      console.log("uvi");
      var UVIndex = $("<div>");
      UVIndex.text("UV: " + response.value)
      $("#cityContainer").append(UVIndex)
    })
    
}
