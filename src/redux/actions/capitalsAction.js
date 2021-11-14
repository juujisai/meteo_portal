import axios from 'axios'
import API_KEY from '../../key'







export const GET_FORECAST_FOR_CAPITALS = 'GET_FORECAST_FOR_CAPITALS'

export const FETCH_CAPITALS_FORECAST_REQUEST = 'FETCH_CAPITALS_FORECAST_REQUEST'
export const FETCH_CAPITALS_FORECAST_SUCCESS = 'FETCH_CAPITALS_FORECAST_SUCCESS'
export const FETCH_CAPITALS_FORECAST_FAILURE = 'FETCH_CAPITALS_FORECAST_FAILURE'





export const fetchCapitalsForecastRequest = (loading) => {
  return {
    type: FETCH_CAPITALS_FORECAST_REQUEST,
    payload: loading,
  }
}
export const fetchCapitalsForecastSuccess = (capitalsForecast, layer, cell) => {
  return {
    type: FETCH_CAPITALS_FORECAST_SUCCESS,
    payload: { capitalsForecast, layer, cell }
  }
}
export const fetchCapitalsForecastFailure = (error) => {
  return {
    type: FETCH_CAPITALS_FORECAST_FAILURE,
    payload: error
  }
}

export const getForecastForCapitals = (data) => {
  return (dispatch) => {
    let capitalsForecast = []
    let errorMsg = ''
    dispatch(fetchCapitalsForecastRequest(true))

    data.featuresValue.forEach(item => {
      // console.log('pobieram')
      // axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${item}&appid=${API_KEY}&units=metric&lang=pl`)
      axios.get(`https://jsonplaceholder.typicode.com/todos/1`)
        .then(response => {
          // console.log('response')
          // const forecast = response.data
          const forecast = { weather: [{ icon: '04d' }], main: { temp: 9.9 } }
          capitalsForecast = [...capitalsForecast, { name: item, forecast }]

          data.featuresValue.length === capitalsForecast.length && dispatch(fetchCapitalsForecastSuccess(capitalsForecast, data.layer, data.cell))


        })
        .catch(error => {
          errorMsg = error.message
          console.log(error)
          dispatch(fetchCapitalsForecastFailure(errorMsg))
        })

    })
  }
}