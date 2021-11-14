import React from 'react';
import Loader from '../components/Loader'
import { connect } from 'react-redux'

import Chart from 'chart.js/auto'

const D5Forecast = ({ city }) => {
  React.useEffect(() => {
    if (city.d5.day.length > 0) {
      const ctx = document.getElementById('myChart')

      let labels = []
      city.d5.day.forEach((item, id) => labels = [...labels, `${item} ${city.d5.hour[id]}`])

      const data = {
        datasets: [
          {
            type: 'line',
            label: 'Temp. maks.',
            data: city.d5.tempMax,
            yAxisID: 'y'
          },
          {
            type: 'line',
            label: 'Temp. min.',
            data: city.d5.tempMin,
            yAxisID: 'y'
          }, {
            type: 'bar',
            label: 'wilgotność',
            data: city.d5.humidity,
            yAxisID: 'y1'
          }
        ],
        labels: labels
      }


      const options = {
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left'
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right'
          }
        }
      }


      const myChart = new Chart(ctx, {
        data: data,
        options: options,



      })
    }

  }, [city])


  if (city.d5Loading) {
    return (<Loader />)
  }


  return (
    <div className="D5-forecast">
      <canvas id='myChart'></canvas>
    </div>
  );
}

const mapStateToProps = ({ city }) => {
  return { city }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(D5Forecast);