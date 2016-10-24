import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

class Sticky extends Component {

    get defaultStyles() {
        return {
            root: {
            },
            placeholder: {
                visablity: 'hidden',
                position: 'relative',
                boxSizing: 'border-box'
            },
            children: {
                position: 'absolute',
                top: 0,
                right: 0,
                left: 0
            }
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            sticky: false,
            lastScrollTop: document.body.scrollTop
        }
        this.handleScroll = this.onScroll.bind(this);
    }

    onScroll(e) {
        let scrollTop = document.body.scrollTop,
            diff = scrollTop - this.state.lastScrollTop;

        if (this.props.position === 'top') {
            if (scrollTop > this.refs.placeholder.offsetHeight + this.props.threshold) {
                this.setState({
                    sticky: diff > 0 ? false : true,
                    lastScrollTop: scrollTop
                })
            } else {
                this.setState({
                    sticky: false,
                    lastScrollTop: scrollTop
                })
            }
        }
        else if (this.props.position === 'bottom') {
            if (scrollTop + window.outerHeight - this.props.threshold < this.refs.placeholder.offsetTop) {
                this.setState({
                    sticky: true,
                    lastScrollTop: scrollTop
                })
            } else {
                this.setState({
                    sticky: false,
                    lastScrollTop: scrollTop
                })
            }
        }
        
    }
    
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, false);
        window.addEventListener('resize', this.handleScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleScroll);
    }

    render() {
        let styles = { ...this.defaultStyles };
        if (this.refs && this.refs.children) {
            styles.placeholder.height = this.refs.children.offsetHeight
        }

        if (this.state.sticky) {
            styles.children.position = 'fixed';
        }
        
        return (
            <div>
                <div ref="placeholder" className="placeholder" style={styles.placeholder}></div>
                <div ref="children" style={styles.children}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Sticky.propTypes = {
    position: PropTypes.string,
    threshold: PropTypes.number
}
Sticky.defaultProps = {
    position: 'top',
    threshold: 0,
}

export default Sticky;