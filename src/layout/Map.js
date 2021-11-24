import React from 'react';
import { connect } from 'react-redux'
import { getForecastForCapitals } from '../redux/actions/capitalsAction'
import { setMapObject } from '../redux/actions/mapAction'
import Loader from '../components/Loader'

import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector'
import ImageLayer from 'ol/layer/Image';
import OSM from 'ol/source/OSM'
import Static from 'ol/source/ImageStatic';
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import { Fill, Stroke, Style } from 'ol/style';
// import TileWMS from 'ol/source/TileWMS';
import Icon from 'ol/style/Icon'
import Text from 'ol/style/Text'



import LayerGroup from 'ol/layer/Group'

import { defaults } from 'ol/interaction';


import URLwoj from '../geojson/wojewodztwa_wgs84.geojson'
import URLcap from '../geojson/stolice_wgs84.geojson'
import hipso from '../images/hipsometria.png'

const MapCont = ({ capitals, getCapitalForecast, setMapObject, city }) => {
  const [isFetched, setIsFetched] = React.useState(false)
  // forecastCap
  React.useEffect(() => {
    // document.querySelector('#map').innerHTML = ''

    const map = new Map({
      target: 'map',
      view: new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        // zoom: 12,
      }),
      interactions: defaults({
        pinchRotate: false
      })
    })




    // Open Street Map base map
    const layerOSM = new TileLayer({
      source: new OSM(),
      visible: true,
      title: 'OSM'
    })

    // const wmsHipso = new TileLayer({
    //   source: new TileWMS({
    //     url: 'https://mapy.geoportal.gov.pl/wss/service/PZGIK/NMT/GRID1/WMS/Hypsometry',
    //     params: { LAYERS: 'ISOK_HipsoDyn' },
    //     attributions: 'Geoportal'
    //   }),
    //   visible: true,
    //   title: 'orto'
    // })

    const layerHipso = new ImageLayer({
      source: new Static({
        url: hipso,
        imageExtent: [1573042.7518, 6276546.6670, 2687776.2614, 7328965.8811
        ],
        attributions: 'by BC2020',
        size: [805, 760]
      }),
      visible: true,
      opacity: .5,
      title: 'hipso'
    })



    // wojewodztwa layer
    const layerWojewSource = new VectorSource({
      url: URLwoj,
      format: new GeoJSON(),
      attributions: 'by BC2020'
    })

    const layerWojew = new VectorLayer({
      source: layerWojewSource,
      visible: true,
      title: 'layerWojew'
    })

    layerWojew.setStyle(new Style({
      fill: new Fill({
        color: 'rgba(0,0,0,0)'
      }),
      stroke: new Stroke({
        color: '#888',
        width: 1
      })
    }))


    // capitals layer

    const layerCapitals = new VectorLayer({
      source: new VectorSource({
        url: URLcap,
        format: new GeoJSON(),
        attributions: 'by BC2020'
      }),
      visible: true,
      title: 'layerCap',
      minZoom: 4
    })



    // add layer to map
    const layerGroup = new LayerGroup({
      layers: [
        layerOSM,
        // wmsHipso,
        layerHipso,
        layerWojew,
        layerCapitals
      ]
    })

    map.addLayer(layerGroup)


    map.getView().fit(
      [1572152.3511472388636321, 6275208.6524272579699755, 2687896.2767138490453362, 7330182.4313131291419268]
      , {
        padding: [10, 10, 10, 10]
      })


    // 


    map.on('click', function (e) {
      // map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
      //   console.log(feature.get('JPT_NAZWA_'))
      // })


      console.log(e.coordinate)
    })


    // function that gets value from vector layer and sends request for forecast
    const xyz = (e) => {
      console.log('https://www.youtube.com/watch?v=dQw4w9WgXcQ')


      const source = e.target
      let featuresValue = []

      if (source.getState() === 'ready' && featuresValue.length === 0) {
        let features = e.target.getFeatures()
        features.forEach(item => featuresValue = [...featuresValue, item.get('naz_glowna')])
      }

      const f = () => getCapitalForecast({ layer: layerCapitals, cell: 'naz_glowna', featuresValue })
      console.log('sprawdz pogode')
      setIsFetched(true)
      f()

    }

    // decide whether the listener should still run. If data got fetched, remove change listener for vector layer
    isFetched ? layerCapitals.getSource().removeEventListener('change', xyz) : layerCapitals.getSource().addEventListener('change', xyz)





    // function style that changes icons for weather and shows temperature of a point
    const setStyle = (forecast, layer, cell) => {
      // console.log(forecast)
      layer.setStyle(function (feature) {
        let value = forecast
        for (let i = 0; i < value.length; i++) {
          // console.log('wykonuje')
          if (feature.get(cell) === value[i].name) {
            // console.log('found', value[i])
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


    // change the icons only when the data is fetched
    if (capitals.capitalForecast.length !== 0) {
      setStyle(capitals.capitalForecast, layerCapitals, 'naz_glowna')
      setMapObject(map)

    }
    // if (city.isOpen) {
    //   map.updateSize()

    // }
    // console.log(layerCapitals)
    // console.log('isFetched:', isFetched, capitals.capitalForecast)
    // console.log(capitals.loading)
  }, [getCapitalForecast, isFetched, capitals, setMapObject])

  return capitals.loading ?
    (
      <Loader />
    )
    :
    (
      <div id='map' ></div>
      // <div id='map' className={city.isOpen && window.innerWidth >= 1024 ? 'forecast-open' : null}></div>
    );
}

const mapStateToProps = ({ capitals, city }) => {
  return { capitals, city }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // forecastCap: (capitals) => dispatch(getForecastForCapitals(capitals)),
    getCapitalForecast: (data) => dispatch(getForecastForCapitals(data)),
    setMapObject: (data) => dispatch(setMapObject(data))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MapCont);