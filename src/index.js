import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import 'materialize-css/dist/css/materialize.min.css';
import store from './store'
import './index.css'

  
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
