import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import classes from '../../styles/app.scss';

import Contents from './Contents';

class ContentsList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        let contentsList = null;
        if (this.props.contents.length) {
            contentsList = [];
            this.props.contents.forEach((contents, index) => {
                contentsList.push(<Contents key={index} title={contents.title} contents={contents.contents} onSelectChapter={this.props.onSelectChapter} />)
            })
        }
        
        return (
            <div>
                {contentsList}
            </div>
        );
    }
}

ContentsList.propTypes = {
    contents: PropTypes.array.isRequired,
    onSelectChapter: PropTypes.func
}

export default ContentsList
