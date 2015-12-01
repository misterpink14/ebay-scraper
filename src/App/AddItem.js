/* React Dependancies */
var React = require('react');



var SmallItem = React.createClass({
    render() {
        return (
        	<div>
            	<a href="#" className="list-group-item">{this.props.name}</a>
        	</div>
        );
    }
});


var AddItem = React.createClass({
	getInitialState () {
		var auctions;
		
		if (this.props.auctions)
		{
			auctions = this.props.auctions;
		}
		else
		{
			auctions = [];
		}
		
		return {auctions: auctions};
	},
	addItem () {
		this.props.masterAddItem();
	},
	render() {
		var auctions = this.state.auctions.map(function(item) {
			return <SmallItem name={item.title} />
		});
		return (
			<div className="col-md-3">
				<p className="lead">Items</p>
				<div id="itemList" className="list-group">
					<button className="btn btn-success" type="button" data-toggle="modal" data-target="#myModal">Add Item</button>
				</div>
				<div id='items'>
				{auctions}
				</div>
				
				<div id="myModal" className="modal fade" role="dialog">
				  <div className="modal-dialog">
				
				    <div className="modal-content">
				      <div className="modal-header">
				        <button type="button" className="close" data-dismiss="modal">&times;</button>
				        <h4 className="modal-title">Modal Header</h4>
				      </div>
				      <div className="modal-body">
				      	<div>
				        	Search Word: <input id="searchWord" type="text"/>
				        </div>
				        <div>
				        	Price Range: <input id="minPrice" type="number"/> To <input id="maxPrice" type="number"/>
				      	</div>
				      </div>
				      <div className="modal-footer">
				        <button type="button" className="btn btn-default" onClick={this.addItem} data-dismiss="modal">Add</button>
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