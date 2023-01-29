import React, { Component } from 'react';

import * as T from './StyledElements';


class TalkBoard extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const msg = 'I want..\nThis would be a nice talking board.';

    return (
      <T.TalkBoard>

        <T.TalkBox>
          <T.TalkText fullWidth={false}>{msg}</T.TalkText>
          <T.TalkTime>12:22</T.TalkTime>
        </T.TalkBox>
        <svg height="24" width="98%" style={{ margin: '0 1%' }}>
          <line x1="0" y1="12" x2="100%" y2="12" style={{ stroke:'rgb(255,0,0)', strokeWidth: 1 }} />
        </svg>

      </T.TalkBoard>
    );
  }

};

export default TalkBoard;
