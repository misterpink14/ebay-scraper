/* React Dependancies */
import React from 'react';


/* Components */
import AddItem from './AddItem.js';
import Footer from './Footer.js';
import ItemContainer from './ItemContainer.js';



var Dashboard = React.createClass({
	getInitialState () {
		return {
			loggedIn: false,
			items: [ {
					title: "First Product",
					description: "Product info",
					num_ratings: 15,
					cost: 24.99,
					thumbnail: "http://placehold.it/320x150",
				} ]
		};
	},
	masterAddItem() {
		console.log(this.state.items)
		this.state.items.push(
			
				{
					title: "First Product",
					description: "Product info",
					num_ratings: 15,
					cost: 24.99,
					thumbnail: "http://placehold.it/320x150",
				}
			
		);
		this.setState({
			items: this.state.items
		});
		console.log(this.state.items)
	},
	render () {
		return (
		<div>
		<div className="container">
			<div className="row">
				<AddItem masterAddItem={this.masterAddItem}/>
				<div className="col-md-9">
					<ItemContainer items={this.state.items}/>
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