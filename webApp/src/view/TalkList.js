import React, { Component } from 'react';

import * as T from './StyledElements';

import ImageMarker from '../component/ImageMarker';


class TalkList extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <T.ListBox>
        <T.ListBoxItem>
          <T.ListBoxIcon><ImageMarker size={40} title={'일상'} /></T.ListBoxIcon>
          <T.ListBoxBody>
            <T.ListBoxTitle>Title</T.ListBoxTitle>
            <T.ListBoxMessage>Last message</T.ListBoxMessage>
          </T.ListBoxBody>
          <T.ListBoxTime>Time</T.ListBoxTime>
        </T.ListBoxItem>
      </T.ListBox>
    );
  }

};

export default TalkList;
