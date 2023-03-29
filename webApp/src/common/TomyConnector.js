/**
 * Simple WAS인 TomyServer와 통신하기 위한 함수 정의.
 * HTTP 통신 모듈은 axios를 이용하며, 인증을 위한 값 등을 처리하는 루틴이 추가되어 있음.
 * 접속할 호스트의 URL은 window.$appConfig$.hostURL로 설정해야 함.
 */
import axios from 'axios';

import { istrue, makeidWithChecksum, tickCount, SHA256, isundef } from './common.js';

let { hostURL, debugOn } = window.$appConfig$;

// hostURL = decryptURL(hostURL);

const _userToken = makeidWithChecksum(8);


// 기본 헤더값 생성
const _makeHeader_ = () => {
  const tick = '' + tickCount();
  return {
    'Content-Type': 'application/json;charset=utf-8',
    'x-user-token': _userToken,
    'x-timestamp': tick,
    'x-auth-code': SHA256(tick + _userToken + tick)
  };
};


const _handle_ = {};


/**
 * 작업 대기를 알리기 위한 핸들러 지정
 * @param {function} waitingCB 
 * @param {function} doneCB 
 */
export const setWaitingHandle = (waitingCB, doneCB) => {
  _handle_.waitCB = waitingCB;
  _handle_.doneCB = doneCB;
}


const _waitingToDone_ = () => {
  if( _handle_.waitCB ) {
    _handle_.waitCB();
  }
}


const _doneWaiting_ = () => {
  if( _handle_.doneCB ) {
    _handle_.doneCB();
  }
}


/**
 * 서버 호출을 위한 내부 함수. post만 지원함
 * @param {boolean} waiting 작업 대기 핸들러 호출 여부
 * @param {string} path 호출할 API 경로
 * @param {object} data Body
 * @param {number} timeout 접속 대기 시간 (in ms)
 * @param {function} cbOk 처리 성공 콜백
 * @param {function} cbErr 처리 실패용 콜백
 */
const _post_ = (waiting, path, data, timeout, cbOk, cbErr) => {
  if( istrue(waiting) ) {
    _waitingToDone_();
  }

  axios({
    baseURL: hostURL,
    url: path,
    method: 'post',
    timeout: timeout,
    headers: _makeHeader_(),
    data: data
  }).then(res => {
    if( debugOn ) console.log('[RES]', res);
    if( waiting ) { _doneWaiting_() }
    if( cbOk ) { cbOk(typeof res.data === 'string' ? JSON.parse(res.data) : res.data); }
  }).catch(err => {
    if( debugOn ) console.log('[ERR]', path, err);
    if( waiting ) { _doneWaiting_() }
    if( cbErr ) { cbErr(err); }
  });
}


/**
 * 서버 호출을 위한 오픈된 함수. post만 지원함.
 * 객체 형태로 파라미터를 받지만 객체 내 지정 값은 다음과 같음
 * @param {boolean} waiting 작업 대기 핸들러 호출 여부. 기본값 true
 * @param {string} path 호출할 API 경로
 * @param {object} data Body
 * @param {number} timeout 접속 대기 시간 (in ms). 기본값 5초
 * @param {function} success 처리 성공 콜백
 * @param {function} error 처리 실패용 콜백
 */
export const fetch = ({ path, data, success, error, waiting, timeout }) => {
  if( isundef(waiting) ) waiting = true;
  if( isundef(timeout) ) timeout = 5000;
  if( isundef(data) ) data = {};

  _post_(waiting, path, data, timeout, success, error);
}


/**
 * 파일 다운로드
 * @param {boolean} waiting 작업 대기 핸들러 호출 여부. 기본값 true
 * @param {string} path 호출할 API 경로
 * @param {object} data Body
 * @param {string} downloadFile 다운 받을 파일명. 유니크하게 생성하여 호출하길 권장함.
 * @param {number} timeout 접속 대기 시간 (in ms). 기본값 24초
 * @param {function} cb 처리 여부 반환용 콜백. 성공하면 cb(true), 실패하면 cb(false)로 호출
 */
export const download = ({ waiting, path, data, downloadFile, timeout, cb }) => {
  if( isundef(waiting) ) waiting = true;
  if( isundef(timeout) ) timeout = 24000;
  if( isundef(data) ) data = {};

  if( waiting ) {
    _waitingToDone_();
  }

  axios({
    baseURL: hostURL,
    url: path,
    method: 'post',
    responseType: 'blob',
    timeout: timeout,
    headers: _makeHeader_(),
    data: data
  }).then(res => {
    if( waiting ) { _doneWaiting_() }

    // create file link in browser's memory
    const href = URL.createObjectURL(res.data);

    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', downloadFile); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);

    if( cb ) cb(true);
  }).catch(err => {
    if( debugOn ) console.log('[ERR]', path, err);
    if( waiting ) { _doneWaiting_() }
    if( cb ) cb(true);
  });
}
