import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RouterComponent from './components/Router';
import * as serviceWorker from './serviceWorker';
import { hydrate, render } from "react-dom";

const rootElement = document.getElementById("root");

// if (rootElement.hasChildNodes()) {
//   hydrate(<React.StrictMode>
//     <RouterComponent />
//   </React.StrictMode>, rootElement);
// } else {
//   render(<React.StrictMode>
//     <RouterComponent />
//   </React.StrictMode>, rootElement);
// }


ReactDOM.render(
  <React.StrictMode>
    <RouterComponent />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
