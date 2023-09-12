import { useEffect, useState } from "react"


const WeatherCards = ({ weather, temp}) => {

  
  const [isCelsius, setIsCelsius] = useState (true)
  

  const handleChangeTemp = () => setIsCelsius(!isCelsius)

 
  
  return (
    <article className="weather__card">
      <h2 className="weather__title">{weather?.name}, {weather?.sys.country}</h2>
      <div className="weather__body">
      <div className="weather__icon">
        <img className="weather__img" src={weather && `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
      </div>
      <section className="wheater__information">
        <h3 className="weather__description">"{weather?.weather[0].description}"</h3>
        <ul className="weather__list">
          <li className="weather__item">
            <span className="weather__label">Wind Speed</span>
            <span className="weather__value">{weather?.wind.speed} m/s</span></li>
          <li className="weather__item">
            <span className="weather__label">Clouds </span>
            <span className="weather__value">{weather?.clouds.all} %</span></li>
          <li className="weather__item">
            <span className="weather__label">Presurre </span>
            <span className="weather__value">{weather?.main.pressure} hPa</span></li>
        </ul>
      </section>
      </div>
      <h2 className="weather__button__content">{isCelsius ? `${temp?.celsius} °C` : `${temp?.farenheit} °F`}</h2>
      <button className="weather__button" onClick={handleChangeTemp}>{isCelsius ? 'Change to °F' : 'Change to °C'}</button> 
    </article>
  )
}

export default WeatherCards
