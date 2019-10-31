import { Store } from 'vuex'
import { TreeNode, INITIAL_TREE_NODE, TreeType } from '../types/TreeNode'
import { State, MyGetters, MyActions, MyMutations, SHOW_ALERT_MSEC } from '../types/vuex-type'

const state = (): State => ({
  root: INITIAL_TREE_NODE,
  showDialog: false,
  dialogMessage: '',
  alertType: null,
  alertMessage: ''
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
  alertType: (state: State) => state.alertType,
  alertMessage: (state: State) => state.alertMessage,
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
  showDialog: (state, { showDialog, message }) => {
    state.showDialog = showDialog
    state.alertMessage = message
  },
  showAlert: (state, { alertType, message }) => {
    if (alertType === null) return
    state.alertType = alertType
    state.alertMessage = message
    setTimeout(() => {
      state.alertType = null
      state.alertMessage = ''
    }, SHOW_ALERT_MSEC)
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
