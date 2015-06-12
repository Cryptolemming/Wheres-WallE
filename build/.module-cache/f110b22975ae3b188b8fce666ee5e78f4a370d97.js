/** @jsx React.DOM */

'use strict';

var Block = React.createClass({displayName: "Block",
	getInitialState: function() {
		return {
			flipped: false
		}
	},
	onBlockClick: function(evt) {
		this.setState({
			flipped: true,
			backgroundImage: 'url(images/' + images[Math.floor(Math.random() * images.length)] + ')'
		})	
	},
	render: function() {
		var images = ['walle.jpg', 'eve.jpg', 'john.jpg', 'walle.jpg', 'captain.jpg', 'mary.jpg'];
		var styleFlipped = {
			
			backgroundSize: 'cover',
		};
		var styleDefault = {
			background: 'blue',
		};
		var flip = this.state.flipped ? styleFlipped : styleDefault;
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
