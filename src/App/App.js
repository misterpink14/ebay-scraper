/* React Dependancies */
import React from 'react';
import { Link } from 'react-router';



var App = React.createClass({
	render () {
		return (
			<div>
				<nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
					<div className="container">
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
						</div>
					</div>
				</nav>
			
				<div className="container">
					{this.props.children}
				</div>
			</div>
		);
	}
});



export default App;