const apiKey = "" // chave de api obtida no site https://openweathermap.org

const cityInput = document.querySelector('#city-input');
const search = document.querySelector('#search');

const weatherData = document.querySelector('#weather-data')
const msgErro = document.querySelector('#mensagem')

const cityName = document.querySelector('#city');
const cityTemperature = document.querySelector('#temperature span');
const cityDescription = document.querySelector('#description');
const weatherIcon = document.querySelector('#weather-icon');
const countryFlag = document.querySelector('#country');
const cityUmidity = document.querySelector('#umidity span');
const cityWind = document.querySelector('#wind span');

// events
search.addEventListener('click', (e)=>{
        e.preventDefault();

        const city = cityInput.value;

        showWeather(city);

        cityInput.value = ""

    console.log(apiKey)
});


cityInput.addEventListener('keyup', (e)=>{

    if(e.code === "Enter"){
        const city = e.target.value;

        showWeather(city);
    }
})


// functions
const getWeather = async (city)=>{
    
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);

    if(res.status === 200){
        const data = await res.json();
        return data
    } else {
        msgErro.classList.remove('hide');
        weatherData.classList.add("hide");
    }
    

}


const showWeather = async (city) => {

    const data = await getWeather(city);

    cityName.innerHTML = data.name;
    cityTemperature.innerHTML = parseInt(data.main.temp);
    cityDescription.innerHTML = data.weather[0].description;
    cityUmidity.innerHTML = `${data.main.humidity}%`;
    cityWind.innerHTML = `${data.wind.speed} km/h`;
    weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryFlag.setAttribute('src', `https://flagsapi.com/${data.sys.country}/shiny/64.png`)

    weatherData.classList.remove("hide");
    msgErro.classList.add("hide");
};

