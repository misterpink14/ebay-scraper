/*

	TODO:
	
		[x] Sign-in / up page
		[] About Page
		[x] Remove Services page
		[x] Remove Contact page
		[] Define Item Obejct - Steve's gonna try this.
		[] Add item functionality
			- Popup? or something
			- Fills in item object data (Form)
		[] Fix font compliling - webpack
		
		SERVER: 
		
			[] Users
			[] Ebay search (url is in the doc)


*/


/* React Dependancies */
import React from 'react';
import { IndexRoute, Route, Router } from 'react-router';


/* Components */
import Login from './Login.js';
import Dashboard from './Dashboard.js';
import AboutUs from './AboutUs.js';
import App from './App.js';



// Run the routes --- there is an attribute of route called onEnter < then you can add some kind of auth
var routes = (
	<Router>
		<Route name="app" path="/" component={App}>
			<IndexRoute component={Login}/>
			<Route name="page" path="/about-us" component={AboutUs} />
			<Route name="dashboard" path="/dashboard" component={Dashboard} /> // 
		</Route>
	</Router>
);



export default routes;
