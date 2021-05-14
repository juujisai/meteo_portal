
import React from 'react';
// import Layers from './layout/Layers'
import MapCont from './layout/Map'
import Tools from './layout/Tools'



import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './redux/reducer'
import { initialStore } from './redux/initialStore'

const store = createStore(reducer, initialStore)



function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <Layers /> */}
        <MapCont />
        <Tools />


      </div>
    </Provider>
  );
}

export default App;
