import { combineReducers } from '@reduxjs/toolkit';
import { reducer as colorThemeReducer } from './colorThemeSlice';
import { reducer as LibrariesReducer } from './librariesSlice';

export const rootReducer = combineReducers({
  colorTheme: colorThemeReducer,
  libraries: LibrariesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
