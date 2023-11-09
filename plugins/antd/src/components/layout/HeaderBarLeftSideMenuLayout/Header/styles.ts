import styled from 'styled-components';

export const DashHeader = styled.div`
  .header {
    position: relative;
    flex-direction: row;
    flex-wrap: nowrap;
    display: flex;
    align-items: center;
    height: ${props => `${props.theme.layoutHeaderHeight}`};
    z-index: 11;
    padding: 0 1rem;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.02), 0 1px 0 rgba(0, 0, 0, 0.02);
    background-color: #fff;
  }
  .trigger {
    transform: rotate(90deg);
    margin-right: 1rem;
  }
  .brand {
    display: flex;
    align-items: center;
    margin-right: 1rem;
    font-size: 1.25rem;
    white-space: nowrap;
    width: 216px;
  }
  .brand > svg {
    fill: ${props => props.theme.primaryColor};
  }
`;
