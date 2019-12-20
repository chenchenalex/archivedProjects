var React = require('react'),
	ReactDOM = require('react-dom');



var CommentForm = React.createClass({
  render: function() {
    return (
    	<div className="form">My name is {this.props.test}</div>
    	);
  }
});

var CommentName = React.createClass({
  render: function() {
    return (<div className="name">Author: {this.props.test}</div>);
  }
});

var CommentBox = React.createClass({
  render: function() {
    return (
    	<div className="container">
    		<CommentForm test={this.props.name} />
    		<CommentName test={this.props.name} />
    	</div>
    	);
  }
});

ReactDOM.render(
	<CommentBox name="alex"/>,
  	document.getElementById('example')
);

