const term = require( 'terminal-kit' ).terminal ;
const config = require('./config.json');
const fs = require('fs');
const { program } = require('commander');
const getWeather = require('./getWeather.js');

let lat = config.lat;
let lon = config.lon;
let key = config.key;

program
.option('-c,--config','configuration mode',false)
.option('-t,--lat <type>','lattitude value ',`${lat}`)
.option('-n,--lon <type>','longitude value',`${lon}`)
.option('-k,--key <type>','OpenWeatherApi key',`${key}`)

program.parse();

const isConfig = (program.opts()).config;

if(isConfig){
        config.lat = (program.opts()).lat;
        config.lon = (program.opts()).lon;
        config.key = (program.opts()).key;
        let configJSON = JSON.stringify(config);
        fs.writeFileSync('config.json',configJSON);
}

else{

function dateLine(){
    let date = new Date();

    let year = date.getFullYear();
    let mon = date.getMonth()+1;
    let day = date.getDate();
    let h = date.getHours();
    let m = date.getMinutes();

    if(mon<10){
        mon = '0'+mon;
    }

    if(day<10){
        day = '0'+day;
    }

    if(h<10){
        h = '0'+h;
    }

    if(m<10){
        m = '0'+m;
    }

    let line = year+' '+day+'.'+mon+' '+h+':'+m+'\n';

    return line;
}

function directionLine(degrees){

    let stdDeg = 0;
    let leftBorder = parseInt(degrees/45);
    let rightBorder = leftBorder+1;
    let mid = leftBorder*45 + 22.5;
    if(degrees > mid){
        stdDeg = rightBorder*45;
    }
    
    else if(degrees <= mid){
        stdDeg = leftBorder*45;
    }

    let answ = '';
    switch(stdDeg){
        case 0:
            answ = ('northern ');
            break;
        case 45:
            answ = ('north-eastern ');
            break;
            
        case 90:
            answ = ('eastern ');
            break;
            
        case 135:
            answ = ('south-eastern');
            break;
            
        case 180:
            answ = ('southern ');
            break;
            
        case 225:
            answ = ('southwestern ');
            break;
            
        case 270:
            answ = ('western ');
            break;
            
        case 315:
            answ = ('northwestern ');
            break;
            
        case 360:
            answ = ('northern ');
            break;
    }
    return answ+'('+degrees+'°)';
    
}

function display(value){
    let dateInfo = dateLine();
    let temp = +value.main.temp;
    temp = Math.round(temp - 273.15);
    let windSpeed = +value.wind.speed;
    let deg = value.wind.deg;
    let directLine = directionLine(deg);

    term.colorRgb(78,78,78,dateInfo);
    term.bold(value.name+' ('+value.sys.country+')'+'\n');
    console.log(value.weather[0].main+' ('+value.weather[0].description+')');
    
    if(temp<=0){
        term('Temperature : ').colorRgb(0,95,175,`${temp} °C\n`);
    }

    else if(temp<=10 && temp>=1){
        term('Temperature : ').colorRgb(175,255,255,`${temp} °C\n`);
    }

    else if(temp<=20 && temp>=11){
        term('Temperature : ').colorRgb(0,255,95,`${temp} °C\n`);
    }

    else if(temp>=21 && temp<=30){
        term('Temperature : ').colorRgb(95,175,0,`${temp} °C\n`);
    }

    else if(temp>=31){
        term('Temperature : ').colorRgb(255,95,0,`${temp} °C\n`);
    }


    if(windSpeed <= 0.2){
        term('Wind speed : ').bold(`${windSpeed} m/s`);
    }

    else if(0.3<=windSpeed<=1.5){
        term('Wind speed : ').colorRgb(95,255,255,`${windSpeed} m/s\n`);
    }

    else if(1.6<=windSpeed<=3.3){
        term('Wind speed : ').colorRgb(95,255,215,`${windSpeed} m/s\n`);
    }

    else if(3.4<=windSpeed<=5.4){
        term('Wind speed : ').colorRgb(95,255,175,`${windSpeed} m/s\n`);
    }

    else if(5.5<=windSpeed<=7.9){
        term('Wind speed : ').colorRgb(95,255,95,`${windSpeed} m/s\n`);
    }

    else if(8.0<=windSpeed<=10.7){
        term('Wind speed : ').colorRgb(95,255,0,`${windSpeed} m/s\n`);
    }

    else if(10.8<=windSpeed<=13.8){
        term('Wind speed : ').colorRgb(95,215,0,`${windSpeed} m/s\n`);
    }

    else if(13.9<=windSpeed<=17.1){
        term('Wind speed : ').colorRgb(175,175,0,`${windSpeed} m/s\n`);
    }

    else if(17.2<=windSpeed<=20.7){
        term('Wind speed : ').colorRgb(255,175,0,`${windSpeed} m/s\n`);
    }

    else if(20.8<=windSpeed<=24.4){
        term('Wind speed : ').colorRgb(255,135,0,`${windSpeed} m/s\n`);
    }

    else{
        term('Wind speed : ').colorRgb(255,95,0,`${windSpeed} m/s\n`);
    }

    console.log('Wind direction : '+directLine);
}


getWeather(lat,lon,key)
.then(display)
.catch((err)=>{
    if(err.name='FetchError'){
    console.log(err.name+'\n\nPossible issues : \nInternet connection issue\nConfiguration issue');
    }

    else{
    console.log(err.name);
    }
})}

