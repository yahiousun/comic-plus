import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import classes from '../../styles/app.scss';

class Contents extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        let heading, contents;
        if (this.props.title) {
            heading = <h3 className={classes['comic-name']}>{this.props.title}</h3>
        }
        if (this.props.contents.length) {
            contents = [];
            this.props.contents.forEach((chapter, index) => {
                contents.push(<a className={classes['chapter-link']} key={index} href={chapter.chapterUrl} title={chapter.title} onClick={this.props.onSelectChapter.bind(this, chapter.chapterUrl)}>{chapter.chapterName}</a>)
            })
        }
        return (
            <div className={classes.contents}>
                {heading}
                {contents}
            </div>
        );
    }
}

Contents.propTypes = {
    title: PropTypes.string,
    contents: PropTypes.array,
    currentChaperUrl: PropTypes.string ,
    onSelectChapter: PropTypes.func
}

export default Contents