import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import classNames from 'classnames';

import Backdrop from './Backdrop';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true
        }
    }

    componentDidMount() {
        
    }

    componentWillReceiveProps(nextProps) {
        this.setState({hidden: nextProps.hidden})
    }

    render() {
        return (
            <div>
                <Backdrop />
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    hidden: PropTypes.bool
}

Modal.defaultProps = {
    hidden: true
}

export default Modal;
