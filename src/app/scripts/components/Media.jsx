import React, {Component, PropTypes} from 'react';

import {LOADING, PROGRESS, LOADED, FAILED, TIMEOUT } from '../constants/status';
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
        this.handleLazyload = this.onWindowChange.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleLazyload);
        window.addEventListener('resize', this.handleLazyload);
        
        if(this.props.preload && (!this.props.status || this.props.status !== LOADING || this.rpops.status !== PROGRESS)) {
            this.props.loadImage(this.props.source);
        }
        else {
            this.handleLazyload();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.status && this.state.status !== nextProps.status) {
            this.setState({
                status: nextProps.status
            });
            if (nextProps.status === LOADED) {
                window.removeEventListener('scroll', this.handleLazyload);
                window.removeEventListener('resize', this.handleLazyload);
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.status && this.state.status !== nextProps.status) {
            return true;
        }
        return false;
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleLazyload);
        window.removeEventListener('resize', this.handleLazyload);
    }

    onWindowChange() {
        if(!this.state.status) {
            if (document.body.scrollTop + window.innerHeight + this.props.threshold > this.refs.container.offsetTop) {
                this.props.loadImage(this.props.source);
            }
        }
    }

    reloadImage() {
        if(!this.state.status || this.state.status === FAILED) {
            this.props.loadImage(this.props.source);
        }
    }

    render() {
        const styles = { ...this.defaultStyles };
        let loader = null, error = null, media = null;

        if (this.state.status === LOADED) {
            media = <img src={this.props.source} className={classes.fadeIn} />
        }
        else if (this.state.status === FAILED) {
            error = <div style={styles.error} onClick={this.props.reloadImage}>failed</div>
        }
        else if (this.state.status === TIMEOUT) {
            loader = <div>timeout</div>
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
    threshold: 200
}

export default Media;