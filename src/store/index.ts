import { Store, GetterTree, ActionTree, MutationTree, ActionContext } from 'vuex'
import { TreeNode, INITIAL_TREE_NODE, TreeType } from '../types/TreeNode'

export interface State {
  root: TreeNode
  showDialog: boolean
  dialogMessage: string
}

export interface MyGetters extends GetterTree<State, any> {
  root: (state: State) => TreeNode,
  showDialog: (state: State) => boolean,
  dialogMessage: (state: State) => string,
  nodeArray: (state: State) => TreeNode[],
  filteredNodeArray: (state: State) => (searchWord: string) => TreeNode[]
}

export interface MyActions extends ActionTree<State, any> {
  setTree: (context: ActionContext<State, any>) => Promise<void>
}

export interface MyMutations extends MutationTree<State> {
  setRootNode: (state: State, payload: { rootChildren: TreeNode[] }) => void,
  setDialogMessage: (state: State, payload: { message: string }) => void,
  setShowDialogFlag: (state: State, payload: { showDialog: boolean }) => void
}


const state = (): State => ({
  root: INITIAL_TREE_NODE,
  showDialog: false,
  dialogMessage: ''
})

const flatTreeNodes = (node: TreeNode): TreeNode[] => {
  if (node.type === TreeType.leaf) {
    return [node]
  }

  const res = node.children.map(flatTreeNodes).flat()
  return res
}

const getters: MyGetters = {
  root: (state: State) => state.root,
  showDialog: (state: State) => state.showDialog,
  dialogMessage: (state: State) => state.dialogMessage,
  nodeArray: state => flatTreeNodes(state.root),
  filteredNodeArray: state => searchWord => (
    // dry か 型 かで型を取りました
    flatTreeNodes(state.root).filter(node => (
      node.type === TreeType.leaf &&
      ( node.title.toLowerCase().includes(searchWord.toLowerCase()) ||
        node.sourceCode.toLowerCase().includes(searchWord.toLowerCase()) )
    ))
  )
}

const mutations: MyMutations = {
  setRootNode: (state, { rootChildren }) => {
    state.root = {
      title: 'root',
      sourceCode: '',
      children: rootChildren,
      type: TreeType.internal
    }
  },
  setShowDialogFlag: (state, { showDialog }) => {
    state.showDialog = showDialog
  },
  setDialogMessage: (state, { message }) => {
    state.dialogMessage = message
  }
}

const actions: MyActions = {
  setTree: async ({ commit }) => {
    const Url = './.netlify/functions/GetLibraries'
    const res = await fetch(Url)
    const obj = (await res.json()) as TreeNode[]
    commit(mutations.setRootNode.name, { rootChildren: obj })
  }
}

const createStore = () => (
  new Store<State>({
    state,
    getters,
    mutations,
    actions
  })
)

export default createStore
