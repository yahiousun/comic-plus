import React, {Component, PropTypes} from 'react';

import Media from './Media';
import PageFooter from './PageFooter';

class Page extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <figure>
                <Media source={this.props.source} status={this.props.images.get(this.props.source)} preload={this.props.preload} loadImage={this.props.loadImage} />
                <PageFooter number={this.props.number} total={this.props.total} />
            </figure>
        );
    }
}

Page.propTypes = {
    source: PropTypes.string.isRequired,
    images: PropTypes.object.isRequired,
    number: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    preload: PropTypes.bool.isRequired,
    loadImage: PropTypes.func.isRequired
}

export default Page;