import React, {Component, PropTypes} from 'react';

import Media from './Media';
import PageFooter from './PageFooter';

import classes from '../../styles/app.scss';

class Page extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <figure className={classes.page}>
                <Media source={this.props.source} preload={this.props.preload} tabId={this.props.tabId} />
                <PageFooter number={this.props.number} total={this.props.total} />
            </figure>
        );
    }
}

Page.propTypes = {
    source: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    preload: PropTypes.bool.isRequired,
    tabId: PropTypes.number.isRequired
}

Page.defaultProps = {
    preload: false
}

export default Page;