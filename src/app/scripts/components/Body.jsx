import React, { Component, PropTypes } from 'react';

import PageList from './PageList';

class Body extends Component {
    get defaultStyles() {
        return {
            root: {
                width: '100%',
                boxSizing: 'border-box',
                backgroundColor: '#FFFFFF'
            },
            container: {
                maxWidth: '1140px',
                padding: '0 15px',
                margin: '0 auto'
            }
        }
    }
    constructor(props) {
        super(props);
    }
    render() {
        const styles = { ...this.defaultStyles };
        return (
            <div style={styles.root}>
                <div style={styles.container}>
                    <PageList pages={this.props.pages} images={this.props.images} loadImage={this.props.loadImage} />
                </div>
            </div>
        );
    }
}

Body.propTypes = {
    pages: PropTypes.array.isRequired,
    images: PropTypes.object.isRequired,
    loadImage: PropTypes.func.isRequired
}

export default Body;