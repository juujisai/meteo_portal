export const GET_FORECAST_FOR_CAPITALS = 'GET_FORECAST_FOR_CAPITALS'





export const getForecastForCapitals = (capitals) => {
  return { type: GET_FORECAST_FOR_CAPITALS, payload: { capitals } }
}