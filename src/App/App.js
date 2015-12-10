/* React Dependancies */
import React from 'react';
import { Link } from 'react-router';



var App = React.createClass({
	
	getInitialState() {
		return {
			isLogin: false
		}	
	},
	
	login () {
		this.setState({
			isLogin: true
		})
	}, 
	
	render () {
		return (
			<div>
				<nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
					<div>
						<div className="navbar-header">
							<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<Link to="#" className="navbar-brand">Home</Link>
						</div>
						<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
							<ul className="nav navbar-nav">
								<li>
									<a href="#/about-us">About</a>
								</li>
							</ul>
							{ this.state.isLogin ? <a id="logoutButton" href="#/login" className="navbar-brand">logout</a> : <span></span> }
						</div>
					</div>
				</nav>
			
				<div className= "removeUpperPadding">
					{this.props.children}
				</div>
			</div>
		);
	}
});



export default App;