/** @jsx React.DOM */

'use strict';

var Block = React.createClass({displayName: "Block",
	getInitialState: function() {
		return {
			flipped: false,
		}
	},
	onBlockClick: function(evt) {
		this.setState({
			flipped: true,
		})	
	},
	render: function() {
		var unflipped = {
			background: 'blue',
		};
		var flipped = {
			backgroundImage: 'url(images/' + this.props.images + ')',
		};
		var flip = this.state.flipped ? flipped : unflipped;
		return (
			React.createElement("li", {className: "game-block", onClick: this.onBlockClick, style: flip})
		);
	}
});

var GameBoard = React.createClass({displayName: "GameBoard",
	shuffle: function(array) {
		var newArray = [];
		for (var i = 0; i < 6; i += 1) {
			newArray.push(array.splice(Math.floor(Math.random() * array.length), 1));
		}
		return newArray;
	},
	render: function() {
		var images = ['walle.jpg', 'walle.jpg', 'eve.jpg', 'john.jpg', 'captain.jpg', 'mary.jpg'];
		var board = [];
		for (var i = 0; i < 6; i+=1) {
			board.push(React.createElement(Block, {key: i, pic: ['walle.jpg', 'walle.jpg', 'eve.jpg', 'john.jpg', 'captain.jpg', 'mary.jpg'].splice(Math.floor(Math.random() * 6), 1)}));
		}
		return React.createElement("ul", {className: "grid"}, board);
	}
});

React.render(React.createElement(GameBoard, {images: images}), document.getElementById('game-board'));
