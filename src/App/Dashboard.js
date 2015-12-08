/*

TODO
	[] Function for updating itemcontainer when item is updated (after popup todo in additem)

*/


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
			items: [],
			auctions: [],
			popup: <div></div>
		};
	},
	
	masterAddItem(searchWord, minPrice, maxPrice) {
		
		this.state.items.push(
		{
			searchWord: searchWord,
			minPrice: minPrice,
			maxPrice: maxPrice
		});
		var returnVar;
		this.requestAuctions(searchWord, minPrice, maxPrice);
		// console.log(returnVar);
		
		// this.setState({
		// 	auctions: this.state.auctions,
		// 	items: this.state.items
		// });
	},
	
	requestAuctions(searchWord, minPrice, maxPrice, returnVar) {
		this.state.auctions = [];
		var url = "https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=Benjamin-55ac-42b1-9842-8431acf86287&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&paginationInput.entriesPerPage=30";
		var displayAuctions = this.displayAuctions;
		var tempData;
		$.ajax({
			async: false,
			type: "GET",
			url: url,
			dataType: "jsonp",
			data: {keywords: searchWord},
			success: (function(data){
				displayAuctions(data);
			})
		})
		
	},
	
	displayAuctions(data) {
		for(var i in data.findItemsByKeywordsResponse[0].searchResult[0].item)
		{
			this.setState({
				auctions: this.state.auctions.concat([
				{
					title: data.findItemsByKeywordsResponse[0].searchResult[0].item[i].title[0],
					description: "Product info",
					num_ratings: 15,
					cost: "a price",
					thumbnail: "https://placehold.it/320x150",
					url: data.findItemsByKeywordsResponse[0].searchResult[0].item[i].viewItemURL[0]
				}])
			});
		}
		console.log(this.state.auctions);
	},
	
	render () {
		return (
		<div>
			<div className="container">
				<div className="row">
					<AddItem masterAddItem={this.masterAddItem} requestAuctions={this.requestAuctions} items={this.state.items}/>
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