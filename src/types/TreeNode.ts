
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
