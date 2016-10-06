import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import classNames from 'classnames';

class Button extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <button type={this.props.type} disabled={this.props.disabled} onClick={this.props.onClick}>{this.props.text}</button>
        );
    }
}

Button.propTypes = {
    disabled: PropTypes.bool,
    text: PropTypes.string,
    icon: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func
}

Button.defaultProps = {
    disabled: false,
    type: 'button'
}

export default Button;
