import axios from 'axios'
import API_KEY from '../../key'


export const GET_FORECAST_FOR_CITY = 'GET_FORECAST_FOR_CITY'

export const FETCH_CITY_FORECAST_REQUEST = 'FETCH_CITY_FORECAST_REQUEST'
export const FETCH_CITY_FORECAST_SUCCESS = 'FETCH_CITY_FORECAST_SUCCESS'
export const FETCH_CITY_FORECAST_FAILURE = 'FETCH_CITY_FORECAST_FAILURE'

export const CLOSE_CITY_FORECAST = 'CLOSE_CITY_FORECAST'

export const GET_D5_CITY_FORECAST = 'GET_D5_CITY_FORECAST'
export const FETCH_D5_CITY_FORECAST_REQUEST = 'FETCH_D5_CITY_FORECAST_REQUEST'
export const FETCH_D5_CITY_FORECAST_SUCCESS = 'FETCH_D5_CITY_FORECAST_SUCCESS'
export const FETCH_D5_CITY_FORECAST_FAILURE = 'FETCH_D5_CITY_FORECAST_FAILURE'


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
    console.log('city forecast', data)
    dispatch(fetchCityForecastRequest(true))


    // console.log('pobieram')

    // axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${data}&appid=${API_KEY}&units=metric&lang=pl`)
    axios.get(`https://jsonplaceholder.typicode.com/todos/1`)
      .then(response => {
        console.log('response city')
        // const forecast = { name: data, forecast: response.data }
        const forecast = {
          name: data,
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

          }
        }

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

    // axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${data}&appid=${API_KEY}`)
    axios.get(`https://jsonplaceholder.typicode.com/todos/1`)
      .then(response => {
        // console.log(response)
        console.log('response 5d')
        // const response = ['kekw']
        const forecast = ['kekw']
        dispatch(fetchD5CityForecastSuccess(forecast))
      })
      .catch(error => {
        dispatch(fetchD5CityForecastFailure(error))
      })

  }
}