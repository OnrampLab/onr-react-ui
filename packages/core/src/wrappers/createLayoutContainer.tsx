import { StyleLayoutContainer } from '../containers';

interface Props {
  theme?: { [key: string]: any };
  GlobalStyles?: React.FC<any>;
}

export const createLayoutContainer = (params: Props) => {
  const { GlobalStyles, theme } = params;

  const MyLayoutContainer: React.FC<any> = ({ children }) => {
    return (
      <StyleLayoutContainer GlobalStyles={GlobalStyles} theme={theme}>
        {children}
      </StyleLayoutContainer>
    );
  };

  return MyLayoutContainer;
};
