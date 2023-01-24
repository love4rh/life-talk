import React, { Component } from 'react';

import { mmdd, hhmm, tickCount } from '../common/common';

import { Dark as Theme } from '../common/theme';
import * as T from './StyledElements';

import ImageMarker from '../component/ImageMarker';



class TalkList extends Component {
  constructor (props) {
    super(props);

    this.state = {
      talkList: [
        { id: 't1', title: '일상', color: '#1f77b4', lastTalk: '마지막 메시지 어쩌구 저쩌구', time: tickCount() - 360000 },
        { id: 't2', title: '업무', color: '#ff7f0e', lastTalk: '마지막 메시지 어쩌구 저쩌구', time: tickCount() - 30000 }
      ],
      selected: 't2',
    };
  }

  render () {
    const { talkList, selected } = this.state;

    return (
      <T.ListBox>
        { talkList.map((d, i) => (
          <T.ListBoxItem key={`talkList-${i}`} selected={d.id === selected}>
            <T.ListBoxIcon>
              <ImageMarker size={Theme.listItemHeight - 16} title={d.title} color={d.color} />
            </T.ListBoxIcon>
            <T.ListBoxBody>
              <T.ListBoxTitle>{d.title}</T.ListBoxTitle>
              <T.ListBoxMessage>{d.lastTalk}</T.ListBoxMessage>
            </T.ListBoxBody>
            <T.ListBoxTime>
              <div>{mmdd(d.time)}</div>
              <div>{hhmm(d.time)}</div>
            </T.ListBoxTime>
          </T.ListBoxItem>)
        )}
      </T.ListBox>
    );
  }

};

export default TalkList;
