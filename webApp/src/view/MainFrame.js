import React from 'react';
import PropTypes from 'prop-types';

import { AppComponent } from '../app/AppData';
import { actGoBackToList, actAddNewBoard } from './actions';

import { Dark as TM, getRandomColor } from '../common/theme';

import * as T from './StyledElements';

import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Header from './Header';

import TalkList from './TalkList';
import TalkEditor from './TalkEditor';
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

  handleAddTalkBoard = () => {
    actAddNewBoard('Untitled', getRandomColor());
  }

  renderComp () {
    const { curBoard, curTalkIndex, updatedTick, pageMode, cw } = this.state;

    const singleMode = cw < 815;
    const listWidth = singleMode ? Math.min(cw, 760) : Math.min(360, (cw - 5) * 0.32);
    const talkWidth = singleMode ? Math.min(cw, 760) : Math.min(760, cw - 5 - listWidth);

    return (
      <T.WholeBox key={`main-wrap-${updatedTick}`}>
        <T.HStack>
          { ((!singleMode && pageMode !== 'edit') || pageMode === 'list') &&
            <T.VStack width={`${listWidth}px`}>
              <Header
                ch={TM.headerHeight}
                cw={listWidth}
                color={TM.titleColor}
                bgColor={TM.listPanelColor}
                borderColor={TM.bgScreen}
                center={true}
                tailButton={{ onClick: this.handleAddTalkBoard, element: <AddIcon size="medium" /> }}
              >
                { 'Talk List' }
              </Header>

              <T.Container bgColor={TM.listPanelColor}>
                <TalkList cw={listWidth} />
              </T.Container>
            </T.VStack>
          }

          { pageMode === 'edit' &&
            <T.VStack width={`${listWidth}px`}>
              <TalkEditor cw={listWidth} index={curTalkIndex} data={curBoard} />
            </T.VStack>
          }

          { !singleMode && <T.Box width={5}>&nbsp;</T.Box> }

          { (!singleMode || pageMode === 'talk') &&
            <T.VStack width={`${talkWidth}px`}>
              { singleMode
                ? <Header
                    ch={TM.headerHeight}
                    cw={talkWidth}
                    color={TM.titleColor}
                    bgColor={TM.talkPanelColor}
                    borderColor={TM.bgScreen}
                    center={false}
                    headButton={{ onClick: actGoBackToList, element: <ArrowBackIcon size="medium" /> }}
                  >
                    {curBoard && curBoard.title}
                  </Header>
                : <Header
                    ch={TM.headerHeight}
                    cw={talkWidth}
                    color={TM.titleColor}
                    bgColor={TM.talkPanelColor}
                    borderColor={TM.bgScreen}
                    center={true}
                  >
                    {curBoard && curBoard.title}
                  </Header>
              }
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
