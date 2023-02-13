import React, { Component } from 'react';

import { isundef, makeid } from '../common/common';

import parse from 'html-react-parser';

import styled from 'styled-components';
import { Dark as T } from '../common/theme';



const WrappedBox = styled.div`
  border: 1px #999 solid;
  margin: 2px 0;
  padding: 5px;
  min-height: calc(1rem + 6px);
  max-height: calc(2rem + 14px);
  overflow: hidden;
`;

const TextArea = styled.div`
  resize: none;
  border: none;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  background-color: ${T.talkPanelColor};
  color: ${T.fontColor};
  font-size: 1rem;
  min-height: calc(1rem + 6px);
  max-height: calc(2rem + 10px);
  overflow-y: auto;
  overflow-x: hidden;
`;


class TalkInput extends Component {
  constructor (props) {
    super(props);

    const { cw } = this.props;

    this.state = {
      textAreaID: 'talk-input-' + makeid(8),
      cw,
      talkText: '',
    };
  }

  componentDidMount () {
    // document.addEventListener('paste', this.handlePaste);
  }

  componentWillUnmount () {
    // document.removeEventListener('paste', this.handlePaste);
  }

  static getDerivedStateFromProps(props, prevState) {
    const { cw } = props;

    if( prevState.cw !== cw ) {
      return { cw };
    }

    return null;
  }

  setTalkText = (val) => {
    console.log('setTalkText', val);

    this.setState({ talkText: val });
  }

  handlePaste = (ev) => {
    const { textAreaID } = this.state;
    const item = ev.clipboardData.items[0];

    if( isundef(item) ) {
      return;
    }

    console.log('on paste', ev.target, item);

    // item.kind: string, file, 
    const dtype = item.type;

    let processed = true;

    if( dtype.indexOf('image') === 0 ) {
      const blob = item.getAsFile();
      console.log(blob);

      const reader = new FileReader();
      reader.onload = (event) => {
        console.log(event.target.result);
        // document.getElementById("container").src = event.target.result;
      };

      reader.readAsDataURL(blob); // image blob to base64 encoded string
    } else if( dtype.indexOf('text') === 0 && textAreaID !== ev.target.id ) {
      item.getAsString((data) => {
        const { talkText } = this.state;
        this.setTalkText(talkText + data);
      });
    } else {
      processed = false;
    }

    if( processed ) {
      ev.preventDefault();
      ev.stopPropagation();
    }
  }

  handleTextInput = (ev) => {
    // console.log('TextChanged', ev.target.innerHTML);
    this.setTalkText(ev.target.innerHTML);
  }

  render () {
    const { textAreaID, talkText } = this.state;

    return (
      <WrappedBox style={{ outline: 'none' }}>
        <TextArea id={textAreaID} contentEditable={true} suppressContentEditableWarning={true} onInput={this.handleTextInput}>
          { parse(talkText) }
        </TextArea>
      </WrappedBox>
    );
  }

};

export default TalkInput;
