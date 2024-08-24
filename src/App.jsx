import { useState, useRef } from 'react'
import axios from 'axios'
import './App.css'
import WeatherInformations from './components/WeatherInformations/WeatherInformations'
import WeatherInformationsFiveDays from './components/WeatherInformationsFiveDays/WeatherInformationsFiveDays'

function App() {
  const [weather, setWeather] = useState()
  const [weatherFiveDays, setWeatherFiveDays] = useState()
    //para mostrar na tela
    //weather -> variavel que mostra conteudo na tela
    //setWeather -> função que coloca valor na variavel weather
    //configuraçao de acesso ao DB
  const inputRef = useRef()

  async function searchCity(){
    const city = inputRef.current.value
    const key = "82ef7a7f25a01dddde90e7dd1168af06"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`
    const urlFiveDays = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`

    const apiInfo = await axios.get(url)
    const apiInfoFiveDays = await axios.get(urlFiveDays)
    
    setWeatherFiveDays(apiInfoFiveDays.data) 
    setWeather(apiInfo.data) //Os dados vem da API

  }

  return (
    <div className="container">
      <h1>App Previsão do Tempo</h1>
      <input ref={inputRef} type="text" placeholder='Digite o nome da cidade' />
      <button onClick={searchCity}>Buscar</button>

      {weather && <WeatherInformations weather={weather}/> }
      {weatherFiveDays && <WeatherInformationsFiveDays weatherFiveDays={weatherFiveDays}/> }
    </div>
  )
}


export default App
 
