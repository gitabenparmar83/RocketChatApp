import React, { Component, createContext } from 'react';

import { createClassName, normalizeDOMRect } from '../helpers';
import styles from './styles.scss';


const PopoverContext = createContext();


const PopoverOverlay = (props) => {
	const { children, className, visible } = props;
	return (
		<div
			className={ createClassName(styles, 'popover__overlay', { visible }, [className]) }
			{ ...props }
		>
			{ children && children }
		</div>
	);
}

export class PopoverContainer extends Component {
	state = {
		renderer: null,
	}

	constructor(props) {
		super(props);
	}

	open = (renderer, props, { currentTarget } = {}) => {
		let overlayBounds;
		let triggerBounds;

		if (this.overlayRef) {
			overlayBounds = normalizeDOMRect(this.overlayRef.base.getBoundingClientRect());
		}

		if (currentTarget) {
			triggerBounds = normalizeDOMRect(currentTarget.getBoundingClientRect());
		}

		this.setState({
			renderer, ...props,
			overlayBounds,
			triggerBounds
		});
	}

	dismiss = () => {
		this.setState({
			renderer: null,
			overlayBounds: null,
			triggerBounds: null
		});
	}

	handleOverlayGesture = ({ currentTarget, target }) => {
		if (currentTarget !== target) {
			return;
		}

		this.dismiss();
	}

	handleKeyDown = ({ key }) => {
		if (key !== 'Escape') {
			return;
		}

		this.dismiss();
	}

	handleOverlayRef = (ref) => {
		this.overlayRef = ref;
	}

	componentDidMount() {
		this.mounted = true;
		window.addEventListener('keydown', this.handleKeyDown, false);
	}

	componentWillUnmount() {
		this.mounted = false;
		window.removeEventListener('keydown', this.handleKeyDown, false);
	}

	render() {
		const { children, renderer, overlayProps, overlayBounds, triggerBounds } = this.props;
		return (
			<PopoverContext.Provider value={ { open: this.open } }>
				<div className={ createClassName(styles, 'popover__container') }>
					{ children }
					<PopoverOverlay
						ref={ this.handleOverlayRef }
						onMouseDown={ this.handleOverlayGesture }
						onTouchStart={ this.handleOverlayGesture }
						visible={ !!renderer }
						{ ...overlayProps }
					>
						{ renderer ? renderer({
							dismiss: this.dismiss,
							overlayBounds,
							triggerBounds
						}) : null }
					</PopoverOverlay>
				</div>
			</PopoverContext.Provider>
		);
	}
}


export const PopoverTrigger = (props) => {
	const { children } = props;
	return (
		<PopoverContext.Consumer>
			{ ({ open }) => children && children[0]({ pop: open.bind(null, children[1], props) }) }
		</PopoverContext.Consumer>
	);
};
