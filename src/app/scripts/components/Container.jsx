import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadResource } from '../actions/resource';
import { downloadImage } from '../actions/image';
import { chapterSelect } from '../actions/chapter';

import { LOADING, PROGRESS, LOADED, FAILED } from '../constants/state';

import Loader from './Loader';
import Reader from './Reader';

class Container extends Component {
  componentDidMount() {
    this.props.loadResource();
  }

  render() {
    let children;

    switch (this.props.state) {
      case LOADING:
        children = <Loader />
        break;
      case PROGRESS:
        children = <Loader />
        break;
      case LOADED:
        children = <Reader resource={this.props.result} images={this.props.images} loadImage={this.props.downloadImage} chapterSelect={this.props.chapterSelect} />
        break;
      case FAILED:
        children = <Loader text="Load resource failed" />
        break;
    }
    
    return (
      <div>
        { children }
      </div>
    );
  }
}

export default connect(
  state => ({
    result: state.resource.get('result'),
    error: state.resource.get('error'),
    state: state.resource.get('state'),
    images: state.images.toJS()
  }),
  { loadResource, downloadImage, chapterSelect }
)(Container);
