import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

const STICKY = 'sticky';
const HIDDEN = 'hidden';
const STATIC = 'static';
const TOP = 'top';
const BOTTOM = 'bottom';

class Sticky extends Component {

    get defaultStyles() {
        return {
            root: {
                position: 'relative'
            },
            placeholder: {
                visablity: 'hidden',
                position: 'relative',
                boxSizing: 'border-box'
            },
            children: {
                position: 'absolute',
                right: 0,
                left: 0
            }
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            state: STATIC,
            height: 0,
            lastScrollTop: document.body.scrollTop
        }
        this.handleScroll = this.onScroll.bind(this);
    }

    onScroll(e) {
        let scrollTop = document.body.scrollTop,
            diff = scrollTop - this.state.lastScrollTop,
            height = this.state.height;

        if (this.refs && this.refs.children && this.refs.children.offsetHeight) {
            height = this.refs.children.offsetHeight;
        }

        if (this.props.position === TOP) {
            if (!this.props.autohide) {
                if (scrollTop > this.props.threshold) {
                    this.setState({
                        state: STICKY,
                        height: height,
                        lastScrollTop: scrollTop
                    })
                }
                else {
                    this.setState({
                        state: STATIC,
                        height: height,
                        lastScrollTop: scrollTop
                    })
                }
            }
            else {
                if (0 > this.refs.placeholder.getBoundingClientRect().height + this.refs.placeholder.getBoundingClientRect().top) {
                    this.setState({
                        state: diff < 0 || !this.props.autohide ? STICKY : HIDDEN,
                        height: height,
                        lastScrollTop: scrollTop
                    })
                }
                else if (0 > this.refs.placeholder.getBoundingClientRect().top) {
                    this.setState({
                        state: this.state.state === STICKY ? STICKY : STATIC,
                        height: height,
                        lastScrollTop: scrollTop
                    })
                }
                else {
                    this.setState({
                        state: STATIC,
                        height: height,
                        lastScrollTop: scrollTop
                    })
                }
            }
        }
        else if (this.props.position === BOTTOM) {
            if (window.innerHeight < this.refs.placeholder.getBoundingClientRect().top) {
                this.setState({
                    state: diff < 0 || !this.props.autohide ? STICKY : HIDDEN,
                    height: height,
                    lastScrollTop: scrollTop
                })
            } 
            else if (window.innerHeight < this.refs.placeholder.getBoundingClientRect().top + this.refs.placeholder.offsetHeight) {
                this.setState({
                    state: this.state.state === STATIC ? STATIC : this.state.state,
                    height: height,
                    lastScrollTop: scrollTop
                })
            }
            else {
                this.setState({
                    state: STATIC,
                    height: height,
                    lastScrollTop: scrollTop
                })
            }
        }
    }
    
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, false);
        window.addEventListener('resize', this.handleScroll, false);

        let height = 0;
        if (this.refs && this.refs.children && this.refs.children.getBoundingClientRect().height) {
            height = this.refs.children.getBoundingClientRect().height;
        }
        this.setState({
            state: STATIC,
            height: height,
            lastScrollTop: document.body.scrollTop
        });
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
        if (nextState.state !== this.state.state) {
            return true;
        }
        return false;
    }

    getStyles() {
        let styles = { ...this.defaultStyles };
        if (this.state.state === STICKY) {
            styles.children.position = 'fixed';
        }
        if (this.props.position === BOTTOM) {
            styles.children.bottom = 0;
            if (this.state.state === STATIC) {
                styles.children.top = 0;
            }
        }
        else {
            styles.children.top = 0;
        }
        if (this.state.state === STATIC) {
            styles.root.position = 'relative';
        }
        if (this.state.height) {
            styles.placeholder.height = this.state.height + 'px';
        }
        return styles;
    }

    render() {
        let styles = this.getStyles();
        let wrapper;

        let childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                sticky: this.state.state
            })
        );

        let container = <div ref="children" style={styles.children}>
                    {childrenWithProps}
                </div>;

        if (this.state.state === HIDDEN && this.props.autohide) {
            container = null;
        }

        if (this.props.position === BOTTOM && this.state === STATIC) {

        }

        if (!this.props.autohide || !this.props.transitionName || (this.props.position === BOTTOM && this.state.state === STATIC)) {
            wrapper = container;
        }
        else {
            wrapper = <ReactCSSTransitionGroup component={this.props.component}
                transitionName={this.props.transitionName}
                transitionEnterTimeout={this.props.transitionEnterTimeout} 
                transitionLeaveTimeout={this.props.transitionLeaveTimeout} >
                {container}
            </ReactCSSTransitionGroup>
        }

        return (
            <div style={styles.root}>
                <div ref="placeholder" className="placeholder" style={styles.placeholder}></div>
                {wrapper}
            </div>
        );
    }
}

Sticky.propTypes = {
    position: PropTypes.string,
    autohide: PropTypes.bool,
    component: PropTypes.string,
    transitionName: PropTypes.string,
    transitionEnterTimeout: PropTypes.number,
    transitionLeaveTimeout: PropTypes.number
}
Sticky.defaultProps = {
    position: TOP,
    autohide: false,
    component: 'div',
    transitionEnterTimeout: 500,
    transitionLeaveTimeout: 300
}

export default Sticky;