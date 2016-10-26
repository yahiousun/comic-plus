import React, { Component, PropTypes } from 'react';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';

import Sticky from './Sticky';

import classes from '../../styles/style.scss';

class Reader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Sticky position="top" autohide={true} transitionName={classes.header}>
                    <Header title={this.props.resource.title} />
                </Sticky>
                <Body pages={this.props.resource.pages} images={this.props.images} loadImage={this.props.loadImage} />
                <Sticky position="bottom" autohide={false} transitionName={classes.footer}>
                    <Footer title={this.props.resource.title} />
                </Sticky>
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