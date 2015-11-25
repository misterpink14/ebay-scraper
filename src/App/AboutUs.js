/* React Dependancies */
import React from 'react';



var AboutUs = React.createClass({
  render () {
	return (
		<div className="col-md-12">
			<img src="http://pcwallart.com/images/utah-mountains-wallpaper-2.jpg" className="stretch" align="middle" alt="" />
			<div id="about-us">
				<h1>About Us</h1>
				<h3>Team Members</h3>
					<li>Cody Burt</li>
					<li>Steve Snyder</li>
					<li>Ben Thompson</li>
				
			</div>
		</div>
	);
  }
});



export default AboutUs;