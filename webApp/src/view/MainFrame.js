import React, { Component } from 'react';

import * as T from './StyledElements';

import TalkList from './TalkList';
import TalkBoard from './TalkBoard';



class MainFrame extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const panelColor = ['#141414', '#1f1f1f'];

    return (<T.WholeBox>
      <T.HStack>

        <T.VStack width={'360px'}>
          <T.Header bgColor={panelColor[0]}>Talk List</T.Header>
          <T.Container bgColor={panelColor[0]}>
            <TalkList />
          </T.Container>
        </T.VStack>

        <T.Box width={5}>&nbsp;</T.Box>

        <T.VStack width={'760px'}>
        <T.Header bgColor={panelColor[1]}>Talk Detail</T.Header>
          <T.Container bgColor={panelColor[1]}>
            <TalkBoard />
          </T.Container>
        </T.VStack>

      </T.HStack>
    </T.WholeBox>);
  }

};

export default MainFrame;
