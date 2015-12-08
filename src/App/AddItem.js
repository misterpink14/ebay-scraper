/*
TODO
	[] Pop-up when item clicked
	[] Function from parent class for updating the itemcontainer
	[] Convert jQuery to react
*/

/* React Dependancies */
var React = require('react');


var SmallItem = React.createClass({
	requestAuctions () {
		//TODO: get searchword, minprice, and maxprice from the database to pass into requestAuctions....
		this.props.requestAuctions(this.props.name, this.props.minPrice, this.props.maxPrice);
	},
	
    render() {
        return (
        	<div>
            	<a className="list-group-item" onClick={this.requestAuctions}>{this.props.name}</a>
        	</div>
        );
    }
});


var AddItem = React.createClass({
	getInitialState () {
		var items;
		
		if (this.props.items)
		{
			items = this.props.items;
		}
		else
		{
			items = [];
		}
		
		return {items: items};
	},
	
	addItem () { // Update this to use react, lets try to use jquery for just requests. It'll make code cleaner/more readable
		$("#popup").modal("hide");
		this.props.masterAddItem($("#searchWord").val(), $("#minPrice").val(), $("#maxPrice").val());
		$('#searchWord').val("");
		$('#minPrice').val("");
		$('#maxPrice').val("");
	},
	
	render() {
		var requestAuctions = this.props.requestAuctions;
		var items = this.state.items.map(function(item) {
			return <SmallItem name={item.searchWord} minPrice={item.minPrice} maxPrice={item.maxPrice} requestAuctions={requestAuctions}/>
		}, requestAuctions)
		return (
			<div className="col-md-3">
			<br />
				<p className="lead">Items</p>
				<div id="itemList" className="list-group">
					<button className="btn btn-success" type="button" data-toggle="modal" data-target="#popup">Add Item</button>
				</div>
				<div id='items'>
				{items}
				</div>
				
				<div id="popup" className="modal fade" role="dialog">
				  <div className="modal-dialog">
				
				    <div className="modal-content">
				      <div className="modal-header">
				        <button type="button" className="close" data-dismiss="modal">&times;</button>
				        <h4 className="modal-title">Add New Item</h4>
				      </div>
				      <div className="modal-body">
				      	<div>
				        	<input className="searchInput" placeholder="Search term" id="searchWord" type="text"/>
				        </div>
				        <br />
				        <div>
				        	Price Range: <input className="priceInput" placeholder="Min Price" id="minPrice" type="number"/> 
				        	 To <input className="priceInput" placeholder="Max Price" id="maxPrice" type="number"/>
				      	</div>
				      </div>
				      <div className="modal-footer">
				        <button type="button" className="btn btn-primary" onClick={this.addItem}>Add</button>
				        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
				      </div>
				    </div>
				
				  </div>
				</div>
			</div>
		);
	}
});



export default AddItem;