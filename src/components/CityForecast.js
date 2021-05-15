import React from 'react';
import { connect } from 'react-redux'
import test from '../testData/testForeCastData'

const CityForecast = ({ isForecastOpen, cityForecast, latestCity }) => {
  // const [isOpen, setIsOpen] = React.useState(isForecastOpen)
  const [isOpen, setIsOpen] = React.useState(true)

  // const [forecast, setForecast] = React.useState([])
  const [forecast, setForecast] = React.useState({ city: 'kekw', forecast: test })

  React.useEffect(() => {
    // setIsOpen(isForecastOpen)

    // setForecast(cityForecast.find(item => item.city === latestCity))

    console.log(forecast)
  }, [isForecastOpen, isOpen, cityForecast, latestCity, forecast])
  return (
    <div className={`city-forecast ${isOpen ? null : 'hidden'}`}>
      city forecast {isOpen ? 'open' : 'closed'}
    </div>
  );
}

const mapStateToProps = ({ isForecastOpen, cityForecast, latestCity }) => {
  return { isForecastOpen, cityForecast, latestCity }
}
// const mapDispatchToProps = ({ dispatch }) => {
//   return {  }
// }

export default connect(mapStateToProps, null)(CityForecast);