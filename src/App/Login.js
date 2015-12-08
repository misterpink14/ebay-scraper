/*

TODO
	[] Implement this

*/


/* React Dependancies */
var React = require('react');



var Login = React.createClass ({
	getInitialState() {
		return {
			email: "",
			password: "",
			verify: "", 
			show_modal: false
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
	signUp () {
		var email = this.state.email;
		var password = this.state.password;
		var verify = this.state.verify;
		console.log(this.state.email)
		console.log(password)
		console.log(verify)
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
					<input className="loginInput" placeholder="Email" type="text" /><br /><br />
					<input className="loginInput" placeholder="Password" type="password" /><br /><br />
					<button type="submit" className="btn btn-primary loginButton">
						<a href="#/dashboard" className="white">Log in to your account</a>
					</button><br />
				</div>
				<br /><br /><br />
				<div className="text-center orSignUp col-md-4 col-md-offset-4">
					<input type="button" className="btn" data-toggle="modal" data-target="#sign-up-popup" value="Don't have an account? Sign up here"/>
				</div>
				</div>
				
				<div id="sign-up-popup" className={this.state.show_modal ? "modal" : ""} + " fade" role="dialog">
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
