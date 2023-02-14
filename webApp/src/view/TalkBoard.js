import React, { Component } from 'react';

import styled from 'styled-components';

import * as T from './StyledElements';

import { mmdd } from '../common/common';

import { connectAppData } from '../app/AppData';

import TalkBox from './TalkBox';
import TalkSeparator from './TalkSeparator';



// Styled Component for TalkBox
export const WrappedBox = styled.div`
  flex: 1 1;
  overflow: hidden;
`;

export const ScrolledBox = styled(T.ScrollStyledDiv)`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;


class TalkBoard extends Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  componentDidMount () {
    connectAppData(this);
  }

  renderTalks = () => {
    const { talkList, curTalkIndex } = this.state;

    if( !talkList ) return null;

    const curTalk = talkList[curTalkIndex];

    return curTalk.talks.map((d, i) => {
      return (<>
        {(i === 0 || mmdd(d.time) !== mmdd(curTalk.talks[i - 1].time)) && <TalkSeparator key={`talksep-${i}`} text={mmdd(d.time)} />}
        <TalkBox key={`talkitem-${i}`} talk={d} />
      </>);
    });
  }

  render () {
    const { talkList } = this.state;

    if( !talkList ) return null;

    return (
      <WrappedBox>
        <ScrolledBox>
          { this.renderTalks() }
        </ScrolledBox>
      </WrappedBox>
    );
  }

};

export default TalkBoard;
