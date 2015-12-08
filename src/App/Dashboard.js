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
		
		this.state.auctions = [];
		var displayAuctions = this.displayAuctions;
		$.when(this.auctionRequest(searchWord, minPrice, maxPrice)).done(function(data){
			displayAuctions(data);
		})
	},
	
	requestAuctions(searchWord, minPrice, maxPrice) {
		this.state.auctions = [];
		var displayAuctions = this.displayAuctions;
		$.when(this.auctionRequest(searchWord, minPrice, maxPrice)).done(function(data){
			displayAuctions(data);
		})
	},
	
	auctionRequest(searchWord, minPrice, maxPrice){
		var displayAuctions = this.displayAuctions;
		var url = "https://svcs.ebay.com/services/search/FindingService/v1?" + 
					"SECURITY-APPNAME=Benjamin-55ac-42b1-9842-8431acf86287&" +
					"OPERATION-NAME=findItemsByKeywords&" + 
					"itemFilter(0).name=MaxPrice&" +
					"itemFilter(0).value=" + maxPrice + "&" +
					"itemFilter(0).paramName=Currency&" +
					"itemFilter(0).paramValue=USD&" +
					"itemFilter(1).name=MinPrice&" +
					"itemFilter(1).value=" + minPrice + "&" +
					"itemFilter(1).paramName=Currency&" +
					"itemFilter(1).paramValue=USD&" + 
					"sortOrder=PricePlusShippingLowest&" +
					"SERVICE-VERSION=1.0.0&" + 
					"RESPONSE-DATA-FORMAT=JSON&" + 
					"REST-PAYLOAD&" +
					"paginationInput.entriesPerPage=100&";
		return $.ajax({
			type: "GET",
			url: url,
			dataType: "jsonp",
			data: {keywords: searchWord},
			success: (function(data){
			})
		}) 
	},
	
	displayAuctions(data) {
		console.log(data);
		var auctions = this.state.auctions;
		for(var i in data.findItemsByKeywordsResponse[0].searchResult[0].item)
		{
			auctions = auctions.concat([
			{
				title: data.findItemsByKeywordsResponse[0].searchResult[0].item[i].title[0],
				description: "Product info",
				num_ratings: 15,
				cost: data.findItemsByKeywordsResponse[0].searchResult[0].item[i].sellingStatus[0].currentPrice[0].__value__,
				thumbnail: data.findItemsByKeywordsResponse[0].searchResult[0].item[i].galleryURL[0],
				url: data.findItemsByKeywordsResponse[0].searchResult[0].item[i].viewItemURL[0]
			}])
		}
		
		this.setState({
			auctions: auctions
		})
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