import React, { Component, PropTypes } from 'react';

class Loader extends Component {
  render() {
    return (
      <div>{this.props.text}</div>
    );
  }
}

Loader.PropTypes = {
  text: PropTypes.string,
}

Loader.defaultProps = {
  text: 'Loading',
}

export default Loader;
