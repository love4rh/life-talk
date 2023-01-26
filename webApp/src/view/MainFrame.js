import React, { Component } from 'react';

import { Dark as Theme } from '../common/theme';

import * as T from './StyledElements';

import TalkList from './TalkList';
import TalkBoard from './TalkBoard';



class MainFrame extends Component {
  constructor (props) {
    super(props);

    const { cw, ch } = this.props;

    this.state = {
      cw, ch,
      pageMode: 'list'
    }
  }

  static getDerivedStateFromProps(props, prevState) {
    const { cw, ch } = props;

    if( prevState.cw !== cw || prevState.ch !== ch ) {
      return { cw, ch };
    }

    return null;
  }

  render () {
    const boxClr = Theme.panelColor;
    const { pageMode, cw } = this.state;

    const singleMode = cw < 815;
    const listWidth = singleMode ? Math.min(cw, 760) : Math.min(360, (cw - 5) * 0.32);
    const talkWidth = singleMode ? Math.min(cw, 760) : Math.min(760, cw - 5 - listWidth);

    return (
      <T.WholeBox>
        <T.HStack>

          { (!singleMode || pageMode === 'list') &&
            <T.VStack width={`${listWidth}px`}>
              <T.Header bgColor={boxClr[0]}>Talk List</T.Header>
              <T.Container bgColor={boxClr[0]}>
                <TalkList cw={listWidth} />
              </T.Container>
            </T.VStack>
          }

          { !singleMode && <T.Box width={5}>&nbsp;</T.Box> }

          { (!singleMode || pageMode === 'talk') &&
            <T.VStack width={`${talkWidth}px`}>
              <T.Header bgColor={boxClr[1]}>Talk Detail</T.Header>
              <T.Container bgColor={boxClr[1]}>
                <TalkBoard />
              </T.Container>
            </T.VStack>
          }

        </T.HStack>
      </T.WholeBox>
    );
  }

};

export default MainFrame;
