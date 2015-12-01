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
	addItem () {
		$("#myModal").modal("hide");
		this.props.masterAddItem($("#searchWord").val(), $("#minPrice").val(), $("#maxPrice").val());
	},
	render() {
		var items = this.state.items.map(function(item) {
			return <SmallItem name={item.searchWord} />
		});
		return (
			<div className="col-md-3">
				<p className="lead">Items</p>
				<div id="itemList" className="list-group">
					<button className="btn btn-success" type="button" data-toggle="modal" data-target="#myModal">Add Item</button>
				</div>
				<div id='items'>
				{items}
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