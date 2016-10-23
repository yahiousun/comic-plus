import React, {Component, PropTypes} from 'react';

class PageFooter extends Component {

    get defaultStyles() {
        return {
            root: {
                width: '100%',
                height: '38px',
                boxSizing: 'border-box',
                lineHeight: '38px',
                fontSize: '1.4rem',
                textAlign: 'center'
            }
        }
    }

    constructor(props) {
        super(props);
    }

    render() {
        const styles = { ...this.defaultStyles };
        return (
            <figcaption style={styles.root}>
                {this.props.number} / {this.props.total}
            </figcaption>
        );
    }
}

PageFooter.propTypes = {
    number: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
}

export default PageFooter;