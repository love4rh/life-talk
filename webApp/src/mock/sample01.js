import { tickCount, oneDayTick, randomInteger } from '../common/common';


const circleColor = [
  '#1f77b4', '#ff7f0e', '#9467bd', '#2ca02c', '#8c564b', '#e377c2'
];

const messagePool = [
  'I want...\nThis would be a nice talking board.',
  '메시지 어쩌구 저쩌구',
  '메시지 어쩌구 저쩌구 메시지 어쩌구 저쩌구 메시지 어쩌구 저쩌구 메시지 어쩌구 저쩌구',
  'To use an SVG text element, you need to add a <text> element to your SVG code, then specify the position of the text using the x and y attributes. You can also set the text content using the text content of the <text> element. Here is an example:',
  'The "idpiframe_initialization_failed" error message typically occurs when there is a problem loading or initializing an Identity Provider (IdP) in an IFrame. This error can occur due to various reasons such as network connectivity issues, compatibility issues with the browser, or configuration errors in the IdP. It often indicates a problem with the integration between the relying party website and the IdP and requires further investigation to determine the root cause and resolve the issue.'
];


const generateSamples = () => {
  const titles = [ '일상', '업무', '아무개1', 'This is message title to test long lines.' ];

  return titles.map((t, i) => {
    const lastTime = tickCount() - randomInteger(oneDayTick * i, oneDayTick * (i + 0.5));
    const firstTime = lastTime - oneDayTick * (i + 1);
    const talkCount = randomInteger(5, 100);

    let talks = [];
    for(let j = 0; j < talkCount; ++j) {
      talks.push({
        text: messagePool[randomInteger(0, messagePool.length - 1)],
        time: randomInteger(firstTime, lastTime)
      });
    }

    talks = talks.sort((a, b) => a.time - b.time);

    return {
      id: `TALK-${i}`,
      title: t,
      color: circleColor[i % circleColor.length],
      lastTalk: talks[talks.length - 1].text,
      time: talks[talks.length - 1].time,
      talks
    }
  }).sort((a, b) => b.time - a.time);
}


export const talkList = generateSamples();


/**
 * Talk Type:
 * - String
 *   w/ Image (Base64 encoded string)
 *   w/ URL (w/ String)
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