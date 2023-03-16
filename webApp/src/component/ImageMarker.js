import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ImageMarker extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.string,
  }

  constructor (props) {
    super(props);

    const { title, size, color } = props;

    this.state = {
      title,
      size,
      color: color || '#1f77b4'
    };
  }

  render () {
    const { size, color, title } = this.state;

    const mp = size / 2;

    return (
      <svg width={size} height={size}>
        <circle cx={mp} cy={mp} r={mp} stroke="none" strokeWidth="0" fill={color} />
        <text x={mp} y={mp - 1} fill={'white'} textAnchor={`middle`} dominantBaseline={`central`}>{title[0]}</text>
      </svg>
    );
  }
}


export default ImageMarker;
export { ImageMarker };

