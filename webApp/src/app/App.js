import React, { Component } from 'react';

import './App.scss';

import { isundef, isvalid } from '../common/common';

import Proxy from './ServerProxy';

import { AppData } from './AppData';

import { Snackbar, Alert, Slide, CircularProgress } from '@mui/material';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { koKR } from '@mui/material/locale';

import MainFrame from '../view/MainFrame';


const darkTheme = createTheme(
  {
    palette: {
      mode: 'dark', // light
    },
  },
  koKR, // https://mui.com/material-ui/guides/localization/
);


console.log(darkTheme);


class App extends Component {
  constructor (props) {
    super(props);

    // const pageUrl = window.location.href;
    // const adminMode = pageUrl.endsWith('/admin');

    this.state = {
      initialized: true,
      waiting: false,
      appData: new AppData(this),
      authorized: true,
      severity: 'info', // error warning success
      duration: 3500,
      message: null
    };

    Proxy.setWaitHandle(this.enterWaiting, this.leaveWaiting);
  }

  componentDidMount () {
    // TODO Intialize Code
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
    return <MainFrame />;
  }

  render () {
    const { initialized, authorized, waiting, message, severity, duration } = this.state;
    const messageOn = isvalid(message);

    // Snackbar severity="success" error warning info 

    return (<div className="App">
      <ThemeProvider theme={darkTheme}>
        { initialized ? this.renderPage() : <div className="App-whole-message">Initializing...</div> }

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

        { authorized && waiting && <div className="App-overay"><CircularProgress /></div> }
       </ThemeProvider>
    </div>);
  }
}

export default App;
