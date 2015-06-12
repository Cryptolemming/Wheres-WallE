/** @jsx React.DOM */

'use strict';

var Block = React.createClass({displayName: "Block",
	shuffle: function(array) {
		var newArray = [];
		for (var i = 0; i < array.length + 2; i += 1) {
			newArray.push(array.splice(Math.floor(Math.random() * array.length), 1));
		}
		return newArray;
	},
	getInitialState: function() {
		return {
			flipped: false,
			array: this.shuffle(['walle.jpg', 'eve.jpg', 'john.jpg', 'walle.jpg', 'captain.jpg', 'mary.jpg']),
		}
	},
	onBlockFlip: function(evt) {
		this.setState({
			flipped: true,
			pic: this.state.array[0],
			array: this.state.array.slice(this.state.pic, 1),
		})	
	},
	render: function() {
		var unflipped = {
			background: 'blue',
		};
		var flipped = {
			background: 'red',
		};
		var flip = this.state.flipped ? flipped : unflipped;
		return (
			React.createElement("li", {className: "game-block", onClick: this.onBlockFlip, style: flip}, this.state.array)
		);
	}
});

var GameBoard = React.createClass({displayName: "GameBoard",

	render: function() {
		var board = [];
		for (var i = 0; i < 6; i+=1) {
			board.push(React.createElement(Block, {key: i}));
		}
		return React.createElement("ul", {className: "grid"}, board);
	}
});

React.render(React.createElement(GameBoard, null), document.getElementById('game-board'));
