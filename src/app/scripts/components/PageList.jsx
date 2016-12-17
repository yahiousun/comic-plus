import React, {Component, PropTypes} from 'react';

import Page from './Page';

class PageList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let pages = 'no images';

    if (this.props.pages.length) {
      pages = [];
      this.props.pages.forEach((source, index) => {
        pages.push(<Page key={index} source={source} images={this.props.images} number={index + 1} total={this.props.pages.length} preload={index < this.props.preload ? true : false} loadImage={this.props.loadImage} />)
      })
    }

    return (
      <div>
        {pages}
      </div>
    );
  }
}

PageList.propTypes = {
  pages: PropTypes.array.isRequired,
  images: PropTypes.object.isRequired,
  preload: PropTypes.number,
  loadImage: PropTypes.func.isRequired
}

PageList.defaultProps = {
  preload: 3
}

export default PageList;
