import styled from 'styled-components';

export const DashHeader = styled.div`
  .header {
    position: relative;
    display: flex;
    align-items: center;
    height: ${props => props.theme.layoutHeaderHeight};
    padding: 0;
    background-color: #fff;
    border-bottom: 1px solid #ebe7e4;
  }

  .flex-none {
    flex: none;
  }

  .flex-grow {
    flex-grow: 1;
  }

  .trigger {
    transform: rotate(90deg);
    margin-right: 1rem;

    svg {
      color: ${props => props.theme.primaryColor};
    }
  }

  .ant-menu-root,
  .ant-menu-submenu-title {
    height: ${props => props.theme.layoutHeaderHeight};
    overflow: hidden;
  }
`;
