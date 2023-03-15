import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { randomInteger, isundef } from '../common/common';

import CheckIcon from '@mui/icons-material/Check';

import {
  red, pink, purple, deepPurple,
  indigo, blue, lightBlue, cyan,
  teal, green, lightGreen, lime,
  yellow, amber, orange, deepOrange,
  brown, grey, blueGrey
} from '@mui/material/colors';


const DefinedColorMap = {
  red, pink, purple, deepPurple,
  indigo, blue, lightBlue, cyan,
  teal, green, lightGreen, lime,
  yellow, amber, orange, deepOrange,
  brown, grey, blueGrey
};


const ItemLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ItemBox = styled.div`
  width: ${({ size }) => size || 48}px;
  height: ${({ size }) => size || 48}px;
  box-sizing: border-box;
  color: rgb(255, 255, 255, 0.7)

  ${({ selected }) => selected && `
    border: 1px solid rgb(255, 255, 255, 0.7)
  `}
`;


class ColorPicker extends Component {
  static propTypes = {
    ch: PropTypes.number.isRequired, // component height
    cw: PropTypes.number.isRequired, // component width
    color: PropTypes.string // 선택된 컬러
  }
  
  constructor (props) {
    super(props);

    const { cw, ch } = this.props;

    this.state = {
      cw, ch
    };
  }

  render () {
    const { cw, ch } = this.state;

    return (
      <div style={{ width: cw, height: ch }}>
        
      </div>
    );
  }
};


export const getRandomColor = () => {
  const colorKeys = Object.keys(DefinedColorMap);
  return DefinedColorMap[colorKeys[randomInteger(0, colorKeys.length - 1)]]['800'];
}


export default ColorPicker;
export { ColorPicker };
