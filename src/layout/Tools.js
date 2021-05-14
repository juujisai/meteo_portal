import React from 'react';
import { BiSearchAlt } from 'react-icons/bi'
import { GoLocation } from 'react-icons/go'

const Tools = () => {
  const [cityValue, setCityValue] = React.useState('')

  const handleSearch = () => {
    console.log(cityValue)
  }

  return (
    <div className='tools'>
      <div className="tools-tools">
        <input type="text" placeholder='wpisz miejscowość ...' value={cityValue} onChange={(e) => setCityValue(e.target.value)} />
        <button onClick={handleSearch}><BiSearchAlt /></button>
        <button><GoLocation /></button>
      </div>

    </div>
  );
}

export default Tools;