const fetch = require('node-fetch2');

async function getWeather(lat,lon,key){
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
    let response = await fetch(url);
    if(response.ok){
        let res = await response.json();
        return res;
    }
}

module.exports = getWeather;