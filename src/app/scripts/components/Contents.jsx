import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import classes from '../../styles/app.scss';

class Contents extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        let heading, contents = [];
        if (this.props.title) {
            heading = <h3 className={classes['comic-title']}>{this.props.title}</h3>
        }
        if (this.props.contents.length) {
            
        }
        return (
            <div>
                {heading}
            </div>
        );
    }
}

Contents.propTypes = {
    title: PropTypes.string,
    contents: PropTypes.array,
    currentChaperUrl: PropTypes.string 
}

export default Contents
