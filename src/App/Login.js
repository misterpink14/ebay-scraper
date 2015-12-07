/*

TODO
	[] Change jQuery to React
	[] Implement this

*/


/* React Dependancies */
var React = require('react');



var Login = React.createClass ({
	signUp () {
		$("#sign-up-popup").modal("hide");
		$('#username').val("");
		$('#password').val("");
		alert("You Signed Up!")	
	},
	render () { // remove a tag in button
		return (
			<div className="container">
				<br /> 
				<div className="outer">
				<div className="text-center login col-md-4 col-md-offset-4">
					<span className="pt15">Please log in!</span><br /><br /><br />
					<input className="loginInput" placeholder="Email" type="text" /><br /><br />
					<input className="loginInput" placeholder="Password" type="password" /><br /><br />
					<button type="submit" className="btn btn-primary loginButton">
						<a href="#/dashboard" className="white">Log in to your account</a>
					</button><br />
				</div>
				<br /><br /><br />
				<div className="text-center orSignUp col-md-4 col-md-offset-4">
					<input type="button" className="btn" data-toggle="modal" data-target="#sign-up-popup" value = "Don't have an account? Sign up here"/>
				</div>
				</div>
				
				<div id="sign-up-popup" className="modal fade" role="dialog">
				  <div className="modal-dialog">
				
				    <div className="modal-content">
				      <div className="modal-header">
				        <button type="button" className="close" data-dismiss="modal">&times;</button>
				        <h4 className="modal-title">Sign-Up</h4>
				      </div>
				      <div className="modal-body">
				      <br />
				      	<div>
				        	<input className="loginInput" placeholder="Email" id="username" type="text"/>
				        	<br /><br />
				        	<input className="loginInput" placeholder="Password" id="password" type="password"/>
				      	</div>
				      </div>
				      <br />
				      <div className="modal-footer">
				        <button type="button" className="btn btn-primary" onClick={this.signUp}>Sign-Up</button>
				        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
				      </div>
				    </div>
				
				  </div>
				</div>
			</div>
		);
	}
});



export default Login;
