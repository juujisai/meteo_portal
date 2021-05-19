import React from 'react';
import { connect } from 'react-redux'
import { getForecastForCapitals, getValuesFromVector } from '../redux/actions'

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


import LayerGroup from 'ol/layer/Group'

import { defaults } from 'ol/interaction';


import URLwoj from '../geojson/wojewodztwa_wgs84.geojson'
import URLcap from '../geojson/stolice_wgs84.geojson'
import hipso from '../images/hipsometria.png'

const MapCont = ({ capitalForecast, capitals, forecastCap, getValues }) => {

  React.useEffect(() => {

    const map = new Map({
      target: 'map',
      view: new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 0
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