import { GET_FORECAST_FOR_CAPITALS, FETCH_CAPITALS_FORECAST_REQUEST, FETCH_CAPITALS_FORECAST_SUCCESS, FETCH_CAPITALS_FORECAST_FAILURE } from '../actions/capitalsAction'


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


