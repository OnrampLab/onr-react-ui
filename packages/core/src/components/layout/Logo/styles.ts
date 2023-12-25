import styled from 'styled-components';

// styled-components cannot receive boolean as props
export const Logo = styled.div<{ mobile?: number }>`
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
