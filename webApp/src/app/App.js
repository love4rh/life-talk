import React, { Component } from 'react';

import styled from 'styled-components';
import { isundef, isvalid } from '../common/common';

import { AppData } from './AppData';
import { getInitialData } from '../view/actions';

import Proxy from './ServerProxy';

import { Snackbar, Alert, Slide, CircularProgress } from '@mui/material';
import { SimpleDialog } from '../component/SimpleDialog';

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


// 유일 App 객체
let _appInstance_ = null;


class App extends Component {
  constructor (props) {
    super(props);

    // const pageUrl = window.location.href;
    // const adminMode = pageUrl.endsWith('/admin');

    const appData = new AppData(getInitialData());

    this.state = {
      appData,
      cw: window.innerWidth,
      ch: window.innerHeight,
      initialized: true,
      waiting: false,
      authorized: true,
      severity: 'info', // error warning success
      duration: 3500,
      message: null,
      simpleMenu: null,
    };

    this._appRect = React.createRef();

    Proxy.setWaitHandle(this.enterWaiting, this.leaveWaiting);
  }

  componentDidMount () {
    if( _appInstance_ === null ) {
      _appInstance_ = this;
    }

    this.state.appData.connect(this);
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize = () => {
    if( this._appRect.current ){
      const { clientWidth, clientHeight } = this._appRect.current;
      this.setState({ cw: clientWidth, ch: clientHeight });
    } else {
      this.setState({ cw: window.innerWidth, ch: window.innerHeight });
    }
  }

  /**
   * show instant message
   * @param {string} message message to be shown
   * @param {string} severity one of [info error warning success]. default: info
   * @param {number} duration showing time in ms. default: 3500
   */
  showToast = ({ message, severity, duration }) => {
    if( isundef(severity) ) {
      severity = 'info';
    }
    if( isundef(duration) ) {
      duration = 3500;
    }

    console.log('App showToast called', message, severity, duration);

    this.setState({ message, severity, duration });
  }

  showSimpleMenu = ({ title, itemList, callback }) => {
    this.setState({ simpleMenu: {title, itemList, callback} });
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
  }

  handleMenuSelected = (selectedIdx) => {
    const { simpleMenu } = this.state;
    const { callback } = simpleMenu;

    if( callback ) {
      callback(selectedIdx);
    }

    this.setState({ simpleMenu: null });
  }

  renderPage () {
    const { cw, ch } = this.state;
    return <MainFrame cw={cw} ch={ch} />;
  }

  render () {
    const { initialized, authorized, waiting, message, severity, duration, simpleMenu } = this.state;
    
    const messageOn = isvalid(message);
    const menuOn = isvalid(simpleMenu);

    // Snackbar severity="success" error warning info 

    return (<T.App ref={this._appRect}>
      <ThemeProvider theme={darkTheme}>
        { initialized
            ? this.renderPage()
            : <T.WholeMessage>Initializing...</T.WholeMessage>
        }

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

        { menuOn &&
          <SimpleDialog
            title={simpleMenu.title}
            itemList={simpleMenu.itemList}
            onClose={this.handleMenuSelected}
            open={menuOn}
          />
        }

        { authorized && waiting && <T.Overay><CircularProgress /></T.Overay> }
       </ThemeProvider>
    </T.App>);
  }
}


/**
   * 
   * @param {string} message message to be shown
   * @param {string} severity one of [info error warning success]. default: info
   * @param {number} duration showing time in ms. default: 3500
   */
export const showToast = ({ message, severity, duration }) => {
  if( _appInstance_ === null ) {
    return;
  }

  _appInstance_.showToast({ message, severity, duration });
}


export const showModalMenu = ({ title, itemList, callback }) => {
  if( _appInstance_ === null ) {
    return;
  }

  _appInstance_.showSimpleMenu({ title, itemList, callback });
}


export default App;
export { App };