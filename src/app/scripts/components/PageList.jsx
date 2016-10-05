import React, {Component, PropTypes} from 'react';

import classNames from 'classnames'

import Page from './Page';
import classes from '../../styles/app.scss';


class PageList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let pages = 'no images';

        if (this.props.images.length) {
            pages = [];
            this.props.images.forEach((source, index) => {
                pages.push(<Page key={index} source={source} number={index + 1} total={this.props.images.length} preload={index < this.props.preload ? true : false} tabId={this.props.tabId} />)
            })
        }

        return (
            <div className={classes.pagelist}>
                <div className={classes.container}>
                    {pages}
                </div>
            </div>
        );
    }
}

PageList.propTypes = {
    images: PropTypes.array.isRequired,
    preload: PropTypes.number,
    tabId: PropTypes.number.isRequired
}

PageList.defaultProps = {
    preload: 5
}

export default PageList;
