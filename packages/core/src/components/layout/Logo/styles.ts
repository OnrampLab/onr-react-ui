import styled from 'styled-components';

export const Logo = styled.div<{ mobile?: boolean }>`
  min-height: ${props => props.theme.layoutHeaderHeight};
  display: flex;
  align-items: center;
  padding: 0 1rem;
  box-sizing: border-box;

  ${props =>
    props.mobile
      ? `
  justify-content: center;
  `
      : `
  width: 240px;
  justify-content: flex-start;
  `}
`;
