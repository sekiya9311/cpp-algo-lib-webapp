import { GetterTree, ActionTree, MutationTree, ActionContext } from 'vuex'
import { TreeNode } from '../types/TreeNode'
import { AlertType } from '../types/AlertType'

export const SHOW_ALERT_MSEC = 2000

export interface State {
  root: TreeNode
  showDialog: boolean
  dialogMessage: string
  alertType: AlertType | null
  alertMessage: string
}

export interface MyGetters extends GetterTree<State, any> {
  root: (state: State) => TreeNode,
  showDialog: (state: State) => boolean,
  dialogMessage: (state: State) => string,
  alertType: (state: State) => AlertType | null,
  alertMessage: (state: State) => string,
  nodeArray: (state: State) => TreeNode[],
  filteredNodeArray: (state: State) => (searchWord: string) => TreeNode[]
}

export interface MyActions extends ActionTree<State, any> {
  setTree: (context: ActionContext<State, any>) => Promise<void>
}

export interface MyMutations extends MutationTree<State> {
  setRootNode: (state: State, payload: { rootChildren: TreeNode[] }) => void,
  showDialog: (state: State, payload: { showDialog: boolean, message: string }) => void,
  showAlert: (state: State, payload: { alertType: AlertType | null, message: string }) => void
}
