import axios from 'axios'
const API_KEY = process.env.REACT_APP_API_KEY


export const GET_FORECAST_FOR_CITY = 'GET_FORECAST_FOR_CITY'

export const FETCH_CITY_FORECAST_REQUEST = 'FETCH_CITY_FORECAST_REQUEST'
export const FETCH_CITY_FORECAST_SUCCESS = 'FETCH_CITY_FORECAST_SUCCESS'
export const FETCH_CITY_FORECAST_FAILURE = 'FETCH_CITY_FORECAST_FAILURE'

export const CLOSE_CITY_FORECAST = 'CLOSE_CITY_FORECAST'

export const GET_D5_CITY_FORECAST = 'GET_D5_CITY_FORECAST'
export const FETCH_D5_CITY_FORECAST_REQUEST = 'FETCH_D5_CITY_FORECAST_REQUEST'
export const FETCH_D5_CITY_FORECAST_SUCCESS = 'FETCH_D5_CITY_FORECAST_SUCCESS'
export const FETCH_D5_CITY_FORECAST_FAILURE = 'FETCH_D5_CITY_FORECAST_FAILURE'

export const CLOSE_D5_FORECAST = 'CLOSE_D5_FORECAST'

// single forecast

export const closeCityForecast = () => {
  return {
    type: CLOSE_CITY_FORECAST
  }
}

export const fetchCityForecastRequest = (loading) => {
  return {
    type: FETCH_CITY_FORECAST_REQUEST,
    payload: loading
  }
}

export const fetchCityForecastSuccess = (forecast) => {
  return {
    type: FETCH_CITY_FORECAST_SUCCESS,
    payload: forecast
  }
}

export const fetchCityForecastFailure = (error) => {
  return {
    type: FETCH_CITY_FORECAST_FAILURE,
    payload: error
  }
}

export const getForecastForCity = (data) => {
  return (dispatch) => {
    // console.log('city forecast', data)
    dispatch(fetchCityForecastRequest(true))


    // console.log('pobieram')

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=${API_KEY}&units=metric&lang=pl`)
      // axios.get(`https://jsonplaceholder.typicode.com/todos/1`)
      .then(response => {
        // console.log('response city')
        const forecast = { name: data, forecast: response.data }

        dispatch(fetchCityForecastSuccess(forecast))
      })
      .catch(error => {
        console.log(error)
        dispatch(fetchCityForecastFailure(error.message))
      })

  }


}








// 5 days forecast
export const fetchD5CityForecastRequest = (loading) => {
  return {
    type: FETCH_D5_CITY_FORECAST_REQUEST,
    payload: loading,
  }
}

export const fetchD5CityForecastSuccess = (data) => {
  return {
    type: FETCH_D5_CITY_FORECAST_SUCCESS,
    payload: data,
  }
}

export const fetchD5CityForecastFailure = (error) => {
  return {
    type: FETCH_D5_CITY_FORECAST_FAILURE,
    payload: error,
  }
}

export const getD5CityForecast = (data) => {
  return (dispatch) => {
    dispatch(fetchD5CityForecastRequest(true))

    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${data}&appid=${API_KEY}&units=metric&lang=pl`)
      // axios.get(`https://jsonplaceholder.typicode.com/todos/1`)
      .then(response => {
        // console.log('response d5')


        // let responseData = fak.data.list
        let responseData = response.data.list

        let forecast = {
          day: [],
          hour: [],
          tempMax: [],
          tempMin: [],
          feels_like: [],
          humidity: []
        }

        responseData.forEach(item => {
          let obj = {
            day: new Date(item.dt * 1000).toLocaleDateString(),
            hour: new Date(item.dt * 1000).toLocaleTimeString(),
            tempMax: item.main.temp_max,
            tempMin: item.main.temp_min,
            feels_like: item.main.feels_like,
            humidity: item.main.humidity,
          }

          forecast = {
            ...forecast,
            day: [...forecast.day, obj.day],
            hour: [...forecast.hour, obj.hour],
            tempMax: [...forecast.tempMax, obj.tempMax],
            tempMin: [...forecast.tempMin, obj.tempMin],
            feels_like: [...forecast.feels_like, obj.feels_like],
            humidity: [...forecast.humidity, obj.humidity]
          }
        })

        // console.log('response 5d')
        dispatch(fetchD5CityForecastSuccess(forecast))
      })
      .catch(error => {
        dispatch(fetchD5CityForecastFailure(error))
      })

  }
}


export const closeD5Forecast = () => {
  return {
    type: CLOSE_D5_FORECAST
  }
}