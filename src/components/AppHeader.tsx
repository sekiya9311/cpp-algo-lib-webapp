import React, { useCallback } from 'react';
import {
  AppBar,
  Toolbar,
  makeStyles,
  createStyles,
  Typography,
  IconButton,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import {
  APP_NAME,
  LIBRARY_GITHUB_URL,
  PRODUCT_GITHUB_URL,
} from '../util/constants';
import { GitHubLinkIcon } from './GitHubLinkIcon';
import { useDispatch, useSelector } from 'react-redux';
import { toggle as toggleAction } from '../store/colorThemeSlice';
import { ToggleIcon } from './ToggleIcon';
import { RootState } from '../store/rootReducer';

interface Props {
  readonly showMenu: () => void;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      color: theme.palette.common.white,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export const AppHeader: React.FC<Props> = (props: Props) => {
  const styles = useStyles();

  const themeState = useSelector((state: RootState) => state.colorTheme);
  const dispatch = useDispatch();
  const toggle = useCallback(() => {
    dispatch(toggleAction());
  }, [dispatch]);

  return (
    <AppBar className={styles.root}>
      <Toolbar>
        <IconButton
          onClick={props.showMenu}
          className={styles.menuButton}
          color='inherit'
        >
          <Menu />
        </IconButton>
        <Typography variant='h6' className={styles.title}>
          {APP_NAME}
        </Typography>
        <ToggleIcon
          value={themeState.type === 'dark'}
          toggle={toggle}
          color='inherit'
        />
        <GitHubLinkIcon
          detailText='Library'
          linkUrl={LIBRARY_GITHUB_URL}
          color='inherit'
        />
        <GitHubLinkIcon
          detailText='This'
          linkUrl={PRODUCT_GITHUB_URL}
          color='inherit'
        />
      </Toolbar>
    </AppBar>
  );
};
