import React from 'react';
import styled from 'styled-components';
import { AppComponent } from '../app/AppData';

import { isvalid, mmdd } from '../common/common';

import * as T from './StyledElements';
import * as TB from './TalkBoxItem';



// Styled Component for TalkBox
const WrappedBox = styled.div`
  flex: 1 1;
  overflow: hidden;
`;

const ScrolledBox = styled(T.ScrollStyledDiv)`
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
    // TODO scrollTop가 0이 되면 이전 메시지 가져오기
  }

  renderTalks = () => {
    const { curBoard } = this.state;

    if( !curBoard ) return null;

    const tags = [];
    const talks = curBoard.talks || [];

    talks.map((d, i) => {
      if( (i === 0 || mmdd(d.time) !== mmdd(talks[i - 1].time)) ) {
        tags.push( <TB.TalkSeparator key={`talksep-${i}`} text={mmdd(d.time)} /> );
      }

      if( isvalid(d.text) ) {
        tags.push( <TB.TalkBox key={`talkitem-${i}`} talk={d} /> );
      }

      if( isvalid(d.URLs) ) {
        tags.push( <TB.TalkURLBox key={`urlitem-${i}`} talk={d} /> );
      }

      if( isvalid(d.bas64Img) ) {
        tags.push( <TB.TalkImageBox key={`imgitem-${i}`} talk={d} /> );
      }

      return d;
    });

    return tags;
  }

  renderComp () {
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
