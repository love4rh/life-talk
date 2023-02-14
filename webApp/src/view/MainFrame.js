import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connectAppData } from '../app/AppData';

import { Dark as Theme } from '../common/theme';

import * as T from './StyledElements';

import TalkList from './TalkList';
import TalkBoard from './TalkBoard';
import TalkInput from './TalkInput';
import { makeid } from '../common/common';



class MainFrame extends Component {
  static propTypes = {
    ch: PropTypes.number.isRequired, // component height
    cw: PropTypes.number.isRequired, // component width
  }

  constructor (props) {
    super(props);

    const { cw, ch } = this.props;

    this.state = {
      cw, ch,
      pageMode: 'list',
      objID: makeid(16)
    };
  }

  componentDidMount () {
    connectAppData(this);
  }

  static getDerivedStateFromProps(props, prevState) {
    const { cw, ch } = props;

    if( prevState.cw !== cw || prevState.ch !== ch ) {
      return { cw, ch };
    }

    return null;
  }

  render () {
    const { talkList, curTalkIndex, updatedTick, pageMode, cw } = this.state;

    if( !updatedTick ) return null;

    const singleMode = cw < 815;
    const listWidth = singleMode ? Math.min(cw, 760) : Math.min(360, (cw - 5) * 0.32);
    const talkWidth = singleMode ? Math.min(cw, 760) : Math.min(760, cw - 5 - listWidth);

    const curTalk = talkList[curTalkIndex];

    return (
      <T.WholeBox key={`main-wrap-${updatedTick}`}>
        <T.HStack>

          { (!singleMode || pageMode === 'list') &&
            <T.VStack width={`${listWidth}px`}>
              <T.CenteredHeader bgColor={Theme.listPanelColor}>Talk List</T.CenteredHeader>
              <T.Container bgColor={Theme.listPanelColor}>
                <TalkList cw={listWidth} />
              </T.Container>
            </T.VStack>
          }

          { !singleMode && <T.Box width={5}>&nbsp;</T.Box> }

          { (!singleMode || pageMode === 'talk') &&
            <T.VStack width={`${talkWidth}px`}>
              <T.CenteredHeader bgColor={Theme.talkPanelColor}>{curTalk && curTalk.title}</T.CenteredHeader>
              <T.Container key={`talkarea-${curTalkIndex}`} bgColor={Theme.talkPanelColor}>
                <TalkBoard />
                <TalkInput />
              </T.Container>
            </T.VStack>
          }

        </T.HStack>
      </T.WholeBox>
    );
  }

};

export default MainFrame;
