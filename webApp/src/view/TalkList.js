import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connectAppData } from '../app/AppData';
import { actChangeBoard } from '../view/actions';

import { humanTime } from '../common/common';

import { Dark as Theme } from '../common/theme';
import * as T from './StyledElements';

import ImageMarker from '../component/ImageMarker';



class TalkList extends Component {
  static propTypes = {
    cw: PropTypes.number.isRequired, // component width
  }

  constructor (props) {
    super(props);

    const { cw } = this.props;

    this.state = {
      cw
    };
  }

  componentDidMount () {
    connectAppData(this);
  }

  static getDerivedStateFromProps(props, prevState) {
    const { cw } = props;

    if( prevState.cw !== cw ) {
      return { cw };
    }

    return null;
  }

  handleClick = (index) => () => {
    actChangeBoard(index);
  }

  render () {
    const { cw, talkList, curTalkIndex } = this.state;

    if( !talkList ) return null;

    return (
      <T.ListBox key={`tl-${curTalkIndex}`}>
        { talkList && talkList.map((d, idx) => (
          <T.ListBoxItem
            key={`talkList-${idx}`}
            selected={idx === curTalkIndex}
            onClick={this.handleClick(idx)}
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
