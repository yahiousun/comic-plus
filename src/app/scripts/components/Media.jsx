import React, {Component, PropTypes} from 'react';

import {LOADING, PROGRESS, LOADED, FAILED } from '../constants/status';
import classes from '../../styles/media.scss';

class Media extends Component {

    get defaultStyles() {
        return {
            root: {
                textAlign: 'center',
                minHeight: '400px'
            },
            placeholder: {
                winth: '100%',
                height: '100%',
                backgroundColor: '#CCCCCC'
            },
            error: {
                winth: '100%',
                height: '100%',
                color: '#F00'
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
        let loader = null, error = null, media = null;

        if (this.state.status === LOADED) {
            media = <img src={this.props.source} className={classes.fadeIn} />
        }
        else if (this.state.status === FAILED) {
            error = <div style={styles.error}>failed</div>
        }
        else {
            loader = <div>loading</div>
        }
        return (
            <div ref="container" style={styles.root}>
                { loader }
                { media }
                { error }
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