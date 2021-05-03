import { GET_FORECAST_FOR_CAPITALS } from './actions'

function reducer(state, action) {
  if (action.type === GET_FORECAST_FOR_CAPITALS) {
    console.log('dziala')
  }


  return state
}


export default reducer