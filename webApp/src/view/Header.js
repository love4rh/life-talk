import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { isvalid } from '../common/common';



const HdrBody = styled.div`
  height: ${({ height }) => `${height}px` || '100%'};
  width: ${({ width }) => `${width}px` || '100%'};
  color: ${({ color }) => color || 'white'};
  background-color: ${({ bgColor }) => bgColor || 'black'};
  border-bottom: 1px solid ${({ borderColor }) => borderColor || 'black'};
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  font-weight: bold;
`;

const HdrTitle = styled.div`
  width: ${({ width }) => width }px;
  display: flex;
  align-items: center;
  justify-content: ${({ center }) => center ? 'center' : 'flex-start'};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;


const HdrButton = styled.div`
  width: ${({ size }) => size }px;
  height: ${({ size }) => size }px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #26c6da;
  }
`;



class Header extends React.Component {
  static propTypes = {
    ch: PropTypes.number.isRequired, // component height
    cw: PropTypes.number.isRequired, // component width
    headButton: PropTypes.object, // Header Button 정보 { element, onClick }. null이면 표시 안함
    tailButton: PropTypes.object, // Tail Button 정보 { element, onClick }. null이면 표시 안함
    color: PropTypes.string,
    bgColor: PropTypes.string,
    borderColor: PropTypes.string,
    center: PropTypes.bool, // 가운데 정렬 여부
  }

  constructor (props) {
    super(props);

    const { cw, ch, headButton, tailButton } = this.props;

    this.state = {
      cw, ch,
      headButton, tailButton
    };
  }

  static getDerivedStateFromProps(props, prevState) {
    const { cw, ch, headButton, tailButton } = props;

    if( prevState.cw !== cw || prevState.ch !== ch
        || prevState.headButton !== headButton || prevState.tailButton !== tailButton )
    {
      return { cw, ch, headButton, tailButton };
    }

    return null;
  }

  render () {
    const { color, bgColor, borderColor, children, center } = this.props;
    const { cw, ch, headButton, tailButton } = this.state;

    const headOn = isvalid(headButton);
    const tailOn = isvalid(tailButton);

    const nw = cw - (headOn ? ch : 0) - (tailOn ? ch : 0);

    return (
      <HdrBody
        width={cw} height={ch}
        color={color} bgColor={bgColor} borderColor={borderColor}
      >
        { headOn && <HdrButton size={ch} onClick={headButton.onClick}>{ headButton.element }</HdrButton> }
        <HdrTitle width={nw} center={center}>{ children }</HdrTitle>
        { tailOn && <HdrButton size={ch} onClick={tailButton.onClick}>{ tailButton.element }</HdrButton> }
      </HdrBody>
    );
  }

};

export default Header;
export { Header };
