import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import classes from '../../styles/app.scss';

class Contents extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.onSelectChapter)
    }

    render() {
        let heading, contents;
        if (this.props.title) {
            heading = <h3 className={classes['comic-title']}>{this.props.title}</h3>
        }
        if (this.props.contents.length) {
            contents = [];
            this.props.contents.forEach((chapter, index) => {
                contents.push(<a key={index} href={chapter.chapterUrl} title={chapter.title} onClick={this.props.onSelectChapter.bind(this, chapter.chapterUrl)}>{chapter.chapterName}</a>)
            })
        }
        return (
            <div>
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
