import React, { useState } from 'react';
import fetchWeather from './api/fetchWeather'

const App=()=>{

    const [query,setQuery]=useState("");
    const [weather,setWeather]=useState({
        state:"",
        country:"",
        temperature:"",
        icon:"",
        description:""
    });


    const update=(event)=>{
        setQuery(event.target.value);
    }

    const search=async(event)=>{
        if(event.key==="Enter"){
            try{
             const data=await fetchWeather(query);

            setQuery("");
            setWeather({state:data.name,country:data.sys.country,temperature:data.main.temp,
                icon:data.weather[0].icon,description:data.weather[0].main});
            

            console.log(data);
            return data;}
            catch(error){
                alert("Please enter correct location");
                setQuery("");

            }
        }
    }

    return(
       <>
       <div className="main_container">
       <input
           type="text"
           placeholder="Search.."
           className="search_bar"
           value={query}
           onChange={update}
           onKeyPress={search}
       />
           { weather.state!=="" && (<>
            <div className="info">
           <div className="place">{weather.state} <sup className="country">{weather.country}</sup></div>
           <br/>
           <div className="temp">{Math.round(weather.temperature-273.15)}<sup>&deg;C</sup></div>
           <br/>
           <div className="extra_info">
               <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="weather"/>
               <div>{weather.description}</div>
           </div>
           </div>
           </>)
           }


       </div>
       </>
    );

}

export default App;