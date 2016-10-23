import React, { Component, PropTypes } from 'react';

import Header from './Header';
import Body from './Body';

class Reader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sticky: false
        }
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {  
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div>
                <Header title={this.props.resource.title} />
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

export default Reader