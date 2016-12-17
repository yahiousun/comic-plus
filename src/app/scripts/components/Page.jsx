import React, {Component, PropTypes} from 'react';

import Media from './Media';
import PageFooter from './PageFooter';

class Page extends Component {

    get defaultStyles() {
        return {
            root: {
                width: '100%',
                boxSizing: 'border-box',
                margin: '0'
            }
        }
    }

    constructor(props) {
        super(props);
    }

    render() {
        const styles = { ...this.defaultStyles  }
        return (
            <figure style={styles.root}>
                <Media source={this.props.source} state={this.props.images[this.props.source]} preload={this.props.preload} loadImage={this.props.loadImage} />
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