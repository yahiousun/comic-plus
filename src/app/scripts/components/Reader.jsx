import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { extract } from '../actions/extraction';

import { LOADING, PENDING, LOADED, FAILED } from '../constants';

import classes from '../../styles/app.scss';

import Header from './Header';
import PageList from './PageList';
import Footer from './Footer';

class Reader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sticky: 1,
            lastScrollTop: 0
        }
    }

    componentDidMount() {
        this.extract();
        if (this.props.status === LOADED) {
            if (this.refs.header && document.body.scrollTop > this.refs.header.height) {
                if (this.state.sticky !== 2) {
                    this.setState({
                        sticky: 2,
                        lastScrollTop: document.body.scrollTop
                    })
                }
            }
        } 
        window.addEventListener('scroll', this.handleScroll.bind(this), false);
    }

    componentWillReceiveProps(nextProps) {  
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this), false);
        if (this.header) {
            this.header = null;
        }
    }

    handleScroll(e) {
        if (this.props.status !== LOADED) {
            return
        }
        let diff = document.body.scrollTop - this.state.lastScrollTop;
        if (document.body.scrollTop < this.props.threshold) {
            if (this.state.sticky !== 1) {
                this.setState({
                    sticky: 1,
                    lastScrollTop: document.body.scrollTop
                })
            }
        }
        else {
            if (diff >= 0 && this.state.sticky !== 0) {
                this.setState({
                    sticky: 0,
                    lastScrollTop: document.body.scrollTop
                })
            }
            else if (diff < 0 && this.state.sticky !== 2) {
                this.setState({
                    sticky: 2,
                    lastScrollTop: document.body.scrollTop
                })
            }
            else {
                this.setState({
                    lastScrollTop: document.body.scrollTop
                });
            }
        }
    }

    autodetect() {
        switch(this.props.status) {
            case LOADED: {
                return <div className={this.state.sticky === 1 ? '' : classes.sticky}>
                    <Header title={this.props.extraction.title} sticky={this.state.sticky} />
                    <PageList images={this.props.extraction.images} tabId={Number(this.props.params.id)} />
                </div>
            }
            case FAILED: {
                return <div>{this.props.error}</div> 
            }
            default: {
                return <div>loading</div>
            }
        }
    }

    render() {
        return (
            this.autodetect()
        );
    }
    extract() {
        this.props.extract(this.props.params.id)
    }
}

Reader.propTypes = {
    threshold: PropTypes.number
}

Reader.defaultProps = {
    threshold: 100
}

export default connect(
    state => ({
        extraction: state.extraction.result,
        error: state.extraction.error,
        status: state.extraction.status,
        querylist: state.querylist
    }),
    { extract }
)(Reader)
