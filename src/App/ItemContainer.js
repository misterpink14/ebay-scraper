/*

TODO: figure out why images arent rendering

*/



/* React Dependancies */
var React = require('react')



var Auction = React.createClass ({
	render() {
		return (
			<div className="col-sm-4 col-lg-4 col-md-4">
				<div className="thumbnail">
					<img src={this.props.thumbnail} alt="" />
					<div className="caption">
						<h4 className="pull-right">${this.props.cost}</h4>
						<h4><a href="#">{this.props.title}</a>
						</h4>
						<p>{this.props.description}</p>
					</div>
					<div className="ratings">
						<p className="pull-right">{this.props.ratings} reviews</p>
						<p>
							<span className="glyphicon glyphicon-star"></span>
							<span className="glyphicon glyphicon-star"></span>
							<span className="glyphicon glyphicon-star"></span>
							<span className="glyphicon glyphicon-star"></span>
							<span className="glyphicon glyphicon-star"></span>
						</p>
					</div>
				</div>
			</div>
		);
	}
});


var ItemContainer = React.createClass ({
	getInitialState () {
		var auctions = this.props.auctions;
		return {
			auctions: auctions
		};
	},
	render() {
		var auction_list = this.state.auctions.map(function(auction) {
			return <Auction title={auction.title} description={auction.description} num_ratings={auction.num_ratings} cost={auction.cost} thumbnail={auction.thumbnail} />
		});
		return (
			<div className="row">
				{auction_list}
			</div>
		);
	}
});



export default ItemContainer;








/*
<div className="row">

	<div className="col-sm-4 col-lg-4 col-md-4">
		<div className="thumbnail">
			<img src="http://placehold.it/320x150" alt=""/>
			<div className="caption">
				<h4 className="pull-right">$24.99</h4>
				<h4><a href="#">First Product</a>
				</h4>
				<p>See more snippets like this online store item at <a target="_blank" href="http://www.bootsnipp.com">Bootsnipp - http://bootsnipp.com</a>.</p>
			</div>
			<div className="ratings">
				<p className="pull-right">15 reviews</p>
				<p>
					<span className="glyphicon glyphicon-star"></span>
					<span className="glyphicon glyphicon-star"></span>
					<span className="glyphicon glyphicon-star"></span>
					<span className="glyphicon glyphicon-star"></span>
					<span className="glyphicon glyphicon-star"></span>
				</p>
			</div>
		</div>
	</div>

	<div className="col-sm-4 col-lg-4 col-md-4">
		<div className="thumbnail">
			<img src="http://placehold.it/320x150" alt=""/>
			<div className="caption">
				<h4 className="pull-right">$64.99</h4>
				<h4><a href="#">Second Product</a>
				</h4>
				<p>This is a short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
			</div>
			<div className="ratings">
				<p className="pull-right">12 reviews</p>
				<p>
					<span className="glyphicon glyphicon-star"></span>
					<span className="glyphicon glyphicon-star"></span>
					<span className="glyphicon glyphicon-star"></span>
					<span className="glyphicon glyphicon-star"></span>
					<span className="glyphicon glyphicon-star-empty"></span>
				</p>
			</div>
		</div>
	</div>

	<div className="col-sm-4 col-lg-4 col-md-4">
		<div className="thumbnail">
			<img src="http://placehold.it/320x150" alt=""/>
			<div className="caption">
				<h4 className="pull-right">$74.99</h4>
				<h4><a href="#">Third Product</a>
				</h4>
				<p>This is a short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
			</div>
			<div className="ratings">
				<p className="pull-right">31 reviews</p>
				<p>
					<span className="glyphicon glyphicon-star"></span>
					<span className="glyphicon glyphicon-star"></span>
					<span className="glyphicon glyphicon-star"></span>
					<span className="glyphicon glyphicon-star"></span>
					<span className="glyphicon glyphicon-star-empty"></span>
				</p>
			</div>
		</div>
	</div>

	<div className="col-sm-4 col-lg-4 col-md-4">
		<div className="thumbnail">
			<img src="http://placehold.it/320x150" alt=""/>
			<div className="caption">
				<h4 className="pull-right">$84.99</h4>
				<h4><a href="#">Fourth Product</a>
				</h4>
				<p>This is a short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
			</div>
			<div className="ratings">
				<p className="pull-right">6 reviews</p>
				<p>
					<span className="glyphicon glyphicon-star"></span>
					<span className="glyphicon glyphicon-star"></span>
					<span className="glyphicon glyphicon-star"></span>
					<span className="glyphicon glyphicon-star-empty"></span>
					<span className="glyphicon glyphicon-star-empty"></span>
				</p>
			</div>
		</div>
	</div>

	<div className="col-sm-4 col-lg-4 col-md-4">
		<div className="thumbnail">
			<img src="http://placehold.it/320x150" alt=""/>
			<div className="caption">
				<h4 className="pull-right">$94.99</h4>
				<h4><a href="#">Fifth Product</a>
				</h4>
				<p>This is a short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
			</div>
			<div className="ratings">
				<p className="pull-right">18 reviews</p>
				<p>
					<span className="glyphicon glyphicon-star"></span>
					<span className="glyphicon glyphicon-star"></span>
					<span className="glyphicon glyphicon-star"></span>
					<span className="glyphicon glyphicon-star"></span>
					<span className="glyphicon glyphicon-star-empty"></span>
				</p>
			</div>
		</div>
	</div>
</div>
					
*/