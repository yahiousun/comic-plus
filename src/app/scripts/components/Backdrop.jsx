import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import classNames from 'classnames';

class Backdrop extends Component {
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
            <div style={{
                    display: this.state.hidden ? null : 'none',
                }}
            >
            </div>
        );
    }
}

Backdrop.propTypes = {
    hidden: PropTypes.bool
}

Backdrop.defaultProps = {
    hidden: true
}

export default Backdrop;
