import React, { Component } from 'react';

import styled from 'styled-components';
import { Dark as TM } from '../common/theme';

import { isundef, makeid, isValidString } from '../common/common';

import SendOutlinedIcon from '@mui/icons-material/SendOutlined';



const btnSize = '32px';
const fntSize = '16px'; // must be btnSize / 2

const WrappedBox = styled.div`
  border-top: 1px ${TM.inputSepLineColor} solid;
  min-height: calc(${fntSize} + 10px + 1px);
  max-height: calc(${fntSize} * 2 + 10px + 1px);
  overflow: hidden;
  display: flex;
  justify-content: center;
`;

const TextArea = styled.textarea`
  padding: 5px;
  resize: none;
  border: none;
  flex: 1 1;
  box-sizing: border-box;
  outline: none;
  background-color: ${TM.inputBoxBGColor};
  color: ${TM.fontColor};
  font-size: ${fntSize};
  min-height: calc(${fntSize} + 10px);
  max-height: calc(${fntSize} * 2 + 10px);

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SendButton = styled.div`
  width: ${btnSize};
  min-height: ${btnSize};
  height: 100%;
  box-sizing: border-box;
  border: 1px solid ${TM.sendButtonBGColor};
  color: ${TM.sendButtonBGColor};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    border: 1px solid #fff;
    color: #fff;
  }
`;


class TalkInput extends Component {
  constructor (props) {
    super(props);

    const { cw } = this.props;

    this.state = {
      textAreaID: 'talk-input-' + makeid(8),
      cw,
      talkText: '',
      maxRow: 1,
    };

    this._refText = React.createRef();
  }

  componentDidMount () {
    document.addEventListener('paste', this.handlePaste);
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

  setTalkText = (val) => {
    const elem = this._refText.current;
    const multiLines = val !== '' && (elem.scrollHeight > elem.clientHeight || val.indexOf('\n') !== -1);

    // console.log('setTalkText', val, elem.scrollHeight, elem.clientHeight);
    this.setState({ talkText: val, maxRow: (multiLines ? 2 : 1) });
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

  addText2Talk = (text) => {
    if( !isValidString(text) ) {
      return;
    }

    console.log('handleAddTalk', text);

    // TODO add text
    this.setState({ talkText: '', maxRow: 1 });
  }

  handleAddTalk = () => {
    const { talkText } = this.state;

    this.addText2Talk(talkText);
  }

  handleTextChanged = (ev) => {
    // console.log('TextChanged', ev.target.innerHTML);
    this.setTalkText(ev.target.value);
  }

  handleKeyDown = (ev) => {
    const { talkText } = this.state;
    
    // const { altKey, shiftKey, ctrlKey, keyCode } = ev;
    const { shiftKey, keyCode } = ev;

    let processed = false;
    if( shiftKey && keyCode === 13 ) {
      this.addText2Talk(talkText);
      processed = true;
    }

    if( processed ) {
      ev.preventDefault();
      ev.stopPropagation();
    }
  }

  render () {
    const { textAreaID, talkText, maxRow } = this.state;

    return (
      <WrappedBox style={{ outline: 'none' }}>
        <TextArea
          ref={this._refText}
          id={textAreaID}
          rows={maxRow}
          value={talkText}
          onChange={this.handleTextChanged}
          onKeyDown={this.handleKeyDown}
        />
        <SendButton onClick={this.handleAddTalk}><SendOutlinedIcon sx={{ fontSize: 20 }} /></SendButton>
      </WrappedBox>
    );
  }

};

export default TalkInput;
