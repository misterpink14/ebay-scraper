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
		
		this.requestAuctions(searchWord, minPrice, maxPrice);
		
		this.state.auctions.push(
		{
			title: searchWord + " Ebay auction",
			description: "Product info",
			num_ratings: 15,
			cost: maxPrice,
			thumbnail: "https://placehold.it/320x150",
		});
		
		this.setState({
			auctions: this.state.auctions,
			items: this.state.items
		});
	},
	
	requestAuctions(searchWord, minPrice, maxPrice) {
		var url = "https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=Benjamin-55ac-42b1-9842-8431acf86287&GLOBAL-ID=EBAY-US&RESPONSE-DATA-FORMAT=JSON&callback=_cb_findItemsByKeywords&REST-PAYLOAD&keywords=iphone&paginationInput.entriesPerPage=3";
		console.log("trying.....");
		var url = "https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=Benjamin-55ac-42b1-9842-8431acf86287&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&paginationInput.entriesPerPage=30";
		$.ajax({
			url: url,
			dataType: "jsonp",
			data: {keywords: searchWord},
			success: function(root){
				console.log(root);
			}
		})
		console.log("more");/*
		$.getJSON(url,function(data) { 
				console.log(data); 
			}) 
			.done(function() { 
				console.log('getJSON request succeeded!'); 
			}) 
			.fail(function(jqXHR, textStatus, errorThrown) { 
				console.log('getJSON request failed! ' + textStatus); 
				console.log("incoming "+jqXHR.responseText); 
			}) 
			.always(function() { 
			console.log('getJSON request ended!'); 
			}) 
			.complete(function() { 
			console.log("complete"); 
			}); */
	},
	
	render () {
		return (
		<div>
			<div className="container">
				<div className="row">
					<AddItem masterAddItem={this.masterAddItem} items={this.state.items}/>
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