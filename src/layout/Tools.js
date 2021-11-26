import React from 'react';
import { BiSearchAlt } from 'react-icons/bi'
import { GoLocation } from 'react-icons/go'

import { connect } from 'react-redux'

import { getForecastForCity } from '../redux/actions/cityForecastAction'


const Tools = ({ city, getForecastForCity, map }) => {
  const [cityValue, setCityValue] = React.useState('')

  const handleSearch = () => {
    getForecastForCity(cityValue)

  }

  return (
    <div className='tools'>
      <div className="tools-tools">
        <input type="text" placeholder='wpisz miejscowość ...' value={cityValue} onChange={(e) => setCityValue(e.target.value)} />
        <button onClick={handleSearch} disabled={cityValue === '' ? true : false}><BiSearchAlt /></button>
        {/* <button><GoLocation /></button> */}
      </div>

    </div>
  );
}

const mapStateToProps = ({ city, map }) => {
  return { city, map }
}
const mapDispatchToProps = (dispatch) => {
  return { getForecastForCity: (city) => dispatch(getForecastForCity(city)) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Tools);


// https://www.pexels.com/pl-pl/video/burze-i-blyskawice-1449846/
// https://www.pexels.com/pl-pl/video/krople-deszczu-przesuwajace-sie-po-szkle-3264587/
// https://www.pexels.com/pl-pl/video/blue-sky-video-855005/
// https://www.pexels.com/pl-pl/video/natura-niebo-woda-krzak-5873891/