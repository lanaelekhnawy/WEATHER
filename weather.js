const apiKey = "6de0f7dfd41d4a5a82e192659262502"; 

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`
    );
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    displayWeather(data);
    document.getElementById("errorMsg").innerText = "";
  } catch (error) {
    document.getElementById("errorMsg").innerText = error.message;
  }
}

function displayWeather(data) {
  
  document.getElementById("cityName").innerText = data.location.name;
  document.getElementById("todayTemp").innerText = data.current.temp_c + "°C";
  document.getElementById("todayCondition").innerText = data.current.condition.text;
  document.getElementById("todayIcon").src = "https:" + data.current.condition.icon;
  document.getElementById("humidity").innerText = "Humidity: " + data.current.humidity + "%";
  document.getElementById("wind").innerText = "Wind: " + data.current.wind_kph + " km/h";
  document.getElementById("direction").innerText = "Direction: " + data.current.wind_dir;

  
  let todayDate = new Date(data.forecast.forecastday[0].date);
  document.getElementById("todayName").innerText = todayDate.toLocaleDateString("en-US", { weekday: "long" });
  document.getElementById("todayDate").innerText = data.forecast.forecastday[0].date;

  
  document.getElementById("day1Temp").innerText = data.forecast.forecastday[1].day.avgtemp_c + "°C";
  document.getElementById("day1Condition").innerText = data.forecast.forecastday[1].day.condition.text;
  document.getElementById("day1Icon").src = "https:" + data.forecast.forecastday[1].day.condition.icon;
  let day1Date = new Date(data.forecast.forecastday[1].date);
  document.getElementById("day1Name").innerText = day1Date.toLocaleDateString("en-US", { weekday: "long" });

  
  document.getElementById("day2Temp").innerText = data.forecast.forecastday[2].day.avgtemp_c + "°C";
  document.getElementById("day2Condition").innerText = data.forecast.forecastday[2].day.condition.text;
  document.getElementById("day2Icon").src = "https:" + data.forecast.forecastday[2].day.condition.icon;
  let day2Date = new Date(data.forecast.forecastday[2].date);
  document.getElementById("day2Name").innerText = day2Date.toLocaleDateString("en-US", { weekday: "long" });
}


document.getElementById("searchBtn").addEventListener("click", function () {
  const city = document.getElementById("searchInput").value;
  if (city !== "") getWeather(city);
});


document.getElementById("searchInput").addEventListener("keydown", function(e){
  if(e.key === "Enter") getWeather(this.value);
});


navigator.geolocation.getCurrentPosition(function(position){
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  getWeather(`${lat},${lon}`);
});   
