/* React Dependancies */
import React from 'react';
import ReactDOM from 'react-dom';

/* Import Data -- this is here just in case we want to us it */
import { gifs, clientGifs } from './data';

/* Import css */
import './bootstrap/css/bootstrap.min.css';
import './css/shop-homepage.css';
import './css/style.css';
// import 'jquery';
// import './jquery.js'
import './bootstrap/js/bootstrap.min.js'


/* Components */
import routes from './App/Routes.js';

// const gifData = [ ...gifs, ...clientGifs ]


const dest = document.getElementById('app');
ReactDOM.render(routes, dest);