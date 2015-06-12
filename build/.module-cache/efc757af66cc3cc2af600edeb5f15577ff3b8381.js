/** @jsx React.DOM */

'use strict';

var Card = React.createClass({displayName: "Card",
	onClickHandler: function(evt) {
		return this.props.onClick(this.props.cardIndex)
	},
	render: function() {
		var unflipped = {
			background: '#bababa',
			backgroundSize: 'cover',
			opacity: '.96',
		};
		var flipped = {
			backgroundImage: 'url(images/' + this.props.image + ')',
			backgroundSize: 'cover',
		};
		var flip = this.props.flipped ? flipped : unflipped;
		return (
			React.createElement("li", {className: "game-card", onClick: this.onClickHandler, style: flip})
		);
	}
});

var GameBoard = React.createClass({displayName: "GameBoard",
	shuffledImages: function() {
		var images = ['walle.jpg', 'walle.jpg', 'eve.jpg', 'john.jpg', 'captain2.jpg', 'mary.jpg'];
		var newArray = [];
		for (var i = 0; i < 6; i += 1) {
			newArray.push(images.splice(Math.floor(Math.random() * images.length), 1));
		}
		return newArray;
	},
	boardCreation: function() {
		var board = [];
		var flipped = [false, false, false, false, false, false];
		var imagesArray = this.shuffledImages;
		for (var i = 0; i < 6; i+=1) {
			board.push(React.createElement(Card, {key: i, image: imagesArray[i], onClick: this.onCardFlip, flipped: flipped[i], cardIndex: i}));
		}; 
		return board;
	},
	getInitialState: function() {
		return {
			flipped: [false, false, false, false, false, false],
			counter: 0,
			
			board: this.boardCreation(),
			
			flippedImages: [],
			walleCount: 0,
		}
	},
	onCardFlip: function(cardIndex) {
		var currentState = this.state.flipped;
		currentState[cardIndex] = true;
		var currentFlipped = this.state.flippedImages;
		currentFlipped[cardIndex] = this.imagesArray[cardIndex];
		var count = this.state.walleCount;
		if (this.state.imagesArray[cardIndex] == 'walle.jpg') {
			count += 1;
		}
		this.setState({
			flipped: currentState,
			flippedImages: currentFlipped,
			walleCount: count,
			counter: this.state.counter += 1,
		})
	},
	render: function() {

		return React.createElement("div", {className: "game-board"}, React.createElement("ul", {className: "grid"}, this.state.board), this.state.flippedImages, this.state.walleCount, this.state.counter);
	}
});

React.render(React.createElement(GameBoard, null), document.getElementById('game-board-container'));