import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { AppComponent } from '../app/AppData';
import { actChangeBoard, actEditBoard } from '../view/actions';

import { humanTime, tickCount } from '../common/common';

import { Dark as TM } from '../common/theme';
import * as T from './StyledElements';

import ImageMarker from '../component/ImageMarker';

// import { showModalMenu } from '../app/App';



const TalkListItem = (props) => {
  const { cw, data, idx, selected, ...rest } = props;
  const { title, color, time, lastTalk } = data;

  const [ downTick, setDownTick ] = useState(0);

  const handleClick = () => {
    actChangeBoard(idx);
  }

  const handleMouseDown = (ev) => {
    setDownTick( tickCount() );
  }

  const handleMouseUp = (ev) => {
    const pressTime = tickCount() - downTick;

    if( pressTime > 350 ) {
      ev.preventDefault();
      ev.stopPropagation();

      actEditBoard(idx);

      /*
      showModalMenu({
        title,
        itemList: [ 'Modify the Talk', 'Delete the Talk'],
        callback: (si) => {
          console.log(`${si} selected.`);
        }
      }); // */
    }
  }

  return (
    <T.ListBoxItem
      selected={selected}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      {...rest}
    >
      <T.ListBoxIcon>
        <ImageMarker size={TM.listItemHeight - 16} title={title} color={color} />
      </T.ListBoxIcon>
      <T.ListBoxBody width={cw - TM.listItemHeight - 30}>
        <T.ListTitleLine>
          <T.ListBoxTitle>{title}</T.ListBoxTitle>
          <T.ListBoxTime>{humanTime(time)}</T.ListBoxTime>
        </T.ListTitleLine>
        <T.ListBoxMessage>{lastTalk}</T.ListBoxMessage>
      </T.ListBoxBody>
      
    </T.ListBoxItem>
  );
}


class TalkList extends AppComponent {
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

  renderComp () {
    const { cw, talkList, curTalkIndex } = this.state;

    return (
      <T.ListBox key={`tl-${curTalkIndex}`}>
        { talkList && talkList.map((d, idx) => (<TalkListItem key={`talkList-${idx}`} idx={idx} selected={idx === curTalkIndex} data={d} cw={cw} />))}
      </T.ListBox>
    );
  }

};

export default TalkList;
