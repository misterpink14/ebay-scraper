/* React Dependancies */
var React = require('react');



var Login = React.createClass ({
	render () { // remove a tag in button
		return (
			<div className="container">
				<br /> 
				<div className="text-center">
					<h1>eBay Scraper</h1><br />
					<span className="pt15">username : </span><input type="text" /><br /><br />
					<span className="pt15">password : </span><input type="password" /><br /><br />
					<button type="submit" className="btn btn-primary">
						<a href="#/dashboard" className="white">login</a>
					</button><br /><br />
					<p>or</p>
					<a href="#/sign-up">sign-up</a>
				</div>
			</div>
		);
	}
});



export default Login;
