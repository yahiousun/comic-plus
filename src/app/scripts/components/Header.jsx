import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

class Header extends Component {

    get defaultStyles() {
        return {
            root: {
                width: '100%',
                height: '62px',
                boxSizing: 'border-box',
                backgroundColor: '#FFFFFF',
                top: 0,
                right: 0,
                left: 0
            },
            container: {
                maxWidth: '1140px',
                margin: '0 auto'
            },
            title: {
                fontSize: '2.4rem',
                fontWeight: 'normal'
            }
        }
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const styles = { ...this.defaultStyles };
        return (
            <div style={styles.root}>
                <div style={styles.container}>
                    <h1 style={styles.title}>{this.props.title}</h1>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header;