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
	shuffle: function(array) {
		var newArray = [];
		for (var i = 0; i < 6; i += 1) {
			newArray.push(array.splice(Math.floor(Math.random() * array.length), 1));
		}
		return newArray;
	},
	getInitialState: function() {
		return {
			imagesArray: this.shuffle(['walle.jpg', 'walle.jpg', 'eve.jpg', 'john.jpg', 'captain2.jpg', 'mary.jpg']),
			flipped: [false, false, false, false, false, false],
			flippedImages: [],
			flippedImagesCount: 0,
		}
	},
	onCardFlip: function(cardIndex) {
		var currentState = this.state.flipped;
		currentState[cardIndex] = true;
		var currentFlipped = this.state.flippedImages;
		currentFlipped[cardIndex] = this.state.imagesArray[cardIndex];
		var count = this.state.flippedImagesCount;
		if (currentFlipped[cardIndex] === 'walle.jpg') {
			count += 1;
		}
		this.setState({
			flipped: currentState,
			flippedImages: currentFlipped,
			flippedImagesCount: count,
		})
	},
	render: function() {
		var board = [];
		for (var i = 0; i < 6; i+=1) {
			board.push(React.createElement(Card, {key: i, image: this.state.imagesArray[i], onClick: this.onCardFlip, flipped: this.state.flipped[i], cardIndex: i}));
		}
		return React.createElement("div", {className: "game-board"}, React.createElement("ul", {className: "grid"}, board), this.state.flippedImages, this.state.flippedImagesCount);
	}
});

React.render(React.createElement(GameBoard, null), document.getElementById('game-board-container'));