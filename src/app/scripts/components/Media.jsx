import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import {LOADING, PENDING, LOADED, FAILED, REQUEST_IMAGE} from '../constants';

import classes from '../../styles/app.scss';

class Media extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: LOADING
        }
    }

    componentDidMount() {
        if(this.props.preload) {
            this.load();
        }
        else {
            this.bindEventHandler();
        }
    }

    componentWillUnmount() {
        this.unbindEventHandler();
    }

    load() {
        if (this.state.status === PENDING) {
            return;
        }
        this.setState({
            status: PENDING
        })
        this
            .props
            .requestImage(this.props.source)
            .then(
                (response) => {
                    this.setState({
                        status: LOADED
                    })
                },
                (response) => {
                    this.setState({
                        status: FAILED
                    })
                }
            )
    }

    bindEventHandler() {
        window.addEventListener('scroll', this.handleLazyload.bind(this));
        window.addEventListener('resize', this.handleLazyload.bind(this));
    }

    unbindEventHandler() {
        window.removeEventListener('scroll', this.handleLazyload.bind(this));
        window.removeEventListener('resize', this.handleLazyload.bind(this));
    }

    handleLazyload() {
        if(this.state.status === LOADING) {
            if (document.body.scrollTop + window.innerHeight + this.props.threshold > this.refs.container.offsetTop) {
                this.load();
            }
        }
    }

    autodetect() {
        switch(this.state.status) {
            case LOADED: {
                return <img src={this.props.source} className={classnames(classes['media-image'], classes.fadein)} />
            }
            break;
            case FAILED: {
                return <div className={classes.failed} onClick={this.load.bind(this)}>failed</div>
            }
            break;
            default: {
                return <div className={classes.placeholder}>loading</div>
            }
        }
    }

    render() {
        return (
            <div ref="container">
                {this.autodetect()}
            </div>
        );
    }
}

Media.propTypes = {
    source: PropTypes.string.isRequired,
    preload: PropTypes.bool,
    threshold: PropTypes.number,
    requestImage: PropTypes.func.isRequired
}

Media.defaultProps = {
    preload: false,
    threshold: 400
}

export default Media;
