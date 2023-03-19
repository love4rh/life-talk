import { getAppData, updateAppData } from '../app/AppData';
import { makeid, tickCount, extractURLs } from '../common/common';

import { talkList } from '../mock/sample01';



// TODO server interfacing

export const getInitialData = () => {
  return {
    pageMode: 'list', // list, talk, edit
    talkList: talkList,
    curTalkIndex: 0,
    curBoard: talkList[0]
  };
}


export const actGoBackToList = () => {
  updateAppData({ pageMode: 'list' });
}


export const actChangeBoard = (index) => {
  const { talkList } = getAppData();
  updateAppData({ pageMode: 'talk', curTalkIndex: index, curBoard: talkList[index] });
}


export const actGoEditBoard = (index) => {
  const { talkList } = getAppData();
  updateAppData({ pageMode: 'edit', curTalkIndex: index, curBoard: talkList[index] });
}


export const actAddNewBoard = (title, color) => {
  updateAppData({ pageMode: 'edit', curTalkIndex: -1, curBoard: { title, color } });
}


/**
 * Talk Board 추가 및 변경
 * @param {number} index -1이면 추가임. 0보다 크면 해당 Talk Board 속성 변경
 * @param {string} title Talk Board 제목
 * @param {string} color color string like #xxxxxx
 */
export const actAddOrChangeTalkBoard = (index, title, color) => {
  // TODO 서버 전달
  const { talkList } = getAppData();

  let curBoard = null;

  if( index === -1 ) {
    curBoard = {
      id: `TALK-${makeid(16)}`,
      title,
      color,
      lastTalk: '새로운 톡 보드가 만들어졌습니다.',
      time: tickCount(),
      talks: []
    };

    talkList.unshift(curBoard);
    index = 0;
  } else {
    curBoard = talkList[index];
    curBoard.title = title;
    curBoard.color = color;
  }

  // console.log('actChangeTalkName', index, title, color);
  updateAppData({ pageMode: 'list', curTalkIndex: index, curBoard, talkList });
}


const _updateTalkBoardData_ = ({ talkList, curTalkIndex, curBoard }) => {
  talkList = talkList.sort((a, b) => b.time - a.time);
  curTalkIndex = 0;

  updateAppData({ talkList, curTalkIndex, curBoard });
}

export const actAddTalk = (text) => {
  // TODO 서버 전달
  let { talkList, curTalkIndex } = getAppData();
  const curBoard = talkList[curTalkIndex];

  const time = tickCount();

  curBoard.lastTalk = text;
  curBoard.time = time;

  const URLs = extractURLs(text);
  curBoard.talks.push({ text, time, URLs });

  _updateTalkBoardData_({ talkList, curTalkIndex, curBoard });
}


export const actAddImage = (bas64Img) => {
  // TODO 서버 전달
  let { talkList, curTalkIndex } = getAppData();
  const curBoard = talkList[curTalkIndex];

  const time = tickCount();

  curBoard.lastTalk = 'image';
  curBoard.time = time;

  curBoard.talks.push({ bas64Img, time });

  _updateTalkBoardData_({ talkList, curTalkIndex, curBoard });
}


export const actArrangeTalkList = (talkList) => {
  // updateAppData('curTalkIndex', index);

  // talkList.sort
}
