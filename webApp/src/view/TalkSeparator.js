import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Dark as T } from '../common/theme';


const ShadowText = styled.text`
  stroke: ${T.talkPanelColor};
  stroke-width: 0.6em;
`;

const Text = styled.text`
  fill: ${T.separatorFontColor};
`;


class TalkSeparator extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired, // separator title (Talk Date)
  }

  constructor (props) {
    super(props);

    const { text } = this.props;

    this.state = {
      text
    };
  }

  render () {
    const { text } = this.state;

    return (
      <div style={{ margin:'0 10px' }}>
        <svg height="24" width="100%">
          <line x1="0" y1="12" x2="100%" y2="12" style={{ stroke:`${T.separatorLineColor}`, strokeWidth: 1 }} />
          <ShadowText x="50%" y="50%" alignmentBaseline="middle" textAnchor="middle">{text}</ShadowText>
          <Text x="50%" y="50%" alignmentBaseline="middle" textAnchor="middle">{text}</Text>
        </svg>
      </div>
    );
  }

};

export default TalkSeparator;
