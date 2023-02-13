import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { hhmm } from '../common/common';

import styled from 'styled-components';
import { Dark as Theme } from '../common/theme';

import parse from 'html-react-parser';


// Styled Component for TalkBox
const WrappedBox = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: row;
`;

const TalkText = styled.div`
  background-color: ${Theme.talkBoxBgColor};
  border-radius: 5px;
  padding: 10px;
  flex-grow: ${({ fullWidth }) => fullWidth ? 1 : 0};
  white-space: pre-wrap;
  word-break: break-word;
`;

const TalkTime = styled.div`
  margin-left: 7px;
  color: ${Theme.talkTimeColor};
  font-size: 0.9rem;
`;



/**
 * Talk Item 하나를 표시하기 위한 콤포넌트
 */
class TalkBox extends Component {
  static propTypes = {
    talk: PropTypes.object.isRequired,
  }

  constructor (props) {
    super(props);
  }

  render () {
    const { talk } = this.props;
    const { text, time } = talk;

    return (
      <WrappedBox>
        <TalkText fullWidth={false}>{ parse(text) }</TalkText>
        <TalkTime>{ hhmm(time) }</TalkTime>
      </WrappedBox>
    );
  }

};

export default TalkBox;
