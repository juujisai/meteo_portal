import React from 'react';
import { connect } from 'react-redux'
import { getForecastForCapitals, getValuesFromVector } from '../redux/actions'

import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector'
import OSM from 'ol/source/OSM'

import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'

import LayerGroup from 'ol/layer/Group'
// import { Style } from 'ol/style'
// import Icon from 'ol/style/Icon'
// import Text from 'ol/style/Text'

import URLwoj from '../geojson/wojewodztwa_wgs84.geojson'
import URLcap from '../geojson/stolice_wgs84.geojson'


const MapCont = ({ capitalForecast, capitals, forecastCap, getValues }) => {


  // const capitalStyles = function (feature) {


  //   feature.setStyle(new Style({
  //     image: new Icon({
  //       src: `http://openweathermap.org/img/wn/10d@2x.png`,
  //       scale: 1,
  //     }),
  //     text: new Text({
  //       text: 'd',
  //       offsetY: 10,
  //       scale: 1.5
  //     })
  //   }))

  // }







  React.useEffect(() => {

    const map = new Map({
      target: 'map',
      view: new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 0
      })
    })
    // Open Street Map base map
    const layerOSM = new TileLayer({
      source: new OSM(),
      visible: true,
      title: 'OSM'
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

    // capitals layer

    const layerCapitals = new VectorLayer({
      source: new VectorSource({
        url: URLcap,
        format: new GeoJSON(),
        attributions: 'by BC2020'
      }),
      visible: true,
      title: 'layerCap',
    })



    // add layer to map
    const layerGroup = new LayerGroup({
      layers: [
        layerOSM,
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



    getValues({ layer: layerCapitals, cell: 'naz_glowna' })


    map.on('click', function (e) {
      // map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
      //   console.log(feature.get('JPT_NAZWA_'))
      // })


      console.log(e.coordinate)
    })


  })

  return (
    <div id='map'></div>
  );
}

const mapStateToProps = ({ capitalForecast, capitals }) => {
  return { capitalForecast, capitals }
}

const mapDispatchToProps = (dispatch) => {
  return {
    forecastCap: (capitals) => dispatch(getForecastForCapitals(capitals)),
    getValues: (data) => dispatch(getValuesFromVector(data))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MapCont);