import { createMuiTheme } from '@material-ui/core';

const tmpTheme = createMuiTheme();
export type ColorThemeType = typeof tmpTheme.palette.type;

export const getOsColorTheme = (): ColorThemeType =>
  window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
