import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connectAppData, updateAppData } from '../app/AppData';

import { humanTime, isundef } from '../common/common';

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
    document.addEventListener('paste', this.handlePaste);
    connectAppData(this);
  }

  componentWillUnmount () {
    document.removeEventListener('paste', this.handlePaste);
  }

  static getDerivedStateFromProps(props, prevState) {
    const { cw } = props;

    if( prevState.cw !== cw ) {
      return { cw };
    }

    return null;
  }

  handlePaste = (ev) => {
    const item = ev.clipboardData.items[0];

    if( isundef(item) ) {
      return;
    }

    console.log('on paste', item);

    // item.kind: string, file, 
    const dtype = item.type;

    if( dtype.indexOf('image') === 0 ) {
      const blob = item.getAsFile();
      console.log(blob);

      const reader = new FileReader();
      reader.onload = (event) => {
        console.log(event.target.result);
        // document.getElementById("container").src = event.target.result;
      };

      reader.readAsDataURL(blob); // image blob to base64 encoded string
    } else if( dtype.indexOf('text') === 0 ) {
      item.getAsString((data) => {
        console.log('text:', data);
      });
    }
  }

  handleClick = (itemId) => () => {
    updateAppData('currentBoardID', itemId);
  }

  render () {
    const { cw, talkList, currentBoardID } = this.state;

    return (
      <T.ListBox key={`tl-${currentBoardID}`}>
        { talkList && talkList.map((d, i) => (
          <T.ListBoxItem
            key={`talkList-${i}`}
            selected={d.id === currentBoardID}
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
