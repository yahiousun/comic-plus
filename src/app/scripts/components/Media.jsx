import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { addQuery, removeQuery } from '../actions/querylist';
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
        this.props.addQuery(this.props.source);
        chrome.tabs.sendMessage(this.props.tabId, {type: REQUEST_IMAGE, payload: this.props.source}, (response) => {
            this.props.removeQuery(this.props.source);
            if (response.type === LOADED) {
                this.setState({
                    status: LOADED
                })
            }
            else {
                this.setState({
                    status: FAILED
                })
            }
            this.unbindEventHandler()
        });
    }

    bindEventHandler() {
        window.addEventListener('scroll', this.handleLazyload.bind(this), false);
        window.addEventListener('resize', this.handleLazyload.bind(this), false);
    }

    unbindEventHandler() {
        window.removeEventListener('scroll', this.handleLazyload.bind(this), false);
        window.removeEventListener('resize', this.handleLazyload.bind(this), false);
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
    tabId: PropTypes.number.isRequired
}

Media.defaultProps = {
    preload: false,
    threshold: 400
}

export default connect(
    state => ({}),
    { addQuery, removeQuery }
)(Media);
