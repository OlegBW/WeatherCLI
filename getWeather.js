const fetch = require('node-fetch2');

let weatherJSON = undefined;

async function getWeather(lat,lon,key){
    //lat=47.66&lon=36.27   a1ffdd83e9d1cf8bff5eb8fcd2cdf7af
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
    let response = await fetch(url);
    if(response.ok){
        let res = await response.json();
        return res;
    }
}

module.exports = getWeather;