import { getAppData, updateAppData } from '../app/AppData';
import { tickCount } from '../common/common';

import { talkList } from '../mock/sample01';



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


export const actAddTalk = (text) => {
  let { talkList, curTalkIndex } = getAppData();
  const curBoard = talkList[curTalkIndex];

  const time = tickCount();

  curBoard.lastTalk = text;
  curBoard.time = time;
  curBoard.talks.push({ text, time });

  talkList = talkList.sort((a, b) => b.time - a.time);
  curTalkIndex = 0;

  updateAppData({ talkList, curTalkIndex, curBoard });
}


export const actArrangeTalkList = (talkList) => {
  // updateAppData('curTalkIndex', index);

  // talkList.sort
}
