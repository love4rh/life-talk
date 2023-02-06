import React, { Component } from 'react';

import styled from 'styled-components';
import { Dark as Theme } from '../common/theme';

import { talkList } from '../mock/sample01';

import TextField from '@mui/material/TextField';


// InputBox
const WrappedBox = styled.div`
  border: 1px #999 solid;
  margin: 2px 0;
`;


class TalkInput extends Component {
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
    return (
      <WrappedBox>
        <TextField
          hiddenLabel
          fullWidth
          multiline
          maxRows={2}
          size="small"
        />
      </WrappedBox>
    );
  }

};

export default TalkInput;
