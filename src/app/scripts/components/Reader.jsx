import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { extract, selectChapter } from '../actions/extraction';

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
            if (document.body.scrollTop > this.props.threshold) {
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

    onSelectChapter(chapterUrl, e) {
        console.log(chapterUrl)
        console.log(this);

        console.log(arguments);
        this.props.selectChapter(this.props.params.id, chapterUrl)
    }

    autodetect() {
        switch(this.props.status) {
            case LOADED: {
                let footer = null;
                if (this.props.extraction.previous || this.props.extraction.next) {
                    footer = <Footer previous={this.props.extraction.previous} next={this.props.extraction.next} sticky={this.state.sticky} onSelectChapter={this.onSelectChapter.bind(this)} />
                }
                return <div className={this.state.sticky === 1 ? '' : classes.sticky}>
                    <Header title={this.props.extraction.title} sticky={this.state.sticky} hasContents={this.props.extraction.contents ? true : false} />
                    <PageList images={this.props.extraction.images} tabId={Number(this.props.params.id)} />
                    {footer}
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
    { extract, selectChapter }
)(Reader)
