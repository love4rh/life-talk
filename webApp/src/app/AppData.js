import React from 'react';

// eslint-disable-next-line
import { makeid, istrue, tickCount, isvalid, isundef } from '../common/common.js';

// 대표 데이터 객체
let _globalAppData_ = null;



/**
 * Application Data Management Class
 */
class AppData {
  constructor (initialData) {
    if( isundef(_globalAppData_) ) {
      _globalAppData_ = this;
    }

    this._appDataID = makeid(16);

    this._observer = [];

    this.updatedTick = tickCount();
    this._data_ = initialData;
    // console.log('AppData constructed', this._data_);
  }

  unmount = () => {
    // unmount 시 해야 할 일들
    this._observer = [];
  }

  /**
   * App 데이터와 React Component를 연결하기 위한 메소드.
   * 생성자에서 호출하지 말고 componentDidMount()에서 호출해야 함.
   * @param {*} elem 연결할 React Component 객체.
   * @param {*} keys 연결할 데이터 키 목록. 지정하지 않으면 initial data로 설정한 모든 데이터를 연결함
   * @returns 
   */
  connect = (elem, keys) => {
    if( isvalid(elem._appDataObjectKey_) ) {
      console.log('appData connect', 'already registered', elem._appDataObjectKey_);
      return;
    }

    elem._appDataObjectKey_ = makeid(16);
    this._observer.push(elem);

    elem.setState({ updatedTick: this.updatedTick, ...this._data_ });

    if( !('_onAppDataEvent_' in elem) ) {
      elem._onAppDataEvent_ = (dataObj) => {
        elem.setState(dataObj);
      }
    }

    if( 'componentWillUnmount' in elem ) {
      const originalUnmount = elem.componentWillUnmount.bind(elem);
      elem.componentWillUnmount = () => {
        this.disconnect(elem);
        originalUnmount();
      }
    } else {
      elem.componentWillUnmount = () => {
        this.disconnect(elem);
      }
    }
    // console.log('appData connect', this._observer);
  }

  disconnect = (elem) => {
    delete elem._appDataObjectKey_;

    const ol = this._observer;
    const nl = [];

    for(var i = 0; i < ol.length; ++i) {
      if( ol[i] !== elem ) {
        nl.push(ol[i]);
      }
    }

    this._observer = nl;
    // console.log('appData disconnect', this._observer);
  }

  updateTick = (refresh) => {
    if( istrue(refresh) ) {
      this.updatedTick = tickCount();
    }

    return this.updatedTick;
  }

  pulseEventToObserver = (dataObj) => {
    if( isundef(dataObj) ) {
      dataObj = { updatedTick: this.updateTick(true) };
    }

    this._observer.map((obj, idx) => {
      obj._onAppDataEvent_(dataObj);
      return idx;
    })
  }
  
  getData = () => {
    return this._data_;
  }


  updateData = (dataObj) => {
    Object.keys(dataObj).map((k) => {
      this._data_[k] = dataObj[k];
      return k;
    });

    this.updateTick(true)
    this.pulseEventToObserver(dataObj);
  }
};



/**
 * React component binding to AppData.
 * componentDidMount() must have super.componentDidMount().
 * must use renderComp() instead of render()
 */
class AppComponent extends React.Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  componentDidMount () {
    connectAppData(this);
  }

  updateData = (dataKey, data) => {
    updateAppData({ [dataKey]: data });
  }

  renderComp () {
    return (<></>);
  }

  render () {
    const { updatedTick} = this.state;

    if( !updatedTick ) return null;

    return this.renderComp();
  }
};



export const setGlobalAppData = (obj) => {
  _globalAppData_ = obj;
}

export const getGlobalAppData = () => {
  return _globalAppData_;
}

export const connectAppData = (obj, keys) => {
  if( isundef(_globalAppData_) ) {
    console.error('connectAppData', 'global ApData not registered');
    return;
  }

  _globalAppData_.connect(obj, keys)
}

export const updateAppData = (dataObj) => {
  if( isundef(_globalAppData_) ) {
    console.error('updateAppData', 'global ApData not registered');
    return;
  }

  _globalAppData_.updateData(dataObj);
}

export const getAppData = () => {
  if( isundef(_globalAppData_) ) {
    console.error('getAppData', 'global ApData not registered');
    return null;
  }

  return _globalAppData_.getData();
}


export default AppData;
export { AppData, AppComponent };
