import React, {Component, PropTypes} from 'react';

import classes from '../../styles/app.scss';

class PageFooter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <figcaption className={classes['page-footer']}>
                {this.props.number} / {this.props.total}
            </figcaption>
        );
    }
}

PageFooter.propTypes = {
    number: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
}

export default PageFooter;