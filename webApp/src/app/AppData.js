// eslint-disable-next-line
import { dateToYYYYMMDDBySep, isIn, istrue, tickCount, isvalid, isundef } from '../common/common.js';

import Proxy from './ServerProxy';


class AppData {
  constructor (appObj) {
    this._storageKey = 'vadarbase-option';
    this._app = appObj;
    this._observer = []; // AppData의 이벤트를 받을 객체 리스트
  }

  initializeData = (cb) => {
    this._updatedTick = tickCount();

    this._settings = {
      startDate: '',
      endDate: '',
      cp: 'tubi'
    };

    const optData = localStorage.getItem(this._storageKey);
    if( isvalid(optData) ) {
      const dataObj = JSON.parse(optData);

      this._settings = { ...this._settings, ...dataObj.settings };
    }

    console.log('appData Settings', this._settings);

    if( window.$appConfig$.debugOn ) {
      this._resultStat = {};
      if( cb ) {
        cb(true);
      }
    } else {
      const now = tickCount() - 1 * 24 * 3600 * 1000;
      const prev = now; // - 7 * 24 * 3600 * 1000;

      this.fetchStat(dateToYYYYMMDDBySep(new Date(prev), '-'), dateToYYYYMMDDBySep(new Date(now), '-'), 'EST', (isOK) => {
        if( cb ) {
          cb(true);
        }
      });
    }
  }

  saveOptions = () => {
    localStorage.setItem(this._storageKey, JSON.stringify({
      settings: this._settings,
    }));
  }

  unmount = () => {
    // unmount 시 해야 할 일들
    this.saveOptions();
    this._observer = [];
  }

  addObserver = (elem) => {
    if( isIn(elem, this._observer) ) {
      return;
    }

    if( 'onAppDataEvent' in elem ) {
      this._observer.push(elem);
    } else {
      console.log('observer must have onAppDataEvent handler.', elem);
    }
  }

  removeObserver = (elem) => {
    const ol = this._observer;
    const nl = [];

    for(var i = 0; i < ol.length; ++i) {
      if( ol[i] !== elem ) {
        nl.push(ol[i]);
      }
    }

    this._observer = nl;
  }

  pulseEventToObserver = (eventId, option) => {
    const ol = this._observer;
    if( isundef(option) ) {
      option = {};
    }

    option.tick = this.updatedTick(true);

    for(var i = 0; i < ol.length; ++i) {
      ol[i].onAppDataEvent(eventId, option);
    }
  }

  updatedTick = (refresh) => {
    if( istrue(refresh) ) {
      this._updatedTick = tickCount();
    }

    return this._updatedTick;
  }

  showInstantMessage = (msg, severity, duration) => {
    this._app.showInstantMessage(msg, severity, duration);
  }

  /**
   * 이벤트를 받아 Observer에 전달하는 기능 수행.
   * @param {string} evtType 발생한 이벤트를 구분하기 위한 문자열
   * @param {object} option 이벤트 관련 정보 객체. 이벤트에 따라 달라짐. event 멤버에 UI 상에서 발생한 이벤트 객체가 보통 넘어옮.
   */
   triggerEvent = (evtType, option) => {
    switch( evtType ) {
      case 'canvasClick':
        case 'linkClick':
        this.pulseEventToObserver(evtType, {});
        break;

      default:
        break;
    }
  }

  getStatResult = () => {
    return this._resultStat;
  }

  fetchStat = (sDate, eDate, timeZone, cb) => {
    Proxy.fetch({
      path: '/get',
      waiting: false,
      timeout: 10000,
      data: { sDate, eDate, timeZone },
      success: (res) => {
        if( res && res.returnCode === 0 && res.response ) {
          this._resultStat = res.response;
          if( cb ) cb(true, this._resultStat);
        } else {
          // TODO
          if( cb ) cb(false, {});
        }
      },
      error: (err) => {
        if( cb ) cb(false, err);
      }
    });
  }

  download = (sDate, eDate, timeZone, cb) => {
    Proxy.download({
      path: '/download',
      waiting: false,
      timeout: 10000,
      data: { sDate, eDate, timeZone },
      success: (res) => {
          if( cb ) cb(true);
      },
      error: (err) => {
        if( cb ) cb(false);
      }
    });
  }
};

export default AppData;
export { AppData };
