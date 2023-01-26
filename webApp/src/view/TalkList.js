import React, { Component } from 'react';

import { humanTime } from '../common/common';

import { Dark as Theme } from '../common/theme';
import * as T from './StyledElements';

import ImageMarker from '../component/ImageMarker';

import { talkList } from '../mock/sample01';



class TalkList extends Component {
  constructor (props) {
    super(props);

    const { cw } = this.props;

    this.state = {
      cw,
      talkList: talkList,
      selected: 't2',
    };
  }

  static getDerivedStateFromProps(props, prevState) {
    const { cw } = props;

    if( prevState.cw !== cw ) {
      return { cw };
    }

    return null;
  }

  handleClick = (itemId) => () => {
    this.setState({ selected: itemId });
  }

  render () {
    const { cw, talkList, selected } = this.state;

    return (
      <T.ListBox>
        { talkList.map((d, i) => (
          <T.ListBoxItem
            key={`talkList-${i}`}
            selected={d.id === selected}
            onClick={this.handleClick(d.id)}
          >
            <T.ListBoxIcon>
              <ImageMarker size={Theme.listItemHeight - 16} title={d.title} color={d.color} />
            </T.ListBoxIcon>
            <T.ListBoxBody width={cw - Theme.listItemHeight - 10}>
              <T.ListTitleLine>
                <T.ListBoxTitle>{d.title}</T.ListBoxTitle>
                <T.ListBoxTime>{humanTime(d.time)}</T.ListBoxTime>
              </T.ListTitleLine>
              <T.ListBoxMessage>{d.lastTalk}</T.ListBoxMessage>
            </T.ListBoxBody>
            
          </T.ListBoxItem>)
        )}
      </T.ListBox>
    );
  }

};

export default TalkList;
