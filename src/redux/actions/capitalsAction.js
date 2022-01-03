import axios from 'axios'
const API_KEY = process.env.REACT_APP_API_KEY






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
export const fetchCapitalsForecastSuccess = (capitalsForecast, layer, cell, capitals) => {
  return {
    type: FETCH_CAPITALS_FORECAST_SUCCESS,
    payload: { capitalsForecast, layer, cell, capitals }
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
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${item}&appid=${API_KEY}&units=metric&lang=pl`)
        // axios.get(`https://jsonplaceholder.typicode.com/todos/1`)
        .then(response => {
          // console.log('response')
          const forecast = response.data
          capitalsForecast = [...capitalsForecast, { name: item, forecast }]

          data.featuresValue.length === capitalsForecast.length && dispatch(fetchCapitalsForecastSuccess(capitalsForecast, data.layer, data.cell, data.featuresValue))


        })
        .catch(error => {
          errorMsg = error.message
          console.log(error)
          dispatch(fetchCapitalsForecastFailure(errorMsg))
        })

    })
  }
}