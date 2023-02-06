import React, { Component } from 'react';

import styled from 'styled-components';
import { tickCount } from '../common/common';

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

  render () {
    const item = {
      text: 'I want..\nThis would be a nice talking board.',
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
