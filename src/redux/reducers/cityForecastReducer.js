import { FETCH_CITY_FORECAST_REQUEST, FETCH_CITY_FORECAST_SUCCESS, FETCH_CITY_FORECAST_FAILURE, CLOSE_CITY_FORECAST, FETCH_D5_CITY_FORECAST_REQUEST, FETCH_D5_CITY_FORECAST_SUCCESS, FETCH_D5_CITY_FORECAST_FAILURE, CLOSE_D5_FORECAST } from '../actions/cityForecastAction'

const cityForecastInitialState = {
  city: '',
  forecast: {},
  loading: false,
  isOpen: false,
  errorMsg: '',

  d5: {
    day: [],
    hour: [],
    tempMax: [],
    tempMin: [],
    feels_like: [],
    humidity: []
  },
  d5Open: false,
  d5Error: '',
  d5Loading: false,



}

export const cityForecastReducer = (state = cityForecastInitialState, action) => {
  if (action.type === FETCH_CITY_FORECAST_REQUEST) {
    // console.log('request city')
    return { ...state, loading: action.payload }
  }
  if (action.type === FETCH_CITY_FORECAST_SUCCESS) {
    // console.log('success city')
    return { ...state, city: action.payload.name, forecast: action.payload.forecast, loading: false, isOpen: true }
  }
  if (action.type === FETCH_CITY_FORECAST_FAILURE) {
    // console.log('failure city')
    return { ...state, loading: false, isOpen: false, errorMsg: action.payload }
  }
  if (action.type === CLOSE_CITY_FORECAST) {
    // console.log('closing city forecast')
    return { ...state, isOpen: false, forecast: {}, city: '' }
  }

  // 5d forecast
  if (action.type === FETCH_D5_CITY_FORECAST_REQUEST) {
    // console.log('5 days forecast request')
    return { ...state, d5Loading: true, d5Open: true }
  }
  if (action.type === FETCH_D5_CITY_FORECAST_SUCCESS) {
    // console.log(action.payload)
    // console.log('5 days forecast success')
    return { ...state, d5Loading: false, d5: action.payload }
  }

  if (action.type === FETCH_D5_CITY_FORECAST_FAILURE) {
    // console.log('5 days forecast failure', action.payload)
    return { ...state, d5Loading: false, d5Open: false, d5Error: action.payload }
  }
  if (action.type === CLOSE_D5_FORECAST) {
    return {
      ...state, d5Open: false, d5: {
        day: [],
        hour: [],
        tempMax: [],
        tempMin: [],
        feels_like: [],
        humidity: []
      }
    }
  }



  return state
}