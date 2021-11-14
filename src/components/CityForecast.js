import React from 'react';
import { connect } from 'react-redux'
// import test from '../testData/testForeCastData'
import D5Forecast from '../components/D5Forecast'
import { ImArrowUp } from 'react-icons/im'
import { IoCloseSharp } from 'react-icons/io5'
import { FiSunrise, FiSunset } from 'react-icons/fi'
import { closeCityForecast, getD5CityForecast } from '../redux/actions/cityForecastAction'

import clearskyVideo from '../video/meteo_clearsky.webm'
import cloudsVideo from '../video/meteo_clouds.webm'
import rainVideo from '../video/meteo_rain.webm'
import thunderVideo from '../video/meteo_thunder.webm'


const CityForecast = ({ city, closeCityForecast, getD5CityForecast }) => {
  // const [isOpen, setIsOpen] = React.useState(isForecastOpen)
  const [isOpen, setIsOpen] = React.useState(false)

  // const [forecast, setForecast] = React.useState([])
  // const [forecast, setForecast] = React.useState({ city: 'kekw', forecast: test })




  // const weatherTypes = ['01', '02', '03', '04', '09', '10', '11', '13', '50']

  const getVideoSource = (w) => {
    let code = w.icon
    code = code.split('')
    code.pop()
    code = code.join('')

    if (code === '01') {
      return clearskyVideo
    } else if (code === '02' || code === '03' || code === '04') {
      return cloudsVideo
    } else if (code === '04' || code === '09' || code === '10' || code === '13' || code === '50') {
      return rainVideo
    } else {
      return thunderVideo
    }


  }

  React.useEffect(() => {

  }, [])

  if (!city.isOpen) {
    return <div className={`city-forecast ${isOpen ? null : 'hidden'}`}>loading ...</div>
  }

  const { coord, weather, main, wind, clouds, dt, sys, visibility } = city.forecast
  // base, snow, rain,name,


  return (
    <div className={`city-forecast ${city.isOpen ? null : 'hidden'}`}>
      <div className="close-icon"><IoCloseSharp className='close-icon-icon' onClick={() => closeCityForecast()} /></div>
      <div className="video">
        <video src={getVideoSource(weather[0])} autoPlay={true} muted={true} loop={true}></video>
      </div>
      <div className="rest-of-forecast">
        <h1 className="city-name">{city.city}</h1>
        <p className="coords">({coord.lon}, {coord.lat})</p>

        <div className="forecast-value">
          <div className="weather-icon">
            <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="" />
          </div>
          <h3>{weather[0].description}</h3>
          <h2>{main.temp} °C</h2>
        </div>
        <div className="parameters">
          <h4>Parametry pogodowe:</h4>
          <div className="temp-min">Temperatura minimalna: <span>{main.temp_min} °C</span></div>
          <div className="temp-max">Temperatura maksymalna: <span>{main.temp_max} °C</span></div>
          <div className="temp-od">Temperatura odczuwalna: <span>{main.feels_like} °C</span></div>
          <div className="visibility">Widzialność: <span>{visibility} m</span></div>
          <div className="wind">Wiatr: <span>{wind.speed} m/s <span className="direction" ><ImArrowUp style={{ transform: `rotate(${wind.deg}deg)`, transformOrigin: 'center' }} /></span></span></div>
          <div className="clouds">Zachmurzenie: <span>{clouds.all}%</span></div>
          <div className="sunrise">Wschód słońca: <span>{new Date(sys.sunrise * 1000).toLocaleTimeString()} <FiSunrise /></span></div>
          <div className="sunset">Zachód słońca: <span>{new Date(sys.sunset * 1000).toLocaleTimeString()} <FiSunset /></span></div>
          <div className="time-of-measure">(Stan na: {new Date(dt * 1000).toLocaleDateString()} - {new Date(dt * 1000).toLocaleTimeString()})</div>
        </div>
      </div>
      {!city.d5Open && <button className='d5-day-forecast-button' onClick={() => getD5CityForecast(city.city)}>Pokaż pogodę 5dniową</button>}
      {city.d5Open && <D5Forecast />}
    </div >
  );
}

const mapStateToProps = ({ city }) => {
  return { city }
}
const mapDispatchToProps = (dispatch) => {
  return {
    closeCityForecast: () => dispatch(closeCityForecast()),
    getD5CityForecast: (data) => dispatch(getD5CityForecast(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CityForecast);