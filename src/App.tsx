import React, { useCallback, useState } from 'react';
import './App.css';
import { HashRouter, Switch, Route, useParams } from 'react-router-dom';
import { SourceCodeList } from './pages/SourceCodeList';
import { ThemeProvider, CssBaseline, createMuiTheme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from './store/rootReducer';
import { AppHeader } from './components/AppHeader';
import { SourceCodeDetail } from './pages/SourceCodeDetail';
import { AppSidebar } from './components/AppSidebar';

const SourceCodeDetailPage: React.FC = () => {
  const { key } = useParams<{ key: string }>();
  const keyNum = Number(key);
  return <SourceCodeDetail key={keyNum} />;
};

function App() {
  const themeState = useSelector((state: RootState) => state.colorTheme);
  const theme = React.useMemo(() => {
    return createMuiTheme({
      palette: {
        type: themeState.type,
      },
    });
  }, [themeState]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = useCallback((value: boolean) => {
    return () => setDrawerOpen(value);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppHeader showDrawer={toggleDrawer(true)} />
      <AppSidebar open={drawerOpen} onClose={toggleDrawer(false)} />
      <HashRouter>
        <Switch>
          <Route exact path='/'>
            <SourceCodeList />
          </Route>
          <Route exact path='/detail/:key(\id+)'>
            <SourceCodeDetailPage />
          </Route>
        </Switch>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
