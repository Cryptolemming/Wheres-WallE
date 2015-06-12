/** @jsx React.DOM */

'use strict';

var Card = React.createClass({displayName: "Card",
	onClickHandler: function(evt) {
		return this.props.onClick(this.props.cardIndex)
	},
	render: function() {
		var styling = this.props.styling(this.props.image, this.props.flipped);
		return (
			React.createElement("li", {className: "game-card", onClick: this.onClickHandler, style: styling})
		);
	}
});

var StartGame = React.createClass({displayName: "StartGame",
	render: function() {
		var styling = this.props.styling(this.props.gameOver);
		return (
			React.createElement("button", {className: "start-button", onClick: this.props.onClick, style: styling}, "NEW GAME")
		);
	}
});

var GameBoard = React.createClass({displayName: "GameBoard",
	shuffleImages: function(array) {
		var newArray = [];
		for (var i = 0; i < 6; i += 1) {
			newArray.push(array.splice(Math.floor(Math.random() * array.length), 1));
		}
		return newArray;
	},
	styling: function(image, flipped) {
		if (flipped == false) {
			return {
				background: '#bababa',
				opacity: '.96',
			};
		} else if (flipped == true) {
			return {
				backgroundSize: 'cover',
				backgroundImage: 'url(images/' + image + ')',
				opacity: '.96',
			};
		}
	},
	gameOverStyling: function(gameOver) {
		gameOver = this.state.gameOver;
		if (gameOver == true) {
			return {
				opacity: '2',
			};
		}
	},
	infoCreation: function(gameOver) {
		if (this.state !== null) {
			gameOver = this.state.gameOver;
		} else {
			gameOver = false;
		}
		return React.createElement(StartGame, {onClick: this.onStartClick, styling: this.gameOverStyling, gameOver: gameOver});
	},
	boardCreation: function (images, flipped) {
	    images = images || this.state.imagesArray;
	    flipped = flipped || this.state.flipped;
	    var self = this;
	    return images.map(function (image, i) {
	         return React.createElement(Card, {key: i, onClick: self.onCardFlip, image: image, styling: self.styling, image: image, flipped: flipped[i], cardIndex: i});
	    });
	},
	getInitialState: function() {
	    var images = this.shuffleImages(['walle.jpg', 'walle.jpg', 'eve.jpg', 'john.jpg', 'captain2.jpg', 'mary.jpg']);
	    var flipped = [false, false, false, false, false, false];
	    var gameOver = false;
	    return {
	        imagesArray: images,
	        flipped: flipped,
	        imagesFlipped: [],
	        walleCount: 0,
	        flipCount: 0,
	        wrongFlips: 4,
	        gameOver: gameOver,
	        gameInfo: this.infoCreation(gameOver),
	        board: this.boardCreation(images, flipped),
	        
	    };
	},
	onStartClick: function() {
		var images = this.shuffleImages(['walle.jpg', 'walle.jpg', 'eve.jpg', 'john.jpg', 'captain2.jpg', 'mary.jpg']);
	    var flipped = [false, false, false, false, false, false];
	    var gameOver = false;
	    this.setState ({
	        imagesArray: images,
	        flipped: flipped,
	        imagesFlipped: [],
	        walleCount: 0,
	        flipCount: 0,
			wrongFlips: 4,
			gameOver: gameOver,
	        gameInfo: this.infoCreation(gameOver),
	        board: this.boardCreation(images, flipped),
	    });
	},
	onCardFlip: function(cardIndex) {
		var walles = this.state.walleCount;
		var flips = this.state.flipCount;
		if (walles >= 2 || (walles == 1 && flips == 5) || (walles == 0 && flips == 4)) {
			return ;
		}
		var currentStateFlipped = this.state.flipped;
		currentStateFlipped[cardIndex] = true;
		var currentImagesFlipped = this.state.imagesFlipped;
		currentImagesFlipped[cardIndex] = this.state.imagesArray[cardIndex];
		var walles = currentImagesFlipped.reduce(function(n, value) {
			return value == 'walle.jpg' ? n + 1 : n;
		}, 0);
		var wrongFlips = currentImagesFlipped.reduce(function(n, value) {
			return (value !== undefined && value != 'walle.jpg') ? n + 1 : n;
		}, 0);
		var flips = currentImagesFlipped.reduce(function(n, value) {
			return value !== undefined ? n + 1 : n;
		}, 0);
		var updatedBoard = this.boardCreation(this.state.imagesArray, currentStateFlipped);
		if (walles >= 2 || (walles == 1 && flips == 5) || (walles==0 && flips == 4)) {
			this.setState({
				gameOver: true,
			})
		}
		this.setState({
			flipped: currentStateFlipped,
			imagesFlipped: currentImagesFlipped,
			flipCount: flips,
			walleCount: walles,
			wrongFlips: 4 - wrongFlips,
			board: updatedBoard,
		})
	},
	render: function() {
		return React.createElement("div", {className: "game-container"}, 
				React.createElement("div", {className: "game-info"}, 
					React.createElement("ul", {className: "game-counters"}, 
						React.createElement("li", null, React.createElement("img", {className: "x-counter", src: "images/redx.png"})), 
						React.createElement("li", null, this.state.wrongFlips), 
						React.createElement("li", null, React.createElement("img", {className: "walle-counter", src: "images/walle.jpg"})), 
						React.createElement("li", null, this.state.walleCount, "/2"), 
						React.createElement("li", null, this.state.gameInfo)
					)
				), 
				React.createElement("div", {className: "game-board"}, 
				  React.createElement("ul", {className: "grid"}, this.state.board)
				)
			  );
	}
});

React.render(React.createElement(GameBoard, null), document.getElementById('container'));