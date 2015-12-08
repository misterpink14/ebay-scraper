/*

TODO
	[]Better design
	[]Blurbs about us

*/


/* React Dependancies */
import React from 'react';



var AboutUs = React.createClass({
  render () {
	return (
		<div className="aboutUsImage">
			<br /><br /><br /><br /><br /><br />
			<div className="text-center col-md-4 col-md-offset-4">
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