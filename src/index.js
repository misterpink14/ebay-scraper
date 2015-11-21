import React from 'react'
import ReactDOM from 'react-dom'
import { gifs, clientGifs } from './data'
import './bootstrap/css/bootstrap.css';
import './css/shop-homepage.css';
import './css/style.css';


import routes from './App'

const dest = document.getElementById('app')

const gifData = [ ...gifs, ...clientGifs ]

ReactDOM.render(routes, dest)
