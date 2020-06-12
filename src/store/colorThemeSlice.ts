import { createSlice } from '@reduxjs/toolkit';
import { getOsColorTheme, ColorThemeType } from '../util/ColorTheme';

interface ColorThemeState {
  type: ColorThemeType;
}

// TODO: localStorage 使って永続化
const initialState: ColorThemeState = {
  type: getOsColorTheme(),
};

const colorTheme = createSlice({
  name: 'ColorTheme',
  initialState,
  reducers: {
    toggle: (state) => ({
      type: state.type === 'light' ? 'dark' : 'light',
    }),
  },
});

export const { toggle } = colorTheme.actions;
export const { reducer } = colorTheme;
