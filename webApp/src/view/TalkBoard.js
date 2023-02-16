import React from 'react';

import styled from 'styled-components';

import * as T from './StyledElements';

import { mmdd } from '../common/common';

import { AppComponent } from '../app/AppData';

import { TalkBox, TalkSeparator} from './TalkBoxItem';



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


class TalkBoard extends AppComponent {
  constructor (props) {
    super(props);

    this._sBox = React.createRef();
  }

  componentDidUpdate () {
    const board = this._sBox.current;
    board.scrollTop = board.scrollHeight;
  }

  handleScroll = (ev) => {
    // eslint-disable-next-line
    const { scrollTop, scrollHeight } = ev.target;
    // scrollTop가 0이 되면 이전 메시지 가져오기
  }

  renderTalks = () => {
    const { talkList, curTalkIndex } = this.state;

    if( !talkList ) return null;

    const tags = [];
    const curTalk = talkList[curTalkIndex];

    curTalk.talks.map((d, i) => {
      if( (i === 0 || mmdd(d.time) !== mmdd(curTalk.talks[i - 1].time)) ) {
        tags.push( <TalkSeparator key={`talksep-${i}`} text={mmdd(d.time)} /> );
      }
      tags.push( <TalkBox key={`talkitem-${i}`} talk={d} /> );

      return d;
    });

    return tags;
  }

  render () {
    const { talkList } = this.state;

    if( !talkList ) return null;

    return (
      <WrappedBox>
        <ScrolledBox ref={this._sBox} onScroll={this.handleScroll}>
          { this.renderTalks() }
        </ScrolledBox>
      </WrappedBox>
    );
  }

};

export default TalkBoard;
