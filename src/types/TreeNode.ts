
export enum TreeType {
  internal,
  leaf
}

export interface TreeNode {
  isOpen: boolean
  title: String
  sourceCode: String
  children: TreeNode[]
  type: TreeType
}
