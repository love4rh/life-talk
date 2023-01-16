import styled from 'styled-components';

// refer: https://velog.io/@sorious77/React-Styled-Components-%EC%82%AC%EC%9A%A9-%EB%B0%A9%EB%B2%95-e9o4rnfq

const bgScreen = '#0a0a0a';

const headerHeight = 54;
const containerWidth = 730;
const lineHeight = 54;
const inputHeight = 36;

const headerColor = '#dbdbdb';


export const WholeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${bgScreen};
`;

export const Box = styled.div`
  width: ${(p) => p.width || 5};
  height: 100px;
`;

// #cf6a87;

export const ScrollStyledDiv = styled.div`
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
    width: 12px; /*스크롤바의 너비*/
    background-color: $scrollBGColor; /*스크롤바의 색상*/
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: $scrollThumbColor; /*스크롤바의 색상*/
    background-clip: padding-box;
    border: 1px solid transparent;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background-color: $scrollBGColor; /*스크롤바 트랙 색상*/
  }
`;


export const HStack = styled.div`
  height: ${(p) => p.height || '100%'};
  display: flex;
  flex-direction: row;
`;

export const VStack = styled.div`
  width: ${(p) => p.width || '100%'};
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  height: ${headerHeight}px;
  color: #dbdbdb;
  background-color: ${(p) => p.bgColor || bgScreen};
  width: 100%;
  border-bottom: 1px solid ${bgScreen};
  display: flex;
  align-items: center;
`;

export const Container = styled(ScrollStyledDiv)`
  flex: 1;
  width: 100%;
  color: #dbdbdb;
  background-color: ${(p) => p.bgColor || bgScreen};
  height: calc(100vh - ${headerHeight}px);
  border-top: 1px solid ${bgScreen};
`;


// List for TalkBoard

export const ListBox = styled.div`
  flex: 1;
  width: ${(p) => p.width || '100%'};
  height: calc(100vh - ${headerHeight}px);
  max-width: ${containerWidth}px;
`;

export const ListBoxItem = styled.div`
  cursor: pointer;
  display: flex;
  height: ${lineHeight}px;

  &:hover {
    background-color: white;
  }
`;

export const ListBoxIcon = styled.div`
  width: ${lineHeight}px;
  height: ${lineHeight}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ListBoxBody = styled.div`
  flex: 1;
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const ListBoxTitle = styled.div`
  font-weight: bolder;
  font-size: 1.1rem;
`;

export const ListBoxMessage = styled.div`
  color: #bbb;
  font-size: 0.9rem;
`;

export const ListBoxTime = styled.div`
  color: #aaa;
  width: ${lineHeight}px;
  height: ${lineHeight}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;



// TalkBoard

export const TalkBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const TalkBoard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const TalkInputBox = styled.div`
  height: ${inputHeight}px;
  border: 1px #999 solid;
  max-height: ${inputHeight * 2}px;
`;

