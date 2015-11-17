var React = require('react')
var ReactDOM = require('react-dom');

// The component to be rendered
	var Item = React.createClass({
		name: "no name defined"
    },

    render: function() {
        return (<div>
            <a href="#" class="list-group-item">this.props.name</a>
        </div>)
    }
})