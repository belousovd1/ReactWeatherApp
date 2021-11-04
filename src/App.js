import React, {useState, useEffect} from 'react'
import background from "./bg.jpg"
import axios from "axios"


const api = {
  key: "5cda9dc4110bc6d50564701b260ba81e",
  base: "https://api.openweathermap.org/data/2.5/"
}

function dateBuilder(d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "Semptember", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}` ;
}

const App = () => {

  const [city, setCity] = useState("City")
  const [country, setCountry] = useState("Country")
  const [date, setDate] = useState("Date")
  const [temperature, setTemperature] = useState("Temperature")
  const [weather, setWeather] = useState("Weather")
  const [HiTemp, setHiTemp] = useState("Hi")
  const [LowTemp, setLowTemp] = useState("Lo")

  let input = ""

  const getResults = (city) => {
    const getWeather = async () => {
      try {
        const response = await axios.get(`${api.base}weather?q=${city}&units=imperial&appid=${api.key}`)
        return response.data
      } catch (err) {
        console.log(err)
      }
    }
    return getWeather()
  }

  const updateInfo = (weatherJSON) =>{ 
    setCountry(weatherJSON.sys.country)
    setCity(weatherJSON.name)
    let now = new Date()
    setDate(dateBuilder(now))
    setTemperature(Math.round(weatherJSON.main.temp))
    setWeather(weatherJSON.weather[0].main)
    setHiTemp(Math.round(weatherJSON.main.temp_max))
    setLowTemp(Math.round(weatherJSON.main.temp_min))
  }

  const keyHandler = async (event) => {
    if (event.code === "Enter") {
      input = event.target.value
      const weather = await getResults(input)
      updateInfo(weather)
    }
  }

  return (
    <div className="app-wrap" style={{ backgroundImage: `url(${background})` }}>
      <header>
        <input type="text"
          autoComplete="off"
          className="search-box"
          onKeyDown={(e) => keyHandler(e)}
          placeholder="Search for city...." />
      </header>

      <main>
        <section className="location">
          <div className="city">{city}, {country}</div>
          <div className="date">{date}</div>
        </section>
        <div className="current">
          <div className="temp">{temperature} <span>°f</span></div>
          <div className="weather">{weather}</div>
          <div className="hi-low">{HiTemp}- {LowTemp}</div>
        </div>
      </main>
    </div>
  )
}

export default App;
