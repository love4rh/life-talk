import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import * as T from './StyledElements';

import { Dark as TM } from '../common/theme';

import { Header } from './Header';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';

import { actGoBackToList } from './actions';

import TextField from '@mui/material/TextField';


const EditBody = styled.div`
  padding: 10px;
`;



class TalkEditor extends React.Component {
  static propTypes = {
    // full screen or dialog
    index: PropTypes.number.isRequired, // talk board index for editing
    board: PropTypes.object.isRequired, // talk board object for editing
    cw: PropTypes.number.isRequired, // component width
  }

  constructor (props) {
    super(props);

    const { cw, board } = this.props;

    this.state = {
      cw,
      title: board.title
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
    // TODO update changes

    actGoBackToList();
  }

  handleChangeTitle = (ev) => {
    const me = ev.target;

    this.setState({ title: me.value });
  }

  render () {
    const { cw, title } = this.state;

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
        {'Edit Talk'}
      </Header>

      <T.Container bgColor={TM.listPanelColor}>
        <EditBody>
          <TextField
            required
            fullWidth
            label="Talk Title"
            value={title}
            variant="standard"
            onChange={this.handleChangeTitle}
          />
        </EditBody>
      </T.Container>
    </>);
  }

};

export default TalkEditor;
export { TalkEditor };
