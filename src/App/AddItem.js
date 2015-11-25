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
		this.setState ({
			items: this.state.items.concat(
				[
					"hi"
				]
			)
		});
		this.props.masterAddItem();
	},
	render() {
		var items = this.state.items.map(function(item) {
			return <SmallItem name={item} />
		});
		return (
			<div className="col-md-3">
				<p className="lead">Items</p>
				<div id="itemList" className="list-group">
					<button className="btn btn-success" type="button" onClick={this.addItem} >Add Item</button>
				</div>
				<div id='items'>
				{items}
				</div>
			</div>
		);
	}
});



export default AddItem;