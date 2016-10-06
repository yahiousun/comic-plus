import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import classNames from 'classnames';

import Button from './Button';
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
        else if (this.props.hasContents) {
            return <div className={classes.header}>
                        <div className={classes.container}>
                        <h2 className={classes['comic-title']}>{this.props.title}</h2>
                    </div>
                </div>
        }
        else {
            return <div className={classes.header}>
                        <div className={classes.container}>
                        <h2 className={classes['comic-title']}>{this.props.title}</h2>
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
    sticky: PropTypes.number.isRequired,
    hasContents: PropTypes.bool.isRequired
}

Header.defaultProps = {
    sticky: 0,
    hasContents: false
}

export default Header;
