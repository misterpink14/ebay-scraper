/* React Dependancies */
import React from 'react';
import ReactDOM from 'react-dom';

/* Import Data -- this is here just in case we want to us it */
import { gifs, clientGifs } from './data';

/* Import css */
import './bootstrap/css/bootstrap.css';
import './css/shop-homepage.css';
import './css/style.css';

/* Components */
import routes from './App/Routes.js';

// const gifData = [ ...gifs, ...clientGifs ]


const dest = document.getElementById('app');
ReactDOM.render(routes, dest);