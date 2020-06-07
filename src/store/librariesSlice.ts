import { createSlice } from '@reduxjs/toolkit';
import { TreeNode, INITIAL_TREE_NODE } from '../types/TreeNode';

interface LibrariesState {
  root: TreeNode;
}

const initialState: LibrariesState = {
  root: INITIAL_TREE_NODE,
};

const libraries = createSlice({
  name: 'libraries',
  initialState,
  reducers: {},
});

export const { reducer } = libraries;
