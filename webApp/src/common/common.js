// const valueTypes = [ 'number', 'datetime', 'boolean', 'string', 'unknown' ];

export const oneDayTick = 3600 * 24 * 1000;


export const isundef = (o) => {
  return o === null || typeof(o) === 'undefined';
}


export const isvalid = (o) => {
  return o !== null && typeof(o) !== 'undefined';
}


export const isValidString = (s) => {
  return s !== null && typeof(s) !== 'undefined' && s !== '';
}

export const isBetween = (val, f, t) => {
  return f <= val && val < t;
}


export const nvl = (val, def) => {
  return isundef(val) ? def : val;
}


// 출처: https://stove99.tistory.com/113 [스토브 훌로구]
export const numberWithCommas = (x) => {
  var reg = /(^[+-]?\d+)(\d{3})/;
  var n = (x + '');

  while( reg.test(n) )
    n = n.replace(reg, '$1,$2');

  return n;
}


export const calcDigits = (n) => {
  return Math.log(n) * Math.LOG10E + 1 | 0;
}


export const calcDigitsWithCommas = (x) => {
  const d = calcDigits(x)
  return d + Math.floor((d - 1) / 3);
}


export const istrue = (x) => {
  return isvalid(x) && x;
}

export const isfalse = (x) => {
  return isvalid(x) && !x;
}

const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const makeid = (digitNum) => {
  let text = '';
  for (let i = 0; i < digitNum; ++i) {
    text += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  }

  return text;
}


export const makeidWithChecksum = (digitNum) => {
  let text = '';
  let cSum = 0;

  for (let i = 0; i < (digitNum - 1); ++i) {
    const idx = Math.floor(Math.random() * possibleChars.length);
    text += possibleChars.charAt(idx);
    cSum += possibleChars.codePointAt(idx);
  }
  
  text += possibleChars.charAt(cSum % possibleChars.length);

  return text;
}


export const tickCount = () => {
  return new Date().getTime();
}


export const pad2 = (n) => {
  return (n < 10 ? '0' : '') + n;
}


export const pad3 = (n) => {
  return ((n < 10 ? '00' : (n < 100 ? '0' : '')) + n);
}


export const dateToString = (dt, withMilli) => {
  const MM = dt.getMonth() + 1; // getMonth() is zero-based
  const dd = dt.getDate();
  const hh = dt.getHours();
  const mm = dt.getMinutes();
  const ss = dt.getSeconds();
  const mi = dt.getMilliseconds();

  // if( mi > 0 ) {
  //   withMilli = true;
  // }

  return [ dt.getFullYear(), pad2(MM), pad2(dd) ].join('-')
    + ' ' + [ pad2(hh), pad2(mm), pad2(ss) ].join(':') + (istrue(withMilli) ? '.' + pad3(mi) : '');
}

export const dateToYYYYMMDD = (dt) => {
  const MM = dt.getMonth() + 1; // getMonth() is zero-based
  const dd = dt.getDate();

  return [ dt.getFullYear(), pad2(MM), pad2(dd) ].join('');
}

export const dateToYYYYMMDDBySep = (dt, sep) => {
  const MM = dt.getMonth() + 1; // getMonth() is zero-based
  const dd = dt.getDate();

  return [ dt.getFullYear(), pad2(MM), pad2(dd) ].join(sep);
}

// 날짜 중 월/일 만 표시
export const mmdd = (dt, sep) => {
  if( typeof dt === 'number' ) {
    dt = new Date(dt);
  }

  const MM = dt.getMonth() + 1; // getMonth() is zero-based
  const dd = dt.getDate();

  return pad2(MM) + (sep || '/') + pad2(dd);
}

// 날짜 중 시/분 만 표시
export const hhmm = (dt, sep) => {
  if( typeof dt === 'number' ) {
    dt = new Date(dt);
  }
  
  const hh = dt.getHours();
  const mm = dt.getMinutes();

  return pad2(hh) + (sep || ':') + pad2(mm);
}

// 시간을 인간적으로 표시
// 오늘일 경우, todayName가 true이면 "오늘" 아니면 시간표시
// 2일 전까지는 "어제, 모레"로 표시
// 2일 넘는 날은 날짜(mm/dd) 표시
//
export const humanTime = (tick, todayName) => {
  const dt = new Date(tick);
  const now = new Date().getTime();

  const dayDiff = Math.round(now / oneDayTick) - Math.round(tick / oneDayTick);

  let ret = ''
  switch( dayDiff ) {
    case 0:
      ret = istrue(todayName) ? '오늘' : hhmm(dt);
      break;
    
    case 1:
      ret = '어제';
      break;

    case 2:
      ret = '모레';
      break;

    default:
      ret = mmdd(dt);
      break;
  }

  return ret;
}


/**
 * 같은 날짜인지 여부 반환
 * @param {number} tick1 
 * @param {number} tick2 
 */
export const isSameDay = (tick1, tick2) => {
  return Math.round(tick1 / oneDayTick) === Math.round(tick2 / oneDayTick);
}


