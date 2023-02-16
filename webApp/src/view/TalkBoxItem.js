import React from 'react';

import { hhmm } from '../common/common';

import styled from 'styled-components';
import { Dark as TM } from '../common/theme';



///////////////////////////////////////////////////////////////////////////////////////////////////
// Normal TalkBox

const WrappedBox = styled.div`
  margin: 12px;
  display: flex;
  flex-direction: row;
`;

const TalkText = styled.div`
  background-color: ${TM.talkBoxBgColor};
  border-radius: 5px;
  padding: 10px;
  flex-grow: ${({ fullWidth }) => fullWidth ? 1 : 0};
  white-space: pre-wrap;
  word-break: break-word;
`;

const TalkTime = styled.div`
  margin-left: 7px;
  color: ${TM.talkTimeColor};
  font-size: 0.9rem;
`;


export const TalkBox = (props) => {
  const { talk } = props;
  const { text, time } = talk;

  return (
    <WrappedBox>
      <TalkText fullWidth={false}>{ text }</TalkText>
      <TalkTime>{ hhmm(time) }</TalkTime>
    </WrappedBox>
  );
}


///////////////////////////////////////////////////////////////////////////////////////////////////
// Separator Line

const ShadowText = styled.text`
  stroke: ${TM.talkPanelColor};
  stroke-width: 0.6em;
`;

const Text = styled.text`
  fill: ${TM.separatorFontColor};
`;

export const TalkSeparator = (props) => {
  const { text } = props;

  return (
    <div style={{ margin:'0 10px' }}>
      <svg height="24" width="100%">
        <line x1="0" y1="12" x2="100%" y2="12" style={{ stroke:`${TM.separatorLineColor}`, strokeWidth: 1 }} />
        <ShadowText x="50%" y="50%" alignmentBaseline="middle" textAnchor="middle">{text}</ShadowText>
        <Text x="50%" y="50%" alignmentBaseline="middle" textAnchor="middle">{text}</Text>
      </svg>
    </div>
  );
}

export default TalkBox;
