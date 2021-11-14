
import React from 'react';
// import Layers from './layout/Layers'
import MapCont from './layout/Map'
import Tools from './layout/Tools'
import CityForecast from './components/CityForecast'


import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux'

// import reducer from './redux/reducers/reducer'
// import { initialStore } from './redux/initialStore'


import { capitalsReducer } from './redux/reducers/capitalsReducer'
import { cityForecastReducer } from './redux/reducers/cityForecastReducer'

const rootReducer = combineReducers({
  capitals: capitalsReducer,
  city: cityForecastReducer
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)



function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <Layers /> */}
        <MapCont />
        <Tools />
        <CityForecast />

      </div>
    </Provider>
  );
}

export default App;
