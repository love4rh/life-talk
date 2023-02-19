import React from 'react';
import PropTypes from 'prop-types';

import { AppComponent } from '../app/AppData';

import { Dark as TM } from '../common/theme';

import * as T from './StyledElements';

import TalkList from './TalkList';
import TalkBoard from './TalkBoard';
import TalkInput from './TalkInput';



class MainFrame extends AppComponent {
  static propTypes = {
    ch: PropTypes.number.isRequired, // component height
    cw: PropTypes.number.isRequired, // component width
  }

  constructor (props) {
    super(props);

    const { cw, ch } = this.props;

    this.state = {
      cw, ch,
    };
  }

  static getDerivedStateFromProps(props, prevState) {
    const { cw, ch } = props;

    if( prevState.cw !== cw || prevState.ch !== ch ) {
      return { cw, ch };
    }

    return null;
  }

  renderComp () {
    const { curBoard, curTalkIndex, updatedTick, pageMode, cw } = this.state;

    const singleMode = cw < 815;
    const listWidth = singleMode ? Math.min(cw, 760) : Math.min(360, (cw - 5) * 0.32);
    const talkWidth = singleMode ? Math.min(cw, 760) : Math.min(760, cw - 5 - listWidth);

    return (
      <T.WholeBox key={`main-wrap-${updatedTick}`}>
        <T.HStack>

          { (!singleMode || pageMode === 'list') &&
            <T.VStack width={`${listWidth}px`}>
              <T.CenteredHeader bgColor={TM.listPanelColor}>Talk List</T.CenteredHeader>
              <T.Container bgColor={TM.listPanelColor}>
                <TalkList cw={listWidth} />
              </T.Container>
            </T.VStack>
          }

          { !singleMode && <T.Box width={5}>&nbsp;</T.Box> }

          { (!singleMode || pageMode === 'talk') &&
            <T.VStack width={`${talkWidth}px`}>
              <T.CenteredHeader bgColor={TM.talkPanelColor}>{curBoard && curBoard.title}</T.CenteredHeader>
              <T.Container key={`talkarea-${curTalkIndex}`} bgColor={TM.talkPanelColor}>
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
