import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import * as T from './StyledElements';

import { Dark as TM } from '../app/theme';
import { isValidString } from '../common/common';

import { showToast } from '../app/App';
import { $L } from '../app/LangPack';

import { Header } from './Header';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';

import { actAddOrChangeTalkBoard, actGoBackToList } from './actions';

import TextField from '@mui/material/TextField';
import ColorPicker from '../component/ColorPicker';


const EditLine = styled.div`
  margin: 10px 10px 20px 10px;
`;

const EditTitle = styled.div`
  color: ${TM.talkEditTitleColor};
  margin-bottom: 7px;
`;



class TalkEditor extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired, // talk board index for editing. -1이면 신규 보드 추가
    data: PropTypes.object.isRequired, // talk board object for editing. There must be title, color.
    cw: PropTypes.number.isRequired, // component width
  }

  constructor (props) {
    super(props);

    const { index, cw, data } = this.props;

    this.state = {
      index,
      cw,
      title: data.title,
      color: data.color
    };
  }

  static getDerivedStateFromProps(props, prevState) {
    const { cw } = props;

    if( prevState.cw !== cw ) {
      return { cw };
    }

    return null;
  }

  handleConfirm = () => {
    const { index, title, color } = this.state;

    const cTitle = title.trim();

    if( !isValidString(cTitle) ) {
      showToast($L('Talk Board shoud have Title.'), 'warning');
      return;
    }

    actAddOrChangeTalkBoard(index, cTitle, color);
    actGoBackToList();
  }

  handleChangeTitle = (ev) => {
    const me = ev.target;

    this.setState({ title: me.value });
  }

  handleColorChanged = (color) => {
    this.setState({ color });
  }

  render () {
    const { index, cw, title, color } = this.state;

    return (<>
      <Header
        ch={TM.headerHeight}
        cw={cw}
        color={TM.titleColor}
        bgColor={TM.listPanelColor}
        borderColor={TM.bgScreen}
        center={true}
        headButton={{ onClick: actGoBackToList, element: <ArrowBackIcon size="medium" /> }}
        tailButton={{ onClick: this.handleConfirm, element: <CheckIcon size="medium" /> }}
      >
        { index === -1 ? $L('Add Talk') : $L('Edit Talk') }
      </Header>

      <T.Container bgColor={TM.listPanelColor}>
        <EditLine>
          <EditTitle>{ $L('Talk Title') }</EditTitle>
          <TextField
            required
            fullWidth
            label=""
            placeholder={$L('enter title.')}
            value={title}
            variant="standard"
            onChange={this.handleChangeTitle}
          />
        </EditLine>

        <EditLine>
          <EditTitle>{ $L('Marker Color') }</EditTitle>
          <ColorPicker cw={cw - 20} color={color} onChanged={this.handleColorChanged} />
        </EditLine>
      </T.Container>
    </>);
  }

};

export default TalkEditor;
export { TalkEditor };
