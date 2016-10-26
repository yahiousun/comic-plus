import React, { Component, PropTypes } from 'react';

const STICKY = 'sticky';

class Header extends Component {

    get defaultStyles() {
        return {
            root: {
                width: '100%',
                height: '38px',
                boxSizing: 'border-box',
                backgroundColor: '#FFFFFF'
            },
            shadow: {
                visablity: 'hidden',
            },
            container: {
                maxWidth: '1140px',
                padding: '0 15px',
                margin: '0 auto',
                height: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            },
        }
    }

    constructor(props) {
        super(props);
    }

    getStyles() {
        let styles = { ...this.defaultStyles };
        if (this.props.sticky === STICKY) {
            styles.root.borderTop = '1px solid #CCCCCC';
        }
        return styles;
    }

    render() {
        let styles = this.getStyles();

        return (
            <div style={styles.root}>
                <div style={styles.container}>
                    <p>no more content</p>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header;