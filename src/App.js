import React, {useState, useEffect} from 'react'
import background from "./bg.jpg"
import axios from "axios"


const api = {
  key: "5cda9dc4110bc6d50564701b260ba81e",
  base: "https://api.openweathermap.org/data/2.5/"
}
const searchBox = document.querySelector('.search-boz')


const App = () => {

  const [city, setCity] = useState("")

const getResults = (city) =>{
    const getWeather = async () => {
    try{
      const response = await axios.get(`${api.base}weather?q=${city}&units=imperial&appid=${api.key}`)
      console.log(response)
      return response
      } catch (err){
      console.log(err)
      }
    }

    return getWeather()
  
}

  const keyHandler = (event) => {
    if (event.code === "Enter"){
      setCity(event.target.value)
      console.log(city)
      getResults(city)
    } 
  }

  return(
       <div className="app-wrap" style={{backgroundImage: `url(${background})`}}>
        <header>
            <input type="text"
             autoComplete="off"
             className="search-box"
             onKeyDown={(e) => keyHandler(e)}
             placeholder="Search for city...." />
        </header>

        <main>
            <section className="location">
                <div className="city">city</div>
                <div className="date">date</div>
            </section>
            <div className="current">
                <div className="temp">number, <span>unit</span></div>
                <div className="weather">weather</div>
                <div className="hi-low">hi-low</div>
            </div>
        </main>
    </div>  
  )
}

export default App;
