/*

	TODO:
	
		[ben] figure out auth

*/


/* React Dependancies */
import React from 'react';
import { IndexRoute, Route, Router } from 'react-router';


/* Components */
import Login from './Login.js';
import Dashboard from './Dashboard.js';
import AboutUs from './AboutUs.js';
import App from './App.js';


var isLoggedin = true;



function requireAuth(nextState, replaceState) 
{
	if(!isLoggedin)
	{
		replaceState({ 
			nextPathname: nextState.location.pathname 
			
		}, '#')
	}
}


// Run the routes --- there is an attribute of route called onEnter < then you can add some kind of auth
var routes = (
	<Router>
		<Route name="app" path="/" component={App}>
			<IndexRoute component={Login}/>
			<Route name="page" path="/about-us" component={AboutUs} />
			<Route name="dashboard" path="/dashboard" component={Dashboard} onEnter={requireAuth} />
		</Route>
	</Router>
);



export default routes;
