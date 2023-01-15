import React, { Component } from 'react';

import * as T from './StyledElements';

import TalkList from './TalkList';


class MainFrame extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <T.WholeBox>
        <T.HeaderWrap>
          <T.Header>Header</T.Header>
        </T.HeaderWrap>
        <T.Container>
          <TalkList />
        </T.Container>
      </T.WholeBox>
    );
  }

};

export default MainFrame;
