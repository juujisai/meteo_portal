import React from 'react';

import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector'
import OSM from 'ol/source/OSM'

import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'

import LayerGroup from 'ol/layer/Group'


import URLwoj from '../geojson/wojewodztwa_wgs84.geojson'
import URLcap from '../geojson/stolice_wgs84.geojson'


const MapCont = () => {
  const [layersVisible, setLayersVisible] = React.useState({
    OSM: true,
    layerWojew: true,
    layerCap: true,
  })



  const getValuesFromVector = ({ layer, cell }) => {

    layer.getSource().addEventListener('change', function (e) {
      const source = e.target
      let featuresValue = []


      if (source.getState() === 'ready') {
        let features = e.target.getFeatures()
        features.forEach(item => featuresValue = [...featuresValue, item.get(cell)])

        console.log(featuresValue)

        return featuresValue
        // setListOfCapitals(featuresValue)
      }

    })

    return []
  }










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
      visible: layersVisible.OSM,
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
      visible: layersVisible.layerWojew,
    })

    // capitals layer

    const layerCapitals = new VectorLayer({
      source: new VectorSource({
        url: URLcap,
        format: new GeoJSON(),
        attributions: 'by BC2020'
      }),
      visible: layersVisible.layerCap,

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



    getValuesFromVector({ layer: layerCapitals, cell: 'naz_glowna' })


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

export default MapCont;