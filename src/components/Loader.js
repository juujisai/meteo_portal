import React from 'react';


const Loader = () => {

  const icons = ['01', '02', '03', '04', '09', '10', '11', '13', '50']

  const f = () => new Date().getHours() >= 6 && new Date().getHours() <= 20 ? 'd' : 'n'
  const isDay = f()
  const animationTime = 2


  const img = icons.map((item, id) =>
    <img key={id} src={`http://openweathermap.org/img/wn/${item}${isDay}@2x.png`} alt="Ikona z prognozy pogody" style={{ animationDelay: `${id * animationTime}s`, animationDuration: `${animationTime * icons.length}s` }} />
  )

  return (
    <div className='loader'>
      <div className="animation-loader">
        {img}
      </div>
      <h1>
        Loading ...
      </h1>
    </div>
  );
}

export default Loader;