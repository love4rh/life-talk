import styled from 'styled-components';

// refer: https://velog.io/@sorious77/React-Styled-Components-%EC%82%AC%EC%9A%A9-%EB%B0%A9%EB%B2%95-e9o4rnfq

const headerHeight = 54;
const containerWidth = 730;


export const WholeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export const BoxOne = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

// #cf6a87;

export const HeaderWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  height: ${headerHeight}px;
  background-color: red;
  width: 100%;
  max-width: ${containerWidth}px;
`;

export const Container = styled.div`
  flex: 1;
  background-color: blue;
  width: 100%;
  height: calc(100vh - ${headerHeight}px);
  max-width: ${containerWidth}px;
`;

export const Box = styled.div`
`;
