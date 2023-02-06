import { tickCount, oneDayTick } from '../common/common';


export const talkList = 
[
  { "id": "t1", "title": "일상", "color": "#1f77b4", "lastTalk": "마지막 메시지 어쩌구 저쩌구", "time": tickCount() - 360000 },
  { "id": "t2", "title": "업무", "color": "#ff7f0e", "lastTalk": "마지막 메시지 어쩌구 저쩌구 마지막 메시지 어쩌구 저쩌구", "time": tickCount() - 30000 },
  { "id": "t3", "title": "This is message title to test long lines.", "color": "#ff7f0e", "lastTalk": "마지막 메시지 어쩌구 저쩌구 마지막 메시지 어쩌구 저쩌구", "time": tickCount() - oneDayTick * 2 }
];


/**
 * Talk Type:
 * - String
 * - Image (Base64 encoded string)
 * - URL (w/ String)
 */
export const talkMessage =
[
  { "a": "" }
];

// https://v.daum.net/v/VYETrUNFKN
/*

https://v.daum.net/v/VYETrUNFKN
  <meta property="og:site_name" content="콘텐츠뷰"> 
  <meta property="og:title" content="414회 롯데의 목표"> 
  <meta property="og:regDate" content="20230123080140"> 
  <meta property="og:type" content="article"> 
  <meta property="og:article:author" content="익뚜의 야스"> 
  <meta property="og:url" content="https://v.daum.net/v/VYETrUNFKN"> 
  <meta property="og:image" content="https://img1.daumcdn.net/thumb/S1200x630/?fname=https://t1.daumcdn.net/news/202301/23/yas/20230123084738469gfsx.jpg"> 
  <meta property="og:image:width" content="1200"> 
  <meta property="og:image:height" content="630"> 
  <meta property="og:description" content="익뚜의 야구스토리 1월 23일 자"> 

*/