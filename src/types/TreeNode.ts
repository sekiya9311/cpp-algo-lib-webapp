export enum TreeType {
  internal,
  leaf,
}

export interface TreeNode {
  key: number;
  title: string;
  sourceCode: string;
  children: TreeNode[];
  type: TreeType;
}

export const INITIAL_TREE_NODE: TreeNode = {
  key: -1,
  title: '',
  sourceCode: '',
  children: [],
  type: TreeType.leaf,
};
