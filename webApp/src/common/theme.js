import { randomInteger, isundef } from '../common/common';

import {
  red, pink, purple, deepPurple,
  indigo, blue, lightBlue, cyan,
  teal, green, lightGreen, lime,
  yellow, amber, orange, deepOrange,
  brown, grey, blueGrey
} from '@mui/material/colors';

const _colorMap_ = {
  red, pink, purple, deepPurple,
  indigo, blue, lightBlue, cyan,
  teal, green, lightGreen, lime,
  yellow, amber, orange, deepOrange,
  brown, grey, blueGrey
};

const _colorKeys_ = Object.keys(_colorMap_);


/**
 * 랜덤으로 색상 반환
 * @param {string} shade 100, 200, ..., 900, A100, A200, A400, A700
 * @returns color string
 */
export const getRandomColor = (shade) => {
  if( isundef(shade) ) {
    shade = '500';
  }

  return _colorMap_[_colorKeys_[randomInteger(0, _colorKeys_.length - 1)]][shade];
}


/**
 * 정의된 색상 반환
 * @param {*} hue 색상 이름 [red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange, brown, grey, blueGrey]
 * @param {string} shade 색상의 농도. 100, 200, ..., 900, A100, A200, A400, A700. 기본값 500
 */
export const getColor = (hue, shade) => {
  if( isundef(shade) ) {
    shade = '500';
  }

  return _colorMap_[hue][shade];
}


/**
 * Options for Look & Feel
 */

const Dark = {
  bgScreen: '#0a0a0a', // screen default background color
  headerHeight: 54,

  titleColor: '#fff',
  fontColor: '#dbdbdb',

  listPanelColor: '#141414',
  listTimeColor: '#AAA',

  listItemHeight: 58, // List item line height

  talkPanelColor: '#1f1f1f',
  talkBoxBgColor: '#292929',
  talkTimeColor: '#AAA',

  separatorLineColor: '#17becf', // Talk 구분선 색상
  separatorFontColor: '#dbdbdb', // Talk 구분선 제목

  inputHeight: 36,

  inputSepLineColor: '#0a0a0a',
  inputBoxBGColor: '#141414',
  sendButtonBGColor: '#bcbd22',

  selectedBgColor: '#292929',
  hoverBgColor: '#292C29',
  selectedItemColor: '#007FD4',
  separatorColor: '#3C3C3C',
  listLabelColor: '#bcbd22',

  // Talk 보드 속성 편집창
  talkEditTitleColor: '#7f7f7f',
};

export { Dark };
