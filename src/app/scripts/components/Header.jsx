import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import classNames from 'classnames';

import Title from './Title';
import classes from '../../styles/app.scss';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    autodetect() {
        if (this.props.sticky === 0) {
            return null;
        }
        else {
            return <div className={classes.header}>
                        <div className={classes.container}>
                        <Title title={this.props.title} />
                    </div>
                </div>
        }
    }

    render() {
        return (
            <ReactCSSTransitionGroup component="div"
                transitionName={classes.header}
                transitionEnterTimeout={500} 
                transitionLeaveTimeout={300} >
                {this.autodetect()}
            </ReactCSSTransitionGroup>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    sticky: PropTypes.number.isRequired
}

Header.defaultProps = {
    sticky: 0
}

export default Header;
