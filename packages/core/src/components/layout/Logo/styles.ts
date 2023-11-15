import styled from 'styled-components';

export const Logo = styled.div<{ mobile?: boolean }>`
  min-height: ${props => props.theme.layoutHeaderHeight};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 1rem;
  box-sizing: border-box;

  ${props =>
    props.mobile
      ? ''
      : `
  width: 240px;
  `}
`;
