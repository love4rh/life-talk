import React, { Component } from 'react';

import { isundef } from '../common/common';



class ImageCard extends Component {
  constructor (props) {
    super(props);
    this.state = { loading: true, ...this.props };
  }

  handleLoad = () => {
    this.setState({ loading: false });
  }

  handleError = () => {
    this.setState({ loading: false, src: brokenImage });
  }

  render () {
    const { noImage, loading, src, alt, ...rest } = this.state;

    return (
      <img src={isundef(src) || src === '' ? noImage : src} alt={alt} onLoad={this.handleLoad} onError={this.handleError} {...rest} />
    );
  }
};


export default ImageCard;
export { ImageCard };
