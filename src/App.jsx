
import { useEffect, useState, useRef } from 'react'
import './App.css'
import WeatherCards from './components/WeatherCards'
import useFetch from './hooks/useFetch'
import Loader from './components/Loader'
import Error from './components/Error'
import axios from 'axios'
import './index.css'


function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLocationAllowed, setIsLocationAllowed] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [errorPermission, setErrorPermission] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [backgroundImage, setBackgroundImage] = useState('')
  
  const apiKey = '31636c51e821f1a97723edd72bdf454d'
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords?.lat}&lon=${coords?.lon}&appid=${apiKey}`

  const [infoApi, getApi, hasError] = useFetch(url)
  
  useEffect(() => {
    const success = pos => {
      const obj ={
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(obj)
      setIsLocationAllowed(true)
      setIsLoading(false)
    }
    const err = () => {
      setIsLocationAllowed(false)
      setErrorPermission(true)
      setIsLoading(false)
      console.log('err')
    }
    navigator.geolocation.getCurrentPosition(success, err)
  }, []) 

  useEffect(() => {
    if (coords) {
      getApi(url)
    }
  }, [coords]);

  useEffect(() => {
    if (infoApi) {
        setWeather(infoApi)
        const obj = {
          celsius: (infoApi.main.temp - 273.15).toFixed(1),
          farenheit: ((infoApi.main.temp -273.15) * 9/5 + 32).toFixed(2)
         }
        setTemp(obj)
        if (infoApi.weather && infoApi.weather[0] && infoApi.weather[0].icon) {
          const iconCode = infoApi.weather[0].icon;
          setBackgroundImage(`/images/images-weather/${iconCode}.jpg`);
        }
      }
    }, [infoApi])

    useEffect(()=> {
      if (inputValue === '') {
        setBackgroundImage('')
      }
    }, [inputValue])

  const inputSearch = useRef()

  const handleSubmit = e => {
    e.preventDefault()
    const locationValue = inputSearch.current.value.trim()
    if (locationValue) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${locationValue}&appid=${apiKey}`
      axios.get(url)
      .then(res => {
          const data = res.data
          setWeather(data)
          const obj = {
            celsius: (data.main.temp - 273.15).toFixed(1),
            farenheit: ((data.main.temp -273.15) * 9/5 + 32).toFixed(2)
          }
          setTemp(obj)
          setInputValue(locationValue)
          setErrorPermission(false)
          if (data.weather && data.weather[0] && data.weather[0].icon) {
            const iconCode = data.weather[0].icon;
            setBackgroundImage(`/images/images-weather/${iconCode}.jpg`);
          }
         })
         .catch (err => {
          console.log(err)
          setWeather(null)
          setErrorPermission(true)
         })
      
    }
  }
 
  
  return (
    <div className='app' style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h1 className='weather__title__main'>Weather App</h1>.
      <h2 className='weather__inputValue'>{inputValue}</h2>
       <form onSubmit={handleSubmit}>
        <input className='weather__input' ref={inputSearch} type='text' placeholder='Escribe ciudad o país'/>
        <button className='weather__btn'>Search</button>
       </form>
    {
      isLoading
      ? (<Loader />) 
      : errorPermission || hasError 
        ? (<Error />) 
      : isLocationAllowed || infoApi
        ?  (<WeatherCards 
            weather={weather} 
            temp={temp} 
            
            />)
           : (<Error />)
    }
    </div>
  )
}

export default App
