import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

const STICKY = 'sticky';
const HIDDEN = 'hidden';
const STATIC = 'static';

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
            status: STATIC,
            lastScrollTop: document.body.scrollTop
        }
        this.handleScroll = this.onScroll.bind(this);
    }

    offset() {
            return {
                top: this.refs.placeholder.getBoundingClientRect().top,
                left: this.refs.placeholder.getBoundingClientRect().left
            }
    }

    onScroll(e) {
        let scrollTop = document.body.scrollTop,
            diff = scrollTop - this.state.lastScrollTop;

        if (this.props.position === 'top') {
            if (!this.props.autohide) {
                if (scrollTop > this.props.threshold) {
                    this.setState({
                        status: STICKY,
                        lastScrollTop: scrollTop
                    })
                }
                else {
                    this.setState({
                        status: STATIC,
                        lastScrollTop: scrollTop
                    })
                }
            }
            else {
                if (scrollTop > this.refs.placeholder.getBoundingClientRect().height + this.props.threshold + this.offset().top) {
                    this.setState({
                        status: diff > 0 ? HIDDEN : STICKY,
                        lastScrollTop: scrollTop
                    })
                } else if (scrollTop > 0) {
                    this.setState({
                        status: this.state.status === STICKY ? STICKY : STATIC,
                        lastScrollTop: scrollTop
                    })
                }
                else {
                    this.setState({
                        status: STATIC,
                        lastScrollTop: scrollTop
                    })
                }
            }
        }
        else if (this.props.position === 'bottom') {
            if (scrollTop + window.innerHeight - this.props.threshold < this.refs.placeholder.getBoundingClientRect().top + this.refs.placeholder.getBoundingClientRect().height) {
                this.setState({
                    status: STICKY,
                    lastScrollTop: scrollTop
                })
            } else {
                this.setState({
                    sticky: STATIC,
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

    shouldComponentUpdate(nextProps, nextState) {
        const propNames = Object.keys(this.props);
        if (Object.keys(nextProps).length !== propNames.length) {
            return true;
        }
        const valuesMatch = propNames.every((key) => {
            return nextProps.hasOwnProperty(key) && nextProps[key] === this.props[key];
        });
        if (!valuesMatch) {
            return true;
        }
        if (nextState.status !== this.state.status) {
            return true;
        }
        return false;
    }

    getStyles() {
        let styles = { ...this.defaultStyles };
        if (this.state.status !== STATIC) {
            styles.children.position = 'fixed';
        }
        if (this.props.position === 'bottom') {
            delete styles.children.position.top;
            styles.children.position.bottom = 0;
        }
        if (this.refs && this.refs.children && this.refs.children.getBoundingClientRect().height) {
            styles.placeholder.height = this.refs.children.getBoundingClientRect().height;
        }
        return styles;
    }

    render() {
        let styles = this.getStyles();
        let container;

        let childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                sticky: this.state.status
            })
        );

        let children = <div ref="children" style={styles.children}>
                    {childrenWithProps}
                </div>;

        if (this.state.status === HIDDEN && this.props.autohide) {
            children = null;
        }

        if (!this.props.autohide || !this.props.transitionName) {
            container = children;
        }
        else {
            container = <ReactCSSTransitionGroup component={this.props.component}
                transitionName={this.props.transitionName}
                transitionEnterTimeout={this.props.transitionEnterTimeout} 
                transitionLeaveTimeout={this.props.transitionLeaveTimeout} >
                {children}
            </ReactCSSTransitionGroup>
        }
        
        return (
            <div>
                <div ref="placeholder" className="placeholder" style={styles.placeholder}></div>
                {container}
            </div>
        );
    }
}

Sticky.propTypes = {
    position: PropTypes.string,
    threshold: PropTypes.number,
    autohide: PropTypes.bool,
    component: PropTypes.string,
    transitionName: PropTypes.string,
    transitionEnterTimeout: PropTypes.number,
    transitionLeaveTimeout: PropTypes.number
}
Sticky.defaultProps = {
    position: 'top',
    threshold: 0,
    autohide: false,
    component: 'div',
    transitionEnterTimeout: 500,
    transitionLeaveTimeout: 300
}

export default Sticky;