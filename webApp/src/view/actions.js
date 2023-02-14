import { updateAppData } from '../app/AppData';


export const actChangeBoard = (index) => {
  updateAppData('curTalkIndex', index);
}

export const actAddTalk = (talkText) => {
  // TODO 서버 업데이트?

}

export const actArrangeTalkList = (talkList) => {
  // updateAppData('curTalkIndex', index);

  // talkList.sort
}
