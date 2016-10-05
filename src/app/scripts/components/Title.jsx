import React, {Component, PropTypes} from 'react';

import classes from '../../styles/app.scss';

class Title extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.title = this.props.title  
    }

    render() {

        return (
            <h2 className={classes['comic-title']}>{this.props.title}</h2>
        );
    }
}

Title.propTypes = {
    title: PropTypes.string.isRequired
}

export default Title;
