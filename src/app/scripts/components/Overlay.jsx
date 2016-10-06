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
            hidden: true
        }
    }

    componentDidMount() {
        this.setState({
            hidden: this.props.hidden
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.hidden !== this.state.hidden) {
            this.setState({ hidden: nextProps.hidden })
        }
    }

    toggle() {
        console.log(this.state)
        this.setState({ hidden: !this.state.hidden})
    }

    render() {
        let backgroundColor = this.props.theme === 'light' ? 'rgba(255,255,255, ' + this.props.opacity + ')' : 'rgba(0,0,0, ' + this.props.opacity + ')';
        let display = this.state.hidden ? 'none' : 'block';
        let styles = { ...defaultStyles, 'backgroundColor': backgroundColor, 'display': display };
        return (
            <div aria-hidden={this.state.hidden} className={classes.overlay} style={styles}>
                <button type="button" className={classes['button-close']} onClick={this.toggle.bind(this)}>╳</button>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Overlay.propTypes = {
    hidden: PropTypes.bool,
    theme: PropTypes.string,
    opacity: PropTypes.number
}

Overlay.defaultProps = {
    hidden: true,
    theme: 'light',
    opacity: 0.9
}

export default Overlay;
