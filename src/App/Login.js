/*

TODO
	[] Make it so you can only go to the dashboard when logged in.
	[] Pass user data to dashboard
	[] Hash/salt the password
	[] Don't make pointless things go through the ajax

*/


/* React Dependancies */
var React = require('react');


// Check that the email is valid
function checkEmail (email) {
	var email_arr = email.split("@");
	if (email_arr.length != 2)
	{
		return false;
	}
	email_arr = email_arr[1].split(".");
	if (email_arr.length != 2)
	{
		return false;
	}
	return true;
}


// Check that the password and verification is valid
function checkPasswords (password, verify) {
	return password == verify;
}




var SignUpError = React.createClass({
	render () {
		return (
			<div>
				<hr />
				<span className="signup-error">{this.props.message}</span>
			</div>
		);
	}
});




var Login = React.createClass ({
	
	getInitialState() {
		return {
			email: "",
			password: "",
			verify: "", 
			isError: false,
			error_message: ""
		};
	},
	
	updateEmail(event) {
		var email = event.target.value;
		this.setState({
			email: email
		});
	},
	
	updatePassword(event) {
		var password = event.target.value;
		this.setState({
			password: password
		});
	},
	
	updateVerify(event) {
		var verify = event.target.value;
		this.setState({
			verify: verify
		});
	},
	
	showError (err) {
		// generate error message
		var message = "* ";
		if (err == 'email')
		{
			message += "Your email is invalid";
		}
		else if (err == 'password')
		{
			message += "Please fill out a password";
		}
		else 
		{
			message += "Your password's don't match";
		}
		
		// Update state
		this.setState({
			isError: true,
			error_message: message
		});
	},
	
	signUp () {
		var email = this.state.email;
		var password = this.state.password;
		var verify = this.state.verify;
		
		if (!checkEmail(email))
		{
			this.showError("email");
			console.log("error -- email");
			return;
		}
		else {
			this.setState({
				isError: false
			});
		}
		
		if (password == "")
		{
			this.showError("password");
			console.log("error -- password");
			return;
		}
		
		if (!checkPasswords(password, verify))
		{
			this.showError("verify");
			console.log("error -- password");
			return;
		}
		else {
			this.setState({
				isError: false
			});
		}
		
		// Sign up ajax request
		var url = "user";
		$.post( 
			url, 
			{
				email: email,
				password: password
			},
			function(data) {
				if (data.trim() == "OK") 
				{
					$("#sign-up-popup").modal("hide");
					alert("You Signed Up!");
				}
				else 
				{
					alert("An error occured, please try again");
				}
			}
		);
		this.setState({
			email: "",
			password: "",
			verify: ""
		});
	},
	
	login() {
		var email = this.state.email;
		var password = this.state.password;
		
		var url = "user";
		var login = this.props.login;
		var saveUser = this.props.saveUser;
		$.ajax({
			url: url,
			type: "PUT",
			data: {
				email: email,
				password: password
			},
			success: function(data, err) {
				console.log(err)
				console.log(data)
				if (err.trim() != 'success' || !data)
				{
					
					return;
				}
				else
				{
					login();
					saveUser(data);
					window.location.href = '#';
				}
			}
		}, login, saveUser);
		this.setState({
			email: "",
			password: "",
			verify: ""
		});
	},
	
	render () { // remove a tag in button
		var email = this.state.email;
		var password = this.state.password;
		var verify = this.state.verify;
		return (
			<div className="loginBackgroundImage">
				<br /> 
				<div className="outer">
				<br /><br /><br />
				<div className="text-center login col-md-4 col-md-offset-4">
					<span className="pt15">Welcome to eBay Tracker</span><br /><br /><br />
					<input className="loginInput" placeholder="Email" type="text" value={email} onChange={this.updateEmail} /><br /><br />
					<input className="loginInput" placeholder="Password" type="password" value={password} onChange={this.updatePassword} /><br /><br />
					<button type="submit" className="btn btn-primary loginButton" onClick={this.login}>
						<a href="#/dashboard" className="white">Log in to your account</a>
					</button><br />
				</div>
				<br /><br /><br />
				<div className="text-center orSignUp col-md-4 col-md-offset-4">
					<input type="button" className="btn" data-toggle="modal" data-target="#sign-up-popup" value="Don't have an account? Sign up here"/>
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
									<input className="loginInput" placeholder="Email" id="username" value={email} onChange={this.updateEmail} type="text"/>
									<br /><br />
									<input className="loginInput" placeholder="Password" id="password" value={password} onChange={this.updatePassword} type="password"/>
									<br /><br />
									<input className="loginInput" placeholder="Verify Password" id="verify" value={verify} onChange={this.updateVerify} type="password"/>
								</div>
								{ this.state.isError ? <SignUpError message={this.state.error_message}/> : ""}
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
