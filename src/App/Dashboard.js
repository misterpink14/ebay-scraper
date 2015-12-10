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
		var user = this.props.getUser();
		var items = [];
		user.Items.forEach(function(item) {
			items = items.concat([
				{
					searchWord: item.SearchWord,
					minPrice: item.MinPrice,
					maxPrice: item.MaxPrice
				}
			])
		}, items)
		return {
			user: {
				Username: user.Username,
				Password: user.Password
			},
			loggedIn: false,
			items: items,
			auctions: [],
			popup: <div></div>
		};
	},
	
	masterAddItem(searchWord, minPrice, maxPrice) {
		
		var searchParams = {
			searchWord: searchWord,
			minPrice: minPrice,
			maxPrice: maxPrice
		};
		// Set the search params for call to ebay api
		this.state.items.push(
			searchParams
		);
		
		var data = {
			Username: this.state.user.Username,
			Password: this.state.user.Password,
			Item: {
				SearchWord: searchWord,
				MinPrice: minPrice,
				MaxPrice: maxPrice
			}
		}
		console.log('before additem')
		
		// Add item to db here
		$.post(
			"addItem",
			data,
			function(data) {
				console.log("add item success")
				console.log(data)
				if (data.trim() != "OK") 
				{
					alert("An error occured, please try again");
				}
			}
		);
		
		this.state.auctions = []; // Reset the auctions -- auctions are the results from ebay's api
		var displayAuctions = this.displayAuctions; // cast the function displayAuctions to a variable 
		$.when(this.auctionRequest(searchWord, minPrice, maxPrice)).done(function(data){
			displayAuctions(data); // we should just be able to call this.displayAuctions() -- but this is called after the auctionRequest finishes
		}) // when is a async callback function
	},
	
	requestAuctions(searchWord, minPrice, maxPrice) {
		this.state.auctions = [];
		var displayAuctions = this.displayAuctions;
		$.when(this.auctionRequest(searchWord, minPrice, maxPrice)).done(function(data){
			console.log("good stuff");
			displayAuctions(data);
		})
	},
	
	//call to eBay API
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
		// Make the call to the ebay api and return the data (ajax automaticall returns what we need) -- this should probably be done differently
		return $.ajax({ 
			type: "GET",
			url: url,
			dataType: "jsonp",
			data: {keywords: searchWord},
			success: (function(data){
			})
		}) // return to masterAddItem function -or- requestAuctions?
	},
	
	displayAuctions(data) {
		console.log(data);
		var auctions = this.state.auctions;
		for(var i in data.findItemsByKeywordsResponse[0].searchResult[0].item)
		{
			var newAuction;
			try{
				newAuction = [{
					title: data.findItemsByKeywordsResponse[0].searchResult[0].item[i].title[0],
					description: "Product info",
					num_ratings: 15,
					cost: data.findItemsByKeywordsResponse[0].searchResult[0].item[i].sellingStatus[0].currentPrice[0].__value__,
					thumbnail: data.findItemsByKeywordsResponse[0].searchResult[0].item[i].galleryURL[0],
					url: data.findItemsByKeywordsResponse[0].searchResult[0].item[i].viewItemURL[0]
				}];
			}
			catch(e){
				try{
				newAuction = [{
						title: data.findItemsByKeywordsResponse[0].searchResult[0].item[i].title[0],
						description: "Product info",
						num_ratings: 15,
						cost: data.findItemsByKeywordsResponse[0].searchResult[0].item[i].sellingStatus[0].currentPrice[0].__value__,
						thumbnail: "http://www.staticwhich.co.uk/static/images/products/no-image/no-image-available.png",
						url: data.findItemsByKeywordsResponse[0].searchResult[0].item[i].viewItemURL[0]
					}];
				}
				catch(e){
					continue;
				}
			}
			
			auctions = auctions.concat(newAuction);
		}
		
		this.setState({
			auctions: auctions
		})
	},
	
	render () {
		
		console.log(this.props.getUser());
		
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