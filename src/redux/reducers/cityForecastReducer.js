import { FETCH_CITY_FORECAST_REQUEST, FETCH_CITY_FORECAST_SUCCESS, FETCH_CITY_FORECAST_FAILURE, CLOSE_CITY_FORECAST, FETCH_D5_CITY_FORECAST_REQUEST, FETCH_D5_CITY_FORECAST_SUCCESS, FETCH_D5_CITY_FORECAST_FAILURE, } from '../actions/cityForecastAction'

const cityForecastInitialState = {
  // city: '',
  // forecast: {},
  loading: false,
  // isOpen: false,
  errorMsg: '',

  d5: {
    day: [],
    hour: [],
    tempMax: [],
    tempMin: [],
    humidity: []
  },
  d5Open: false,
  d5Error: '',
  d5Loading: false,


  city: 'Szczytno',
  forecast: {
    coord: {
      lon: -122.08,
      lat: 37.39
    },
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "04d"
      }
    ],
    base: "stations",
    main: {
      temp: 282.55,
      feels_like: 281.86,
      temp_min: 280.37,
      temp_max: 284.26,
      pressure: 1023,
      humidity: 100
    },
    visibility: 16093,
    wind: {
      speed: 1.5,
      deg: 350
    },
    clouds: {
      all: 1
    },
    dt: 1560350645,
    sys: {
      type: 1,
      id: 5122,
      message: 0.0139,
      country: "US",
      sunrise: 1560343627,
      sunset: 1560396563
    },
    timezone: -25200,
    id: 420006353,
    name: "Mountain View",
    cod: 200

  },
  isOpen: true,

}

export const cityForecastReducer = (state = cityForecastInitialState, action) => {
  if (action.type === FETCH_CITY_FORECAST_REQUEST) {
    console.log('request city')
    return { ...state, loading: action.payload }
  }
  if (action.type === FETCH_CITY_FORECAST_SUCCESS) {
    console.log('success city')
    return { ...state, city: action.payload.name, forecast: action.payload.forecast, loading: false, isOpen: true }
  }
  if (action.type === FETCH_CITY_FORECAST_FAILURE) {
    console.log('failure city')
    return { ...state, loading: false, isOpen: false, errorMsg: action.payload }
  }
  if (action.type === CLOSE_CITY_FORECAST) {
    console.log('closing city forecast')
    return { ...state, isOpen: false, forecast: {}, city: '' }
  }

  // 5d forecast
  if (action.type === FETCH_D5_CITY_FORECAST_REQUEST) {
    console.log('5 days forecast request')
    return { ...state, d5Loading: true, d5Open: true }
  }
  if (action.type === FETCH_D5_CITY_FORECAST_SUCCESS) {
    // console.log(action.payload)
    console.log('5 days forecast success')
    return { ...state, d5Loading: false, d5: action.payload }
  }

  if (action.type === FETCH_D5_CITY_FORECAST_FAILURE) {
    console.log('5 days forecast failure', action.payload)
    return { ...state, d5Loading: false, d5Open: false, d5Error: action.payload }
  }




  return state
}