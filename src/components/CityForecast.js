import React from 'react';
import { connect } from 'react-redux'
// import test from '../testData/testForeCastData'
import D5Forecast from '../components/D5Forecast'
import { ImArrowUp } from 'react-icons/im'
import { IoCloseSharp } from 'react-icons/io5'
import { FiSunrise, FiSunset } from 'react-icons/fi'
import { closeCityForecast, getD5CityForecast } from '../redux/actions/cityForecastAction'


import day from '../images/day.jpg'
import night from '../images/night.jpg'
import cloudsDay from '../images/clouds_day.png'
import cloudsNight from '../images/clouds_night.png'
import bubble1 from '../images/rain_bubble_1.png'
import bubble2 from '../images/rain_bubble_2.png'
import bubble3 from '../images/rain_bubble_3.png'
import bubble4 from '../images/rain_bubble_4.png'
import bubble5 from '../images/rain_bubble_5.png'
// import rain from '../images/rain_lines.png'
import snow from '../images/snow.png'
import fog from '../images/fog.png'


const CityForecast = ({ city, closeCityForecast, getD5CityForecast }) => {
  // const [isOpen, setIsOpen] = React.useState(isForecastOpen)
  const [isOpen, setIsOpen] = React.useState(false)
  const [numberOfBubbles, setNumberOfBubbles] = React.useState([])
  // const [forecast, setForecast] = React.useState([])
  // const [forecast, setForecast] = React.useState({ city: 'kekw', forecast: test })



  let rainTypes = [bubble1, bubble2, bubble3, bubble4, bubble5]

  let f = numberOfBubbles.map((item, id) => {

    return (
      <img key={id} id='raindrop' src={rainTypes[item.r]} alt="Kropla deszczu" style={{
        position: 'absolute',
        left: `${item.x}%`,
        top: `${item.y}%`,
        filter: ''
      }} />
    )
  }

  )
  React.useEffect(() => {
    let interval;

    if (city.isOpen) {



      interval = setInterval(() => {

        const x = Math.floor(Math.random() * 100)
        const y = Math.floor(Math.random() * 100)
        const r = Math.floor(Math.random() * 5)
        let b = numberOfBubbles

        if (b.length < 100) {

          b = [...b, { x, y, r }]
        } else {
          clearInterval(interval)
        }

        setNumberOfBubbles(b)
      }, 400)
    }
    return () => clearInterval(interval)
  }, [city, numberOfBubbles])


  if (!city.isOpen) {
    return <div className={`city-forecast ${isOpen ? null : 'hidden'}`}>loading ...</div>
  }

  const { coord, weather, main, wind, clouds, dt, sys, visibility } = city.forecast


  // let whichIcon = weather[0].icon
  let whichIcon = '50n'

  const weatherF = (a) => {
    if (a === '01d') return 'sunny-weather'
    if (a === '02d' || a === '03d' || a === '04d') return 'cloudy-weather-day'
    if (a === '02n' || a === '03n' || a === '04n') return 'cloudy-weather-night'
    if (a === '11d' || a === '11n') return 'storm-weather'
    if (a === '09d' || a === '09n' || a === '10d' || a === '10n') return 'rain-weather'
    if (a === '13d' || a === '13n') return 'fog-weather'
    if (a === '50d' || a === '50n') return 'snow-weather'


  }


  // base, snow, rain,name,

  return (
    <div className={`city-forecast ${city.isOpen ? null : 'hidden'}`}>
      {!city.d5Open && <div className="close-icon"><IoCloseSharp className='close-icon-icon' onClick={() => closeCityForecast()} /></div>}
      <div className="weather-animation">
        <div className="base-img">
          <img src={whichIcon[whichIcon.length - 1] === 'd' ? day : night} alt="zdjęcie miasta" />
        </div>
        {weatherF(whichIcon) === 'sunny-weather' && <div className="weather-cont sunny-weather"></div>}
        {weatherF(whichIcon) === 'cloudy-weather-day' && <div className="weather-cont cloudy-weather-day">
          <img src={cloudsDay} alt="Chmury w dzień" />

        </div>}
        {weatherF(whichIcon) === 'cloudy-weather-night' && <div className="weather-cont cloudy-weather-night">
          <img src={cloudsNight} alt="Chmury w nocy" />
        </div>}
        {weatherF(whichIcon) === 'storm-weather' && <div className="weather-cont storm-weather">
          <img src={cloudsDay} alt="Chmury w dzień" />
        </div>}
        {weatherF(whichIcon) === 'rain-weather' && <div className='weather-cont rain-weather'>
          <img src={cloudsDay} alt="Chmury w dzień" />
          {f}
        </div>}
        {weatherF(whichIcon) === 'fog-weather' && <div className="weather-cont fog-weather">
          <div>
            <img src={fog} alt="Zdjęcie mgły" />
            <img src={fog} alt="Zdjęcie mgły" />
          </div>
        </div>}
        {weatherF(whichIcon) === 'snow-weather' && <div className="weather-cont snow-weather">
          <div>
            <img src={snow} alt="Płatki śniegu" />
            <img src={snow} alt="Płatki śniegu" />
          </div>
        </div>}





        <div className="make-darker"></div>
      </div>

      <div className="rest-of-forecast">
        <h1 className="city-name">{city.city}</h1>
        <p className="coords">({coord.lon}, {coord.lat})</p>

        <div className="forecast-value">
          <div className="forecast-city-main-info">
            <div className="weather-icon">
              <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="" />
            </div>
            <div className="forecast-city-main-info-data">
              <h3>{weather[0].description}</h3>
              <h2>{main.temp} °C</h2>
            </div>
          </div>
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