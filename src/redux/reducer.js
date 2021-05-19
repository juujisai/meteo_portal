import { GET_VALUES_FROM_VECTOR, SHOW_CITY_FORECAST, HIDE_FORECAST } from './actions'
import responseZ from '../testData/testForeCastData'

import { Style } from 'ol/style'
import Icon from 'ol/style/Icon'
import Text from 'ol/style/Text'
import API_KEY from '../key'

function reducer(state, action) {

  if (action.type === GET_VALUES_FROM_VECTOR) {
    const { layer, cell } = action.payload.data

    let forecast = [];

    if (JSON.parse(localStorage.getItem('capitalsForecast')) !== null && JSON.parse(localStorage.getItem('capitalsForecast')).length !== 0) {
      let temp = JSON.parse(localStorage.getItem('capitalsForecast'))
      let tempDate = JSON.parse(localStorage.getItem('capitalsForecastTime'))

      let today = new Date().toLocaleDateString()
      // let today = '14.05.2021'

      if (tempDate !== today) {
        console.log('dane przestarzałe')
      } else {
        console.log('pobieram stare dane z localstorage')
        forecast = temp
      }
    }





    layer.getSource().addEventListener('change', function (e) {
      const source = e.target
      let featuresValue = []







      if (source.getState() === 'ready' && featuresValue.length === 0) {
        let features = e.target.getFeatures()
        features.forEach(item => featuresValue = [...featuresValue, { name: item.get(cell) }])





        if (forecast.length === 0) {
          console.log('pobieram nowe dane')

          featuresValue.forEach(item => {
            console.log(item)
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${item.name}&appid=${API_KEY}&units=metric&lang=pl`)
              .then(response => response.json())
              .then(data => {
                console.log(data)
                forecast = [...forecast, { name: item.name, forecast: data }]
                localStorage.setItem('capitalsForecast', JSON.stringify(forecast))
                localStorage.setItem('capitalsForecastTime', JSON.stringify(new Date().toLocaleDateString()))



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
              }

              )


          })
        }

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

  if (action.type === SHOW_CITY_FORECAST) {
    let cityForecast = [...state.cityForecast]
    let city = action.payload.city
    localStorage.setItem('latestCity', JSON.stringify(city))

    if (JSON.parse(localStorage.getItem('cityForecast')) !== null && JSON.parse(localStorage.getItem('cityForecast')).length !== 0) {
      let temp = JSON.parse(localStorage.getItem('cityForecast'))
      let tempDate = JSON.parse(localStorage.getItem('cityForecastTime'))

      let today = new Date().toLocaleDateString()
      // let today = '14.05.2021'

      if (tempDate !== today) {
        console.log('dane z zapytania przestarzałe')
      } else {
        console.log('pobieram stare dane z zapytania z localstorage')
        cityForecast = temp
      }
    }

    if (cityForecast.filter(item => item.city === city).length === 0) {
      console.log('pobieram nowe dane z zapytania')

      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pl`)
        .then(response => response.json())
        .then(data => {
          // let response = responseZ
          if (data.cod === '404') {
            alert('błąd w nazwie miasta')
            return { ...state, isForecastOpen: false }

          } else {
            cityForecast = [...cityForecast, { city, forecast: data }]
            localStorage.setItem('cityForecast', JSON.stringify(cityForecast))
            localStorage.setItem('cityForecastTime', JSON.stringify(new Date().toLocaleDateString()))

            localStorage.setItem('latestCity', JSON.stringify(city))
            console.log(cityForecast)

            return { ...state, isForecastOpen: true, cityForecast, latestCity: city }
          }
        })


    }
    return { ...state, isForecastOpen: true, cityForecast, latestCity: city }

  }


  if (action.type === HIDE_FORECAST) {
    return { ...state, isForecastOpen: false }
  }



  return state
}


export default reducer