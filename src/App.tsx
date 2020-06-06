import React from 'react';
import './App.css';
import { ThemeProvider, CssBaseline, createMuiTheme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from './store/rootReducer';
import { AppHeader } from './components/AppHeader';

function App() {
  const themeState = useSelector((state: RootState) => state.colorTheme);
  const theme = React.useMemo(() => {
    return createMuiTheme({
      palette: {
        type: themeState.type,
      },
    });
  }, [themeState]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppHeader showMenu={() => {}} />
    </ThemeProvider>
  );
}

export default App;
