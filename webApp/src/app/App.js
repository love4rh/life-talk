import React, { Component } from 'react';

import styled from 'styled-components';
import { isundef, isvalid } from '../common/common';

import { AppData } from './AppData';

import Proxy from './ServerProxy';

import { Snackbar, Alert, Slide, CircularProgress } from '@mui/material';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { koKR } from '@mui/material/locale';

import MainFrame from '../view/MainFrame';

import { talkList } from '../mock/sample01';



const darkTheme = createTheme(
  {
    palette: {
      mode: 'dark', // light
    },
  },
  koKR, // https://mui.com/material-ui/guides/localization/
);


const T = {
  App: styled.div`
    margin: 0;
    padding: 0;
  `,

  Overay: styled.div`
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100vw;
    height: 100vh;
    z-index: 99999;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: progress;
  `,

  WholeMessage: styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    color: blue;
  `
};



class App extends Component {
  constructor (props) {
    super(props);

    // const pageUrl = window.location.href;
    // const adminMode = pageUrl.endsWith('/admin');

    const appData = new AppData(this,
      {
        talkList: talkList,
        currentBoardID: talkList[0].id,
      }
    );

    this.state = {
      appData,
      cw: window.innerWidth,
      ch: window.innerHeight,
      initialized: true,
      waiting: false,
      authorized: true,
      severity: 'info', // error warning success
      duration: 3500,
      message: null
    };

    Proxy.setWaitHandle(this.enterWaiting, this.leaveWaiting);
  }

  componentDidMount () {
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize = () => {
    this.setState({ cw: window.innerWidth, ch: window.innerHeight });
  }

  /**
   * 
   * @param {string} msg message to be shown
   * @param {string} severity one of [info error warning success]. default: info
   * @param {number} duration showing time in ms. default: 3500
   */
  showInstantMessage = (msg, severity, duration) => {
    if( isundef(severity) ) {
      severity = 'info';
    }
    if( isundef(duration) ) {
      duration = 3500;
    }

    this.setState({ message: msg, severity, duration });
  }

  enterWaiting = () => {
    this.setState({ waiting: true });
  }

  leaveWaiting = () => {
    this.setState({ waiting: false });
  }

  handleChange = (ev) => {
    this.setState({ viewNo: Number(ev.target.value) });
  }

  // eslint-disable-next-line
  handleCloseSnackbar = (ev, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ message: null });
  };

  renderPage () {
    const { cw, ch } = this.state;

    return <MainFrame cw={cw} ch={ch} />;
  }

  render () {
    const { initialized, authorized, waiting, message, severity, duration } = this.state;
    const messageOn = isvalid(message);

    // Snackbar severity="success" error warning info 

    return (<T.App>
      <ThemeProvider theme={darkTheme}>
        { initialized ? this.renderPage() : <T.WholeMessage>Initializing...</T.WholeMessage> }

        { messageOn && 
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={messageOn}
            onClose={this.handleCloseSnackbar}
            autoHideDuration={duration}
            TransitionComponent={(props) => <Slide {...props} direction="up" />}
          >
            <Alert elevation={6} variant="filled" onClose={this.handleCloseSnackbar} severity={severity} sx={{ width: '100%' }}>{message}</Alert>
          </Snackbar>
        }

        { authorized && waiting && <T.Overay><CircularProgress /></T.Overay> }
       </ThemeProvider>
    </T.App>);
  }
}

export default App;
