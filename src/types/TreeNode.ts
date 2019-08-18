
export enum TreeType {
  internal,
  leaf
}

export interface TreeNode {
  title: String
  sourceCode: String
  children: TreeNode[]
  type: TreeType
}

export const INITIAL_TREE_NODE: TreeNode = {
  title: '',
  sourceCode: '',
  children: [],
  type: TreeType.leaf
}
