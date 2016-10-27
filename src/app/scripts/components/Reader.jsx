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
        let footer = null;
        if (this.props.resource.next || this.props.resource.previous) {
            footer = <Sticky position="bottom" autohide={false} transitionName={classes.footer}>
                    <Footer next={this.props.resource.next} previous={this.props.resource.previous} chapterSelect={this.props.chapterSelect} />
            </Sticky>
        }
        return (
            <div>
                <Sticky position="top" autohide={true} transitionName={classes.header}>
                    <Header title={this.props.resource.title} />
                </Sticky>
                <Body pages={this.props.resource.pages} images={this.props.images} loadImage={this.props.loadImage} />
                {footer}
            </div>
        );
    }
}

Reader.propTypes = {
    resource: PropTypes.object.isRequired,
    images: PropTypes.object.isRequired,
    loadImage: PropTypes.func.isRequired,
    chapterSelect: PropTypes.func.isRequired
}

export default Reader;