export const GET_FORECAST_FOR_CAPITALS = 'GET_FORECAST_FOR_CAPITALS'
export const GET_VALUES_FROM_VECTOR = 'GET_VALUES_FROM_VECTOR'




export const getForecastForCapitals = (capitals) => {
  return { type: GET_FORECAST_FOR_CAPITALS, payload: { capitals } }
}

export const getValuesFromVector = (data) => {
  return { type: GET_VALUES_FROM_VECTOR, payload: { data } }
}