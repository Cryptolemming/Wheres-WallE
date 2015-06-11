/** @jsx React.DOM */

'use strict';

var Block = React.createClass({displayName: "Block",
	shuffle: function(array) {
		function imagesShuffle(array) {
			var newArray = [];
			for (var i = 0; i < array.length; i += 1) {
				newArray.push(array.splice(Math.floor(Math.random() * array.length), 1));
			}
			return newArray;
		}
	},
	getInitialState: function() {
		return {
			flipped: false
		}
	},
	onBlockClick: function(evt) {
		this.setState({
			flipped: true,
		})	
	},
	render: function() {
		var images = ['walle.jpg', 'eve.jpg', 'john.jpg', 'walle.jpg', 'captain.jpg', 'mary.jpg'];
		var imagesShuffled = this.shuffle(images); 
		if (this.state.flipped) {
			var pic = imagesShuffled[0];
			imagesShuffled.slice(pic, 1);
			var flipped = 'background: url(/images' + pic + ')';
		}
		var unflipped = {
			background: 'blue',
		};
		var flip = this.state.flipped ? flipped : unflipped;
		return (
			React.createElement("li", {className: "game-block", onClick: this.onBlockClick, style: flip})
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

