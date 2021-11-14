import React from 'react';
import Loader from '../components/Loader'
import { connect } from 'react-redux'
import { IoCloseSharp } from 'react-icons/io5'
import { closeD5Forecast } from '../redux/actions/cityForecastAction'

import Chart from 'chart.js/auto'

const D5Forecast = ({ city, closeD5Forecast }) => {
  React.useEffect(() => {
    if (city.d5.day.length > 0) {
      const ctx = document.getElementById('myChart')
      const colors = ['rgb(252, 61, 80)', 'rgb(147, 115, 235)', 'rgb(212, 42, 195)', 'rgba(198, 255, 189,.5)', 'rgb(116, 168, 108)']
      const getMinMaxValue = (option, values, toEven = true) => {
        let number;
        if (option === 'max') {
          number = Math.floor(Math.max(...values))

          if (number % 2 === 1 && toEven) {
            number++
          }

        } else if (option === 'min') {
          number = Math.floor(Math.min(...values))

          if (number % 2 === 1 && toEven) {
            number--
          }
        }
        return number
      }


      let labels = []
      city.d5.day.forEach((item, id) => labels = [...labels, `${item} ${city.d5.hour[id]}`])

      const data = {
        datasets: [
          {
            type: 'line',
            label: 'Temp. maks.',
            data: city.d5.tempMax,
            yAxisID: 'y',
            tension: 0.1,
            borderColor: colors[0],
          },
          {
            type: 'line',
            label: 'Temp. min.',
            data: city.d5.tempMin,
            yAxisID: 'y',
            tension: 0.1,
            borderColor: colors[1],
            animations: {
              y: {
                duration: 2000,
                delay: 200
              }
            },

          },
          {
            type: 'line',
            label: 'Temp. odczuwalna',
            data: city.d5.feels_like,
            yAxisID: 'y',
            tension: 0.1,
            borderColor: colors[2],
            animations: {
              y: {
                duration: 2000,
                delay: 400
              }
            },

          },


          {
            type: 'bar',
            label: 'wilgotność',
            data: city.d5.humidity,
            yAxisID: 'y1',
            backgroundColor: colors[3],
            borderColor: colors[4],
            borderWidth: 1,
            animations: {
              y: {
                duration: 2000,
                delay: 600
              }
            },
          }
        ],
        labels: labels
      }

      const options = {
        hover: {
          mode: 'index',
          intersec: false
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Dzień / godzina',
            }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'temperatura [°C]'
            },
            min: getMinMaxValue('min', city.d5.tempMin, true) - 4,
            max: getMinMaxValue('max', city.d5.tempMax, true) + 4,
            grid: {
              color: function (context) {
                if (context.tick.value === 0) {
                  return 'rgb(245, 126, 122)'
                } else {
                  return '#ddd'
                }
              }
            }

          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
            title: {
              display: true,
              text: 'wilgotność powietrza [g/m3]'
            },
            min: getMinMaxValue('min', city.d5.humidity, true) - 4,
            max: getMinMaxValue('max', city.d5.humidity, true) + 4,
          }
        },
        responsive: false,
        animation: {
          y: {
            easing: 'easeInOutElastic',
            from: (ctx) => {
              if (ctx.type === 'data') {
                if (ctx.mode === 'default' && !ctx.dropped) {
                  ctx.dropped = true;
                  return 0;
                }
              }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Pięciodniowa prognoza pogody',
            font: { size: 20 },
            padding: 20,
          },
          legend: {
            position: 'bottom'
          }
        },

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
    <div className="D5-forecast" style={{ overflowY: 'scroll' }}>
      <div className="close-icon"><IoCloseSharp className='close-icon-icon' onClick={() => closeD5Forecast()} /></div>
      <div className="chart-container">
        <canvas width={city.d5.day.length * 100} height={400} id='myChart' ></canvas>
      </div>
    </div>
  );
}

const mapStateToProps = ({ city }) => {
  return { city }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeD5Forecast: () => dispatch(closeD5Forecast())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(D5Forecast);