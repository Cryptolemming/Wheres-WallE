/** @jsx React.DOM */

'use strict';

var Block = React.createClass({displayName: "Block",
	render: function() {
		return (
			React.createElement("li", {className: "game-block", style: this.flip})
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
	getInitialState: function() {
		return {
			flipped: false,
			count: 0,
			array: this.shuffle(['walle.jpg', 'eve.jpg', 'john.jpg', 'walle.jpg', 'captain.jpg', 'mary.jpg']),
		}
	},
	onBlockClick: function(evt) {
		this.setState({
			flipped: true,
			count: this.state.count += 1,
		})	
	},
	render: function() {
		var unflipped = {
			background: 'blue',
		};
		var flipped = {
			background: 'url(images/' + this.state.array[0] + ')',
		};
		var flip = this.state.flipped ? flipped : unflipped;
		var board = [];
		for (var i = 0; i < 6; i+=1) {
			board.push(React.createElement(Block, {key: i}));
		}
		return React.createElement("ul", {className: "grid", onClick: this.onBlockClick}, board, this.state.array, this.state.count);
	}
});

React.render(React.createElement(GameBoard, null), document.getElementById('game-board'));
