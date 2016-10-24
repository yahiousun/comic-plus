import React, { Component, PropTypes } from 'react';

import Header from './Header';
import Body from './Body';

import Sticky from './Sticky';

class Reader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Sticky position="top">
                    <Header title={this.props.resource.title} />
                </Sticky>
                <Body pages={this.props.resource.pages} images={this.props.images} loadImage={this.props.loadImage} />
            </div>
        );
    }
}

Reader.propTypes = {
    resource: PropTypes.object.isRequired,
    images: PropTypes.object.isRequired,
    loadImage: PropTypes.func.isRequired
}

export default Reader;