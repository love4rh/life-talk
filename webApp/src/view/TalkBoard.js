import React, { Component } from 'react';

import styled from 'styled-components';
import { tickCount } from '../common/common';

import { connectAppData } from '../app/AppData';

import TalkBox from './TalkBox';
import TalkSeparator from './TalkSeparator';



// Styled Component for TalkBox
export const WrappedBox = styled.div`
  flex: 1 1;
`;


class TalkBoard extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    connectAppData(this);
  }

  render () {
    const item = {
      text: 'I want..\n<span>This would be a nice talking board.</span>',
      time: tickCount()
    }

    return (
      <WrappedBox>
        <TalkBox talk={item} />
        <TalkSeparator text="Today" />
      </WrappedBox>
    );
  }

};

export default TalkBoard;
