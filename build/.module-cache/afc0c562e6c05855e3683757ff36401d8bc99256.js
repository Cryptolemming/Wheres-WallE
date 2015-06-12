/** @jsx React.DOM */

'use strict';

var Card = React.createClass({displayName: "Card",
	render: function() {
		return (
			React.createElement("li", {className: "game-card", onClick: this.onCardFlip})
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
			flipped: [false, false, false, false, false, false],
		}
	},
	onCardFlip: function(evt) {
		var currentState = this.state.flipped;
		currentState[i] = true;
		this.setState({
			flipped: currentState,
		})
	},
	render: function() {
		var images = ['walle.jpg', 'walle.jpg', 'eve.jpg', 'john.jpg', 'captain2.jpg', 'mary.jpg'];
		var imagesShuffled = this.shuffle(images);
		var board = [];
		for (var i = 0; i < 6; i+=1) {
			board.push(React.createElement(Card, {key: i, image: imagesShuffled[i], flipped: this.state.flipped[i]}));
		}
		return React.createElement("div", {className: "game-board"}, React.createElement("ul", {className: "grid"}, board));
	}
});

React.render(React.createElement(GameBoard, null), document.getElementById('game-board-container'));