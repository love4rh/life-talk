import styled from 'styled-components';

import { Dark as TM } from '../common/theme';

// refer: https://velog.io/@sorious77/React-Styled-Components-%EC%82%AC%EC%9A%A9-%EB%B0%A9%EB%B2%95-e9o4rnfq


const scrollBGColor = '#1E1E1E';
const scrollThumbColor = '#4E4E4E';



export const WholeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${TM.bgScreen};
`;

export const Box = styled.div`
  width: ${({ width }) => width || 5};
  height: 100px;
`;

// #cf6a87;

export const ScrollStyledDiv = styled.div`
  overflow-y: auto;

  &::-webkit-scrollbar {
    // display: none;
    width: 12px; /*스크롤바의 너비*/
    background-color: ${scrollBGColor}; /*스크롤바의 색상*/
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${scrollThumbColor}; /*스크롤바의 색상*/
    background-clip: padding-box;
    border: 1px solid transparent;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${scrollBGColor}; /*스크롤바 트랙 색상*/
  }
`;


export const HStack = styled.div`
  height: ${({ height }) => height || '100%'};
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const VStack = styled.div`
  height: 100%;
  width: ${({ width }) => width || '100%'};
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  height: ${TM.headerHeight}px;
  color: ${TM.titleColor};
  background-color: ${({ bgColor }) => bgColor || TM.bgScreen};
  width: 100%;
  border-bottom: 1px solid ${TM.bgScreen};
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  font-weight: bold;
`;

export const CenteredHeader = styled(Header)`
  justify-content: center;
`;

export const Container = styled(ScrollStyledDiv)`
  flex: 1;
  width: 100%;
  color:  ${TM.fontColor};;
  background-color: ${({ bgColor }) => bgColor || TM.bgScreen};
  height: calc(100vh - ${TM.headerHeight}px);
  border-top: 1px solid ${TM.bgScreen};
  display: flex;
  flex-direction: column;
`;


// List for TalkBoard

export const ListBox = styled.div`
  flex: 1;
  width: ${({ width }) => width || '100%'};
  height: calc(100vh - ${TM.headerHeight}px);
`;

export const ListBoxItem = styled.div`
  cursor: pointer;
  display: flex;
  height: ${TM.listItemHeight}px;
  color: ${TM.fontColor};
  background-color: ${({ selected }) => selected ? TM.selectedBgColor : 'inherit'};

  &:hover {
    background-color: ${TM.hoverBgColor};
  }

  display: flex;
  align-items: center;
  // justify-content: center;
`;

export const ListBoxLabel = styled.div`
  height: ${TM.listItemHeight}px;
  color: ${TM.listLabelColor};
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* &:not(:first-child) {
    margin: 5px;
    border-top: 1px solid ${TM.separatorColor};
  } */
`;

export const ListBoxIcon = styled.div`
  width: ${TM.listItemHeight}px;
  height: ${TM.listItemHeight}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ListBoxBody = styled.div`
  width: ${({ width }) => width}px;
  flex: 1;
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const ListTitleLine = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ListBoxTitle = styled.div`
  flex: 1 1 auto;
  font-weight: bold;
  font-size: 1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const ListBoxMessage = styled.div`
  color: #bbb;
  font-size: 0.9rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  // flex: 1 1 auto;
  overflow: hidden;
`;

export const ListBoxTime = styled.div`
  color: ${TM.listTimeColor};;
  font-family: monospace;
  // width: ${TM.listItemHeight}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 45px;
`;

export const ListBoxSeparator = styled.div`
  margin: 5px;
  border-bottom: 1px solid ${TM.separatorColor};
  content: "";
`;