/**
 * 객체 obj에 method가 있으면 호출한 결과를 반환하고 없으면 null 반환
 * @param {*} obj 
 * @param {string} method 
 * @param {*} option 메소드를 호출할 때 인수로 넘길 값 
 */
export const proxyCall = (obj, method, option) => {
  return (method in obj) ? obj[method](option) : null;
}


// [min, max] 내 임의의 숫자 반환
export const genRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max) + 1;
  return Math.floor(Math.random() * (max - min)) + min;
}

export const binarySearch = (sorted, target, compare) => {
  let l = 0, h = sorted.length - 1;

  // console.log('binarySearch', l, h, target);

  while( l <= h ) {
    const m = Math.floor((l + h) / 2);
    const r = compare(sorted[m], target);

    if( r === 0 ) {
      return { m, l, h };
    } else if( r > 0 ) {
      h = m - 1;
    } else {
      l = m + 1;
    }
  }

  return { m:-1, l, h };
}


export const makeRowFilter = (ds, cb) => {
  const sm = [];
  for(let c = 0; c < ds.getColumnCount(); ++c) {
    const fd = ds.getColumnFilterData(c);

    if( isundef(fd) ) {
      sm.push(null);
    } else {
      sm.push( fd.filter((d) => d.selected).reduce((m, d) => ({...m, [d.title]:true}), {}) );
    }
  }

  // console.log('makeRowFilter', sm);

  const ri = [];
  for(let r = 0; r < ds._getRowCount(true); ++r) {
    let selected = true;
    for(let c = 0; selected && c < ds.getColumnCount(); ++c) {
      selected = isundef(sm[c]) || isvalid(sm[c][ds._getRawCellValue(c, r)]);
    }

    if( selected ) {
      ri.push(r);
    }
  }

  // console.log('makeRowFilter result', ri);

  if( cb ) {
    cb({ rowFilter:ri });
  }
}


export const makeOneLine = (str) => {
  return str.replace('\n', ' ');
}


// 현재 Active 상태인 그리드
let _currentActiveGrid = null;

export const setCurrentActiveGrid = (grid) => {
  _currentActiveGrid = grid;
}


export const dismissActiveGrid = (grid) => {
  if( _currentActiveGrid === grid ) {
    _currentActiveGrid = null;
  }
}


export const getCurrentActiveGrid = () => {
  return _currentActiveGrid;
}


export const printDimension = (title, tag) => {
  const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = tag;

  console.log(title, offsetLeft, offsetTop, offsetWidth, offsetHeight);
}


// value의 값 형태를 추정하여 반환
// returns number, datetime, boolean, string
export const estimateValueType = (value) => {
  const vt = typeof value;

  if( vt === 'number' || vt === 'boolean' ) {
    return vt;
  }

  // TODO datetime 고려

  return isNaN(parseFloat(value)) ? 'string' : 'number';
}


export const tryParseNumber = (str) => {
  const n = parseFloat(str);
  return isNaN(n) ? null : n;
}


export const isDateTime = (typeStr) => {
  return 'datetime' === typeStr;
}


// 목록에서 최소/최대값을 계산하여 반환함
// returns [minimum, maximum]
export const extent = (list) => {
  list.reduce((a, d) => a === null ? [d, d] : [Math.min(a[0], d), Math.max(a[1], d)], null);
}


export const cp = (obj) => {
  return JSON.parse(JSON.stringify(obj));
}


export const yyymmddToHuman = (dt) => {
  if( isundef(dt) ) {
    return '-';
  }
  
  return dt.substring(0, 4) + '-' + dt.substring(4, 6) + '-' + dt.substring(6, 8);
}


// dt: Date
// 출처: https://jaimemin.tistory.com/1432
export const getDayName = (dt) => {
  return dt.toLocaleDateString('ko-KR', { weekday: 'long', }).substr(0, 1);
}

// from: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export const randomReal = (min, max) => {
  return Math.random() * (max - min) + min;
}


