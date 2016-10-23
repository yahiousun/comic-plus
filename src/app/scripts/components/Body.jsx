import React, { Component, PropTypes } from 'react';

import PageList from './PageList';

class Body extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <PageList pages={this.props.pages} images={this.props.images} loadImage={this.props.loadImage} />
        );
    }
}

Body.propTypes = {
    pages: PropTypes.array.isRequired,
    images: PropTypes.object.isRequired,
    loadImage: PropTypes.func.isRequired
}

export default Body;