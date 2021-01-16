import axios from 'axios';

const APIkey="f546f64861b2d2abc5d245254ad96aed";

const fetchWeather= async (query)=>{

    const  response=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${APIkey}`);
    return response.data;
}

export default fetchWeather;