const searchBtn =
document.querySelector("#searchBtn");
const cityInput =
document.getElementById("city");

const weatherResult =
document.getElementById("weatherResult");
 const API_KEY = "24e0010263804afd9ea52459262107";

async function getWeather(){
  const cities = cityInput.value.split(",");
for (const city of cities){
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city.trim()}`;
  
   weatherResult.innerHTML ="<P>Loading...";
  const response = await
  fetch(url);
  const data = await
  response.json();
  
   weatherResult.innerHTML = "";
  localStorage.setItem("lastCity",
    city.trim());
  
   
   if (data.error){
    weatherResult.innerHTML =`
    <div 
    class="weather-card">
    <h2>${city}</h2>
    <p>❌ city not found</p>
    </div>`;
    cityInput.value="";
  return;
  }

  let bgImage;
  if(data.current.is_day === 1) {
   bgImage="url('istockphoto-1007768414-612x612.jpg')";
  }else{
  bgImage ="url('istockphoto-162515751-612x612.jpg')";
  }
  console.log(data);
  weatherResult.innerHTML += `
    <div class="weather-card" 
    style ="background-image:${bgImage};">
  
<h2>${data.location.name}</h2>
<p>${data.current.condition.text}</p>
<img src="https:${data.current.condition.icon}">
<p>🌡️ Temperature: ${data.current.temp_c}°C</p>
<p>💧 Humidity: ${data.current.humidity}%</p>
<p>🌬️ Wind: ${data.current.wind_kph} km/h</p>
</div>
`;


cityInput.value ="";

}

}
searchBtn.addEventListener("click", getWeather);

const savedCity =localStorage.getItem("lastCity");
if(savedCity){
  cityInput.value = savedCity;
  getWeather();
}
