import React, { Component } from 'react';

import * as T from './StyledElements';


class TalkBoard extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <T.TalkBox>

        <T.TalkBoard>
          blah~

          <svg height="24" width="98%" style={{ margin: '0 1%' }}>
            <line x1="0" y1="12" x2="100%" y2="12" style={{ stroke:'rgb(255,0,0)', strokeWidth: 1 }} />
          </svg>
        </T.TalkBoard>
        
        <T.TalkInputBox>AAA</T.TalkInputBox>

      </T.TalkBox>
    );
  }

};

export default TalkBoard;
