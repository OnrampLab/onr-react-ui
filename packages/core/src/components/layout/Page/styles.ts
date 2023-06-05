import styled from 'styled-components';

export const Container = styled.div``;

export const Inner = styled.div`
  margin: 0 auto;
  padding: 1.5rem;
  position: relative;
  background-color: #f0f0f0;
  min-height: ${props => `calc(100vh - ${props.theme.layoutHeaderHeight})`};
`;
