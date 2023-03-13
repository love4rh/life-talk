import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import * as T from './StyledElements';

import { isvalid } from '../common/common';
import { Dark as TM } from '../common/theme';

import { Header } from './Header';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';

import { actGoBackToList } from './actions';


const EditBody = styled.div`
  background-color: ${TM.listPanelColor};
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

    const { cw } = this.props;

    this.state = {
      cw 
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

  render () {
    const { cw } = this.state;

    return (
      <div>
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
          Implementing...
        </T.Container>

      </div>
    );
  }

};

export default TalkEditor;
export { TalkEditor };