// 최대값, 최소값 모두 포함
// from: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export const randomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 *
 *  Secure Hash Algorithm (SHA256)
 *  http://www.webtoolkit.info/
 *
 *  Original code by Angel Marin, Paul Johnston.
 **/
      
 export const SHA256 = function(s) {
  var chrsz   = 8;
  var hexcase = 0;

  function safe_add (x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
  }

  function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
  function R (X, n) { return ( X >>> n ); }
  function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
  function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
  function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
  function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
  function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
  function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }

  function core_sha256 (m, l) {
    var K = [
      0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1,
      0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
      0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786,
      0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
      0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147,
      0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
      0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B,
      0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
      0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A,
      0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
      0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
    ];

    var HASH = [
      0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 
      0x9B05688C, 0x1F83D9AB, 0x5BE0CD19
    ];

    var W = new Array(64);
    var a, b, c, d, e, f, g, h, i, j;
    var T1, T2;

    m[l >> 5] |= 0x80 << (24 - l % 32);
    m[((l + 64 >> 9) << 4) + 15] = l;

    for ( i = 0; i<m.length; i+=16 ) {
      a = HASH[0];
      b = HASH[1];
      c = HASH[2];
      d = HASH[3];
      e = HASH[4];
      f = HASH[5];
      g = HASH[6];
      h = HASH[7];

      for ( j = 0; j<64; j++) {
        if (j < 16) W[j] = m[j + i];
        else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

        T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
        T2 = safe_add(Sigma0256(a), Maj(a, b, c));

        h = g;
        g = f;
        f = e;
        e = safe_add(d, T1);
        d = c;
        c = b;
        b = a;
        a = safe_add(T1, T2);
      }

      HASH[0] = safe_add(a, HASH[0]);
      HASH[1] = safe_add(b, HASH[1]);
      HASH[2] = safe_add(c, HASH[2]);
      HASH[3] = safe_add(d, HASH[3]);
      HASH[4] = safe_add(e, HASH[4]);
      HASH[5] = safe_add(f, HASH[5]);
      HASH[6] = safe_add(g, HASH[6]);
      HASH[7] = safe_add(h, HASH[7]);
    }
    return HASH;
  }

  function str2binb (str) {
    var bin = [];
    var mask = (1 << chrsz) - 1;
    for(var i = 0; i < str.length * chrsz; i += chrsz) {
      bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
    }
    return bin;
  }

  function Utf8Encode(string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }

    return utftext;
  }

  function binb2hex (binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for(var i = 0; i < binarray.length * 4; i++) {
      str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
      hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
    }
    return str;
  }

  s = Utf8Encode(s);

  return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}


export const isIn = (val, array) => {
  if (isundef(val) || isundef(array)) return false;

  for(var i = 0; i < array.length; ++i) {
    if( array[i] === val ) {
      return true;
    }
  }

  return false;
}


export const toHexString = (str) => {
  var h = '';

  for(var i = 0; i < str.length; ++i) {
    h += str.charCodeAt(i).toString(16);
  }

  return h;
}


export const putStringToMap = (m, k, v, d) => {
  if( !(k in m) ) {
    m[k] = v;
  } else if( m[k].indexOf(v) === -1 ) {
    m[k] += d + v;
  }
}


/**
 * 지정한 Attribute 값을 찾을 때까지 상위 객체를 검색하여 반환
 */
export const getTagAttribute = (target, attrName, stepLimit) => {
  var cur = target, step = 0;

  while( (isundef(stepLimit) || step < stepLimit) && isvalid(cur) ) {
    const value = cur.getAttribute(attrName);

    if( isvalid(value) ) {
      return value;
    }

    cur = cur.parentNode;
  }

  return null;
}


const magSequece = 'HIJKLMNOPQRSTUVWXYZ';
const encSequece = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFG';
const decSequece = 'w9@ilc:52nz.p/dgas6k1=fo&equ0j3?bh8mrxy7vt4';

const _indexInString = (s, c) => {
  for(let i = 0; i < s.length; ++i) {
    if( s[i] === c ) {
      return i;
    }
  }
  return -1;
}


const _insMangler = (p) => {
  return Math.random() > p ? magSequece.charAt(Math.floor(Math.random() * magSequece.length)) : '';
}


/**
 * 문자열이 바로 들어 아니 않도록 mangling하는 함수.
 * decryptString() 복구할 수 있음
 * @param {*} s 
 * @returns 
 */
export const encryptString = (s) => {
  const ds = decSequece;
  const es = encSequece;

  return Array.from(s).map(c => {
    return _insMangler(0.3) + es[ _indexInString(ds, c) ] + _insMangler(0.7);
  }).join('');
}


/**
 * encryptString()으로 mangling된 문자열을 복구하는 함수
 * @param {*} s 
 * @returns 
 */
export const decryptString = (s) => {
  const ds = encSequece;
  const es = decSequece;

  return Array.from(s).map(c => {
    if( magSequece[0] <= c && c <= magSequece[magSequece.length - 1]) {
      return '';
    }
    return es[_indexInString(ds, c)];
  }).join('');
}


/**
 * 문자열에서 URL을 추출
 * @param {string} s 
 * @returns 
 */
export const extractURLs = (s) => {
  // eslint-disable-next-line
  const urlRegEx = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/g;
  return (s && s.match(urlRegEx)); //  || [];
}


/**
 * 입력받은 문자열을 숫자로 변환하는 함수.
 * 유니크 함이 보장되는 숫자는 아니고 규칙에 따라 숫자로 변환하는 기능 제공.
 * @param {*} s 
 */
export const generateStringHash = (s, maxNum) => {
  if( !isValidString(s) ) {
    return 0;
  }

  let n = 1;
  const intLimit = 2147483646;

  for(let i = 0; i < s.length; ++i) {
    n *= s.charCodeAt(i);
    n %= intLimit;
  }

  if( isvalid(maxNum) && maxNum > 1 ) {
    n %= (maxNum + 1);
  }

  return n;
}
