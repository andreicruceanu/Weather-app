let city = document.querySelector('#city');
let searchBtn = document.querySelector('#searchCity');
let cityCurrent = document.querySelector('#cityCurrent');
let currentTempSpan = document.querySelector('#currentTempSpan');
let humidity = document.querySelector('#humidity');
let tempMax = document.querySelector('#tempMax');
let tempMin = document.querySelector('#tempMin');
let WeatherType = document.querySelector('#WeatherType');
let wind = document.querySelector('#wind');
let icon = document.querySelector('#icon');
let cityCurrentCountry = document.querySelector('#cityCurrentCountry');
let date = document.querySelector('#date');


let todayDate = new Date();
date.innerText = dateManage(todayDate);

//Date manage 
function dateManage(dateArg) {
    let days = ["Duminica" ,"Luni", "Marti" , "Miercuri" , "Joi" , "Vineri" , "Sambata" ];
    let months = ["Ianuarie" , "Februarie" , "Martie" , "Aprilie", "Mai" , "Iunie" , "Iulie" , "August" , "Septembrie", "Octombrie" , "Noiembrie" , "Decembrie"];
    
    
    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()]; 
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()]

    return `${date} ${month} (${day}), ${year} `; 
}



const kelvinToCelsius = (kelvin) => {
    const celsius = (kelvin- 273.15);
    return celsius.toFixed(0);
}
function mps_to_kmph(mps)
{
    return (3.6 * mps).toFixed(0) ;
}



city.addEventListener ('keypress', (e) => {
    if (e.keyCode === 13) {
        getWeatherData(city.value); 
        document.querySelector('.weather-body').style.display = "block";
    }
})

let getWeatherData = async (cityName) =>   {
    let locationResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=63b191f25ee01433ff9bff5d8362b379`)
    .then (res => {
        displaycityCurrent(res.data.name);
        displaycityCurrentCountry(res.data.sys.country);
        displayCityTemp(kelvinToCelsius(res.data.main.temp));
        displayHumidity(res.data.main.humidity);
        displayTempMax(kelvinToCelsius(res.data.main.temp_max));
        displayTempMin(kelvinToCelsius(res.data.main.temp_min));
        displayWeatherType(res.data.weather[0].description);
        displayWind(Number(mps_to_kmph(res.data.wind.speed)));
        displayIcon(res.data.weather[0].icon);
         let weatherTypeMain = res.data.weather[0].main ; 

      if (weatherTypeMain == 'Clear') {
          document.body.style.backgroundImage = "url(img/clear-sky.jpg)";
      } else if (weatherTypeMain == 'Clouds') {
        document.body.style.backgroundImage = "url(img/broken-clouds.jpg)";
      } else if (weatherTypeMain == 'Rain') {
        document.body.style.backgroundImage = "url(img/rain.jpg)";
      } else if (weatherTypeMain == 'Thunderstorm') {
        document.body.style.backgroundImage = "url(img/thunderstorm.jpg)";
      } else if (weatherTypeMain == 'Snow') {
            document.body.style.backgroundImage = "url(img/snow.jpg)";
      }  


    })
    .catch(err => {
        console.error(err);
        alert("Introdu Orașul cu diactritice");
    })

}

function displaycityCurrent(city) {
    cityCurrent.innerHTML = `${city}`;
}
function displayCityTemp(temp) {
    currentTempSpan.innerHTML = `${temp} &#8451;`;
}
function displayHumidity(humidityValue) {
    humidity.innerHTML = `${humidityValue}`;
}
function displayTempMax(tempMaxValue) {
    tempMax.innerHTML=`${tempMaxValue}`;    
}
function displayTempMin(tempMinValue) {
    tempMin.innerHTML=`${tempMinValue}`;
}
function displayWeatherType(WeatherTypeValue) {
    WeatherType.innerHTML=`${WeatherTypeValue}`;
}
function displayWind(WindValue) {
    wind.innerHTML = `${WindValue}`;
}
function displayIcon(IconValue) {
    icon.src=`http://openweathermap.org/img/wn/${IconValue}@2x.png`;
}
function displaycityCurrentCountry(country) {
    cityCurrentCountry.innerHTML =`${country}`;
}

