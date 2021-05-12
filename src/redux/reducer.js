import { GET_FORECAST_FOR_CAPITALS, GET_VALUES_FROM_VECTOR } from './actions'
import responseZ from '../testData/testForeCastData'

import { Style } from 'ol/style'
import Icon from 'ol/style/Icon'
import Text from 'ol/style/Text'


function reducer(state, action) {
  if (action.type === GET_FORECAST_FOR_CAPITALS) {
    let capitalForecast = [...state.capitalForecast]
    const capitals = action.payload.capitals

    capitals.forEach(item => {
      // fetch(`api.openweathermap.org/data/2.5/weather?q={${item}}&appid={${API_KEY}}`)
      //   .then(response => response.json())
      //   .then(data => console.log(data))
      let response = responseZ
      response.capital = item

      capitalForecast = [...capitalForecast, response]

    })
    return { ...state, capitalForecast }
  }
  if (action.type === GET_VALUES_FROM_VECTOR) {
    const { layer, cell } = action.payload.data

    layer.getSource().addEventListener('change', function (e) {
      const source = e.target
      let featuresValue = []


      if (source.getState() === 'ready' && featuresValue.length === 0) {
        let features = e.target.getFeatures()
        features.forEach(item => featuresValue = [...featuresValue, { name: item.get(cell) }])



        let forecast = [];
        featuresValue.forEach(item => {
          // fetch(`api.openweathermap.org/data/2.5/weather?q={${item}}&appid={${API_KEY}}`)
          //   .then(response => response.json())
          //   .then(data => console.log(data))
          let response = responseZ

          forecast = [...forecast, { name: item.name, forecast: response }]

        })
        console.log('d')


        layer.setStyle(function (feature) {
          let value = forecast
          for (let i = 0; i < value.length; i++) {

            if (feature.get(cell) === value[i].name) {
              feature.setStyle(new Style({
                image: new Icon({
                  src: `http://openweathermap.org/img/wn/${value[i].forecast.weather[0].icon}@2x.png`,
                  scale: 1,
                }),
                text: new Text({
                  text: `
                  ${value[i].name} 
                  ${value[i].forecast.main.temp} °C
                  `,
                  offsetY: 50,
                  offsetX: -30,
                  scale: 1.5
                })
              })
              )
            }

          }
        })


        return { ...state, capitals: featuresValue }
      }
    })

  }

  return state
}


export default reducer