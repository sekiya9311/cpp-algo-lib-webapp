import { combineReducers } from '@reduxjs/toolkit';
import { reducer as colorThemeReducer } from './colorThemeSlice';

export const rootReducer = combineReducers({
  colorTheme: colorThemeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
