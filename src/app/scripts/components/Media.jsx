import React, {Component, PropTypes} from 'react';

import {LOADING, PROGRESS, LOADED, FAILED } from '../constants/status';

class Media extends Component {

    get defaultStyles() {
        return {
            root: {
                textAlign: 'center'
            }
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            status: null
        }
        this.handleLazyload = this.onChange.bind(this);
    }

    componentDidMount() {
        this.bindEventHandler();
        
        if(this.props.preload && (!this.props.status || this.props.status !== LOADING || this.rpops.status !== PROGRESS)) {
            this.props.loadImage(this.props.source);
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.status && this.state.status !== nextProps.status) {
            this.setState({
                status: nextProps.status
            });
            if (nextProps.status === LOADED) {
                this.unbindEventHandler();
            }
        }
    }

    componentWillUnmount() {
        this.unbindEventHandler();
    }

    bindEventHandler() {
        window.addEventListener('scroll', this.handleLazyload);
        window.addEventListener('resize', this.handleLazyload);
    }

    unbindEventHandler() {
        window.removeEventListener('scroll', this.handleLazyload);
        window.removeEventListener('resize', this.handleLazyload);
    }

    onChange() {
        if(!this.state.status) {
            if (document.body.scrollTop + window.innerHeight + this.props.threshold > this.refs.container.offsetTop) {
                this.props.loadImage(this.props.source);
            }
        }
    }

    render() {
        const styles = { ...this.defaultStyles };
        let component;
        switch(this.state.status) {
            case LOADING: {
                component = <div>loading</div>
                break;
            }
            case PROGRESS: {
                component = <div>loading</div>
                break;
            }
            case LOADED: {
                component = <img src={this.props.source} />
                break;
            }
            case FAILED: {
                component = <div>failed</div>
                break;
            }
        }
        return (
            <div ref="container" style={styles.root}>
                { component }
            </div>
        );
    }
}

Media.propTypes = {
    source: PropTypes.string.isRequired,
    status: PropTypes.string,
    preload: PropTypes.bool,
    threshold: PropTypes.number,
    loadImage: PropTypes.func.isRequired
}

Media.defaultProps = {
    preload: false,
    threshold: 400
}

export default Media;