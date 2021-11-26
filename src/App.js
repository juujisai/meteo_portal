
import React from 'react';
import MapCont from './layout/Map'
import Tools from './layout/Tools'
import CityForecast from './components/CityForecast'


import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux'



import { capitalsReducer } from './redux/reducers/capitalsReducer'
import { cityForecastReducer } from './redux/reducers/cityForecastReducer'
import { mapReducer } from './redux/reducers/mapReducer'

const rootReducer = combineReducers({
  capitals: capitalsReducer,
  city: cityForecastReducer,
  map: mapReducer
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)



function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MapCont />
        <Tools />
        <CityForecast />

      </div>
    </Provider>
  );
}

export default App;
