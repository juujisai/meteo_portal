import { GET_FORECAST_FOR_CAPITALS, FETCH_CAPITALS_FORECAST_REQUEST, FETCH_CAPITALS_FORECAST_SUCCESS, FETCH_CAPITALS_FORECAST_FAILURE } from '../actions/capitalsAction'



// import { Style } from 'ol/style'

// import Icon from 'ol/style/Icon'
// import Text from 'ol/style/Text'



// function set Style
// const setStyle = (forecast, layer, cell) => {
//   // console.log(forecast)
//   layer.setStyle(function (feature) {
//     let value = forecast
//     for (let i = 0; i < value.length; i++) {
//       // console.log('wykonuje')
//       if (feature.get(cell) === value[i].name) {
//         feature.setStyle(new Style({
//           image: new Icon({
//             src: `http://openweathermap.org/img/wn/${value[i].forecast.weather[0].icon}@2x.png`,
//             scale: 1,
//           }),
//           text: new Text({
//             text: `
//                       ${value[i].name} 
//                       ${value[i].forecast.main.temp} °C
//                       `,
//             offsetY: 50,
//             offsetX: -30,
//             scale: 1.5
//           })
//         })
//         )
//       }

//     }
//   })
// }
// end of function setStyle







const capitalsInitialStore = {
  capitalForecast: [],
  capitals: [],
  loading: false,
  error: '',

}




export const capitalsReducer = (state = capitalsInitialStore, action) => {
  if (action.type === FETCH_CAPITALS_FORECAST_REQUEST) {
    // console.log('request')
    return { ...state, loading: true }
  }
  if (action.type === FETCH_CAPITALS_FORECAST_SUCCESS) {
    // console.log('success')
    const { capitalsForecast } = action.payload

    return {
      ...state,
      loading: false,
      capitalForecast: capitalsForecast,
      error: ''
    }
  }
  if (action.type === FETCH_CAPITALS_FORECAST_FAILURE) {
    // console.log('failure', action.payload)
    return {
      ...state,
      loading: true,
      error: action.payload
    }
  }

  if (action.type === GET_FORECAST_FOR_CAPITALS) {
    // console.log('kek')
  }

  return state
}


