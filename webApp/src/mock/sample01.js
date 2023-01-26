import { tickCount, oneDayTick } from '../common/common';


export const talkList = 
[
  { "id": "t1", "title": "일상", "color": "#1f77b4", "lastTalk": "마지막 메시지 어쩌구 저쩌구", "time": tickCount() - 360000 },
  { "id": "t2", "title": "업무", "color": "#ff7f0e", "lastTalk": "마지막 메시지 어쩌구 저쩌구 마지막 메시지 어쩌구 저쩌구", "time": tickCount() - 30000 },
  { "id": "t3", "title": "This is message title to test long lines.", "color": "#ff7f0e", "lastTalk": "마지막 메시지 어쩌구 저쩌구 마지막 메시지 어쩌구 저쩌구", "time": tickCount() - oneDayTick * 2 }
];

