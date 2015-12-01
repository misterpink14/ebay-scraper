/* React Dependancies */
import React from 'react';


/* Components */
import AddItem from './AddItem.js';
import Footer from './Footer.js';
import ItemContainer from './ItemContainer.js';

/* jQuery */
import $ from 'jquery';
import jquery from 'jquery';



var Dashboard = React.createClass({
	getInitialState () {
		return {
			loggedIn: false,
			auctions: [],
			popup: <div></div>
		};
	},
	masterAddItem() {
		console.log(this.state.items)
		this.state.auctions.push(
			
				{
					title: "First Product",
					description: "Product info",
					num_ratings: 15,
					cost: 24.99,
					thumbnail: "http://placehold.it/320x150",
				}
			
		);
		this.setState({
			auctions: this.state.auctions
		});
		console.log(this.state.auctions)
	},
	render () {
		return (
		<div>
			<div className="container">
				<div className="row">
					<AddItem masterAddItem={this.masterAddItem} auctions={this.state.auctions}/>
					<div className="col-md-9">
						<ItemContainer auctions={this.state.auctions}/>
					</div>
				</div>
			</div>
			<div className="container">
				<hr/>
				<Footer />
			</div>
		</div>
	);
  }
});


export default Dashboard;