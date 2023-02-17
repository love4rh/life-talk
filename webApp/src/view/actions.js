import { getAppData, updateAppData } from '../app/AppData';
import { tickCount, extractURLs } from '../common/common';

import { talkList } from '../mock/sample01';



// TODO server interfacing

export const getInitialData = () => {
  return {
    talkList: talkList,
    curTalkIndex: 0,
    curBoard: talkList[0]
  };
}


export const actChangeBoard = (index) => {
  const { talkList } = getAppData();
  updateAppData({ curTalkIndex: index, curBoard: talkList[index] });
}


const _updateTalkBoardData_ = ({ talkList, curTalkIndex, curBoard }) => {
  talkList = talkList.sort((a, b) => b.time - a.time);
  curTalkIndex = 0;

  updateAppData({ talkList, curTalkIndex, curBoard });
}

export const actAddTalk = (text) => {
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
