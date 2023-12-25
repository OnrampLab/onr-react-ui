import styled from 'styled-components';

export const Container = styled.div``;

export const Inner = styled.div`
  margin: 0 auto;
  padding: 1.5rem;
  position: relative;
  background-color: #f0f0f0;
  height: ${props => `calc(100dvh - ${props.theme.layoutHeaderHeight})`};
  overflow-y: auto;
  overflow-x: hidden;
`;
