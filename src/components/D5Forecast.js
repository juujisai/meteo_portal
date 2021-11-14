import React from 'react';
import Loader from '../components/Loader'
import { connect } from 'react-redux'

const D5Forecast = ({ city }) => {

  if (city.d5Loading) {
    return (<Loader />)
  }

  return (
    <div className="D5-forecast">
      5dniowa
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