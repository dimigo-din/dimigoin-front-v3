import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv'
import 'josa-complete'
import App from './App';
import * as serviceWorker from './serviceWorker';

dotenv.config()
console.log(process.env)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
