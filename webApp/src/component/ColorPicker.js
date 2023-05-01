import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import Icon from '@mui/material/Icon';

import { getColor } from '../app/theme';


const _colorList_ = [
  ['red', 'pink', 'purple', 'deepPurple'],
  ['indigo', 'blue', 'lightBlue', 'cyan'],
  ['teal', 'green', 'lightGreen', 'lime'],
  ['brown', 'amber', 'orange', 'deepOrange']
];

const ItemLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ItemBox = styled.div`
  width: ${({ size }) => size || 48}px;
  height: ${({ size }) => size || 48}px;
  box-sizing: border-box;
  color: rgb(255, 255, 255, 0.7);
  background-color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ selected }) => selected && `
    border: 1px solid rgb(255, 255, 255, 0.7)
  `}
`;


class ColorPicker extends Component {
  static propTypes = {
    // ch: PropTypes.number.isRequired, // component height
    cw: PropTypes.number.isRequired, // component width
    color: PropTypes.string, // 선택된 컬러
    onChanged: PropTypes.func // 색상 변경 핸들러
  }
  
  constructor (props) {
    super(props);

    const { cw, ch, color } = this.props;

    this.state = {
      cw, ch, color
    };
  }

  static getDerivedStateFromProps(props, prevState) {
    const { cw } = props;

    if( prevState.cw !== cw ) {
      return { cw };
    }

    return null;
  }

  handleChange = (color) => () => {
    this.setState({ color });

    if( this.props.onChanged ) {
      this.props.onChanged(color);
    }
  }

  render () {
    const { cw, color } = this.state;

    const iw = cw / 4;

    return (
      <div style={{ width: cw }}>
        { _colorList_.map((C, i) => (
          <ItemLine key={`colorLine-${i}`}>
            { C.map((clr, j) => {
              const c = getColor(clr);

              return (
                <ItemBox
                  key={`colorBox-${i}-${j}`}
                  color={c}
                  size={iw}
                  selected={color === c}
                  onClick={this.handleChange(c)}
                >
                  { color === c && <Icon sx={{ fontSize:`${iw - 20}px` }}>check</Icon>}
                </ItemBox>
              );
            })}
          </ItemLine>
        ))}
      </div>
    );
  }
};


export default ColorPicker;
export { ColorPicker };
