import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import 'materialize-css/dist/css/materialize.min.css';
import './index.css'

const initState = {
    playingTrackId: "123456"
}

const rootReducer = (state = initState, action) => {
  if(action.type === "PLAY_TRACK"){
     return {playingTrackId: action.trackId}
  }
 return state;
}
const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  
  store.subscribe(() => {
    store.getState();
  });



ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
