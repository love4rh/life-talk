const LANG = {
  'default': {
    'Talk Board shoud have Title.': '',
    'Add Talk': '',
    'Edit Talk': '',
    'enter title.': '',
    'Talk List': '',
  },

  'ko-KR': {
    'Talk Board shoud have Title.': '이름을 입력하여야 합니다.',
    'Add Talk': '보드 추가',
    'Edit Talk': '보드 편집',
    'Talk Title': '보드 이름',
    'Marker Color': '마커 색상',
    'enter title.': '이름을 입력하세요.',
    'Talk List': '보드 목록',
  }
};


let _langSet_ = LANG['ko-KR'];


export const setAppLanguage = (langCode) => {
  if( langCode in LANG ) {
    _langSet_ = LANG[langCode];
  } else {
    console.log('not supported language: ', langCode);
  }
}


export const $L = (code) => {
  return _langSet_[code] || code;
}

