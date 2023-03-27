import axios from 'axios';

import { makeidWithChecksum, tickCount, SHA256, isundef } from './common.js';

let { hostURL, debugOn } = window.$appConfig$;

// hostURL = decryptURL(hostURL);

const _userToken = makeidWithChecksum(8);


// 기본 헤더값 생성
const _makeHeader = () => {
  const tick = '' + tickCount();
  return {
    'Content-Type': 'application/json;charset=utf-8',
    'x-user-token': _userToken,
    'x-timestamp': tick,
    'x-auth-code': SHA256(tick + _userToken + tick)
  };
};


const SC = {
  _handleWait: null,
  _handleDone: null,

  _lastStatus: { host: '', procTime: 0 },

  setWaitHandle: (waiting, done) => {
    SC._handleWait = waiting;
    SC._handleDone = done;
  },

  enterWaiting: () => {
    if( SC._handleWait ) {
      SC._handleWait()
    }
  },

  leaveWaiting: () => {
    if( SC._handleDone ) {
      SC._handleDone()
    }
  },

  getLastStatus: () => {
    return SC._lastStatus;
  },

  _post: (waiting, path, data, timeout, cbOk, cbErr) => {
    if( waiting ) {
      SC.enterWaiting();
    }

    axios({
      baseURL: hostURL,
      url: path,
      method: 'post',
      timeout: timeout,
      headers: _makeHeader(),
      data: data
    }).then(res => {
      if( debugOn ) console.log('[RES]', res);
      if( waiting ) { SC.leaveWaiting(); }
      if( cbOk ) { cbOk(typeof res.data === 'string' ? JSON.parse(res.data) : res.data); }
    }).catch(err => {
      if( debugOn ) console.log('[ERR]', path, err);
      if( waiting ) { SC.leaveWaiting(); }
      if( cbErr ) { cbErr(err); }
    });
  },

  fetch: ({ path, data, success, error, waiting, timeout }) => {
    if( isundef(waiting) ) waiting = true;
    if( isundef(timeout) ) timeout = 5000;
    if( isundef(data) ) data = {};

    SC._post(waiting, path, data, timeout, success, error);
  },

  download: ({ waiting, path, data, timeout, cb }) => {
    if( isundef(waiting) ) waiting = true;
    if( isundef(timeout) ) timeout = 24000;
    if( isundef(data) ) data = {};

    if( waiting ) {
      SC.enterWaiting();
    }

    axios({
      baseURL: hostURL,
      url: path,
      method: 'post',
      responseType: 'blob',
      timeout: timeout,
      headers: _makeHeader(),
      data: data
    }).then(res => {
      if( waiting ) { SC.leaveWaiting(); }

      // create file link in browser's memory
      const href = URL.createObjectURL(res.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', 'stat-' + tickCount() + '.xlsx'); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);

      if( cb ) cb(true);
    }).catch(err => {
      if( debugOn ) console.log('[ERR]', path, err);
      if( waiting ) { SC.leaveWaiting(); }
      if( cb ) cb(true);
    });
  }
};

export default SC;
export { SC };
