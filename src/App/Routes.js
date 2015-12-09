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

/* Local data */
var isLoggedin = false;

var user = {
	name: "me"
};

function getUser() {
	return user;
}

function saveUser(newUser) {
	user = newUser;
}

function login() {
	isLoggedin = true;
}

function requireAuth(nextState, replaceState) 
{
	if(!isLoggedin)
	{
		replaceState({ 
			nextPathname: nextState.location.pathname
		}, '#')
	}
}



/* Wrappers -- http://stackoverflow.com/questions/27864720/react-router-pass-props-to-handler-component */
var LoginWrapper = React.createClass({
	
	login() {
		login()	
	},
	
	render() {
		return <Login login={this.login}/>
	}
});


var DashboardWrapper = React.createClass({
	
	saveUser (newUser) {
		saveUser(newUser);
	},
	
	getUser() {
		console.log("geuser")
		return getUser();
	},
	
	render () {
		return <Dashboard getUser={this.getUser} saveUser={this.saveUser} />
	}
})



// Run the routes --- there is an attribute of route called onEnter < then you can add some kind of auth
var routes = (
	<Router>
		<Route name="app" path="/" component={App}>
			<IndexRoute component={LoginWrapper} />
			<Route name="page" path="/about-us" component={AboutUs} />
			<Route name="dashboard" path="/dashboard" component={DashboardWrapper} onEnter={requireAuth} />
		</Route>
	</Router>
);



export default routes;
