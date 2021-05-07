import { useEffect, ReactNode } from "react";
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { ThemeProvider as MaterialUIThemeProvider } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../../styles/theme'

interface Props {
  children: ReactNode;
}

const Framework = ({ children }: Props) => {
  useEffect(() => {
    const jssStyles: Element | null = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, []);
  return (
    <StylesProvider injectFirst>
      <MaterialUIThemeProvider theme={theme}>
        <StyledComponentsThemeProvider theme={theme}>
          <CssBaseline>
            { children }
          </CssBaseline>
        </StyledComponentsThemeProvider>
      </MaterialUIThemeProvider>
    </StylesProvider>
  )
}

export default Framework