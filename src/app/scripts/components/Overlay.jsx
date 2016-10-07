import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import classNames from 'classnames';

import classes from '../../styles/app.scss';

const defaultStyles = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
}

class Overlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
    }

    componentDidMount() {
        this.setState({
            active: this.props.active
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.active !== this.state.active) {
            this.setState({ active: nextProps.active })
        }
    }

    toggle() {
        this.setState({ active: !this.state.active})
        setTimeout(() => {
            if (this.props.onToggle) {
                this.props.onToggle(this.state.active);
            }
        })
    }

    render() {
        let backgroundColor = this.props.theme === 'light' ? 'rgba(255,255,255, ' + this.props.opacity + ')' : 'rgba(0,0,0, ' + this.props.opacity + ')';
        let display = this.state.active ? 'block' : 'none';
        let styles = { ...defaultStyles, 'backgroundColor': backgroundColor, 'display': display };
        document.body.style.overflow = this.state.active ? 'hidden' : null;
        return (
            <div aria-hidden={!this.state.active} className={classes.overlay} style={styles}>
                <button type="button" className={classes['button-close']} onClick={this.toggle.bind(this)}>╳</button>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Overlay.propTypes = {
    active: PropTypes.bool,
    theme: PropTypes.string,
    opacity: PropTypes.number,
    onToggle: PropTypes.func,
}

Overlay.defaultProps = {
    active: false,
    theme: 'light',
    opacity: 0.96,
    onToggle: () => {}
}

export default Overlay;
