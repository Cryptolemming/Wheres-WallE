import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';

'use strict';

const styles = {
	winModal: {
		background: 'black',
		marginTop: '-25px',
		opacity: .7,
		width: '500px',
		height: '300px',
		position: 'absolute',
		borderRadius: '15px',
		border: '1px solid purple',
	},
	winText: {
		fontSize: '5em',
		color: '#00FF00',
		textAlign: 'center',
		verticalAlign: 'center',
		opacity: 2,
	},
};

@Radium
export default class WinModal extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var modalStyling
			= this.props.won
			? {visibility: 'visible', transitionDelay: '1s'}
			: {visibility: 'hidden'};

		return (
			<div style={[styles.winModal, modalStyling]}>
				<p style={styles.winText}>YOU WIN!</p>
		  	</div>
		);
	}
};

WinModal.propTypes = {
	won: React.PropTypes.bool.isRequired,
};
WinModal.defaultProps = {
	won: false
};