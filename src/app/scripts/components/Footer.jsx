import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import classes from '../../styles/app.scss';

import Button from './Button';

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    autodetect() {
        let previous, next;

        if (this.props.sticky === 0) {
            return null;
        }

        if (this.props.previous) {
            previous = <Button text={chrome.i18n.getMessage('actionPreviousChapter') + ' ' +  this.props.previous.chapterName} onClick={this.props.onSelectChapter.bind(this, this.props.previous.url)} />
        }

        if (this.props.next) {
            next = <Button text={chrome.i18n.getMessage('actionNextChapter') + ' ' + this.props.next.chapterName} onClick={this.props.onSelectChapter.bind(this, this.props.next.url)} />
        }

        return <footer className={classes.footer}>
            <div className={classes.container}>
                {previous}{next}
            </div>
        </footer>
    }

    render() {
        return (
            <ReactCSSTransitionGroup component="div"
                transitionName={classes.footer}
                transitionEnterTimeout={500} 
                transitionLeaveTimeout={300} >
                {this.autodetect()}
            </ReactCSSTransitionGroup>
        );
    }
}

Footer.propTypes = {
    previous: PropTypes.object,
    next: PropTypes.object,
    onSelectChapter: PropTypes.func,
}

export default Footer
