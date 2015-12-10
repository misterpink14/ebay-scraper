/*

TODO
	[] 

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
	// Set the initial state (data) for the Dashboard
	getInitialState () {
		var user = this.props.getUser();
		var items = [];
		if (Object.keys(user).length != 0) // Make sure the object is not empty
		{
			user.Items.forEach(function(item) 
			{
				items = items.concat([
					{
						searchWord: item.SearchWord,
						minPrice: item.MinPrice,
						maxPrice: item.MaxPrice, 
						listings: item.Listings
					}
				])
			}, items)
		}
		
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
	
	/* 
		When the AddItem component is clicked, it calls this function
		Adds their new search to the db, makes an ajax call to the ebay api
			and re-renders the ItemContainer with the data
	*/
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
		
		var userData = {
			Username: this.state.user.Username,
			Password: this.state.user.Password,
			Item: {
				SearchWord: searchWord,
				MinPrice: minPrice,
				MaxPrice: maxPrice
			}
		}
		
		// Add item to db here
		$.post(
			"item",
			userData,
			function(data) {
				
				if (!data.trim()) 
				{
					alert("An error occured, please try again");
				}
			}
		);
		
		this.state.auctions = []; // Reset the auctions -- auctions are the results from ebay's api
		var displayAuctions = this.displayAuctions; // cast the function displayAuctions to a variable
		
		$.when( // when is a async callback function
			this.auctionRequest(searchWord, minPrice, maxPrice)
		).done(function(data)
		{
			displayAuctions(data); // we should just be able to call this.displayAuctions() -- but this is called after the auctionRequest finishes
		}) 
	},
	
	/*
		Called when a user clicks a small item (saved searched underneath Add Item)
		Makes an ajax request and re-renders the ItemContainer with the data
	*/
	requestAuctions(searchWord, minPrice, maxPrice) {
		this.state.auctions = [];
		var displayAuctions = this.displayAuctions;
		$.when(this.auctionRequest(searchWord, minPrice, maxPrice)).done(function(data){
			console.log("good stuff");
			data.username = this.state.user.Username;
			data.itemName = searchWord;
			console.log(data);
			displayAuctions(data);
		}.bind(this))
	},
	
	/*
	call to eBay API
	*/
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
		// Make the call to the ebay api and return the data (ajax automatically returns what we need) -- this should probably be done differently
		return $.ajax({ 
			type: "GET",
			url: url,
			dataType: "jsonp",
			data: {keywords: searchWord},
			success: (function(data){
			})
		}) // return to masterAddItem function -or- requestAuctions?
	},
	
	/* 
		Attepts to update the auctions data (used to render the Item Container)
	*/
	displayAuctions(data) {
		console.log("displayAuctions data");
		console.log(data);
		var auctions = this.state.auctions;
		var listingURLs = [];
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
				listingURLs.push(data.findItemsByKeywordsResponse[0].searchResult[0].item[i].viewItemURL[0]);
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
		
		var unreadListingData = {
			username: data.username,
			itemName: data.itemName,
			listingURLs: listingURLs
		};
		
		$.get(
			"unreadListings",
			unreadListingData,
			function(data) {
				console.log("server unread listings");
				console.log(data);
			}
		);
		
		
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
					{/* Container for the left sidebar. Includes Add Item button and Small Items */}
					<AddItem masterAddItem={this.masterAddItem} requestAuctions={this.requestAuctions} items={this.state.items}/>
					<div className="col-md-9">
						{/* Container for Items in main area of Dashboard */}
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