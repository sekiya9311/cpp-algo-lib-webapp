import { Store, GetterTree, ActionTree, MutationTree, ActionContext } from 'vuex'
import { TreeNode, INITIAL_TREE_NODE, TreeType } from '../types/TreeNode'

export interface State {
  root: TreeNode
}

export interface MyGetters extends GetterTree<State, any> {
  root: (state: State) => TreeNode,
  nodeArray: (state: State) => TreeNode[],
  filteredNodeArray: (state: State) => (searchWord: string) => TreeNode[]
}

export interface MyActions extends ActionTree<State, any> {
  setTree: (context: ActionContext<State, any>) => Promise<void>
}

export interface MyMutations extends MutationTree<State> {
  setRootNode: (state: State, payload: { rootChildren: TreeNode[] }) => void
}


const state = (): State => ({
  root: INITIAL_TREE_NODE
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
  }
}

const actions: MyActions = {
  setTree: async context => {
    const Url = './.netlify/functions/GetLibraries'
    const res = await fetch(Url)
    const obj = (await res.json()) as TreeNode[]
    context.commit(mutations.setRootNode.name, { rootChildren: obj })
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
