<template>
  <v-treeview
    :items="decorateRootNode.children"
    :active.sync="selectedId"
    item-text="title"
    open-on-click
    activatable />
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { TreeNode, TreeType, INITIAL_TREE_NODE } from '../types/TreeNode'

export interface DecorateTreeNode extends TreeNode {
  id: number
  children: DecorateTreeNode[]
}

export default Vue.extend({
  props: {
    rootNode: Object as PropType<TreeNode>,
    onSelected: Function as PropType<(node: TreeNode) => void>
  },
  data() {
    return {
      nodeCount: 0,
      selectedId: [] as number[]
    }
  },
  computed: {
    selectedNode(): DecorateTreeNode | null {
      const id = this.selectedId.length ? this.selectedId[0] : -1
      return this.getNode(id)
    },
    decorateRootNode(): DecorateTreeNode {
      return this.decorate(this.rootNode)
    }
  },
  methods: {
    decorate(node: TreeNode): DecorateTreeNode {
      const curId = this.nodeCount++
      return {
        id: curId,
        ...node,
        children: node.children.map(this.decorate)
      }
    },
    getNode(id: number, currentNode?: DecorateTreeNode): DecorateTreeNode | null {
      currentNode = currentNode || this.decorateRootNode

      if (id === currentNode.id) {
        return currentNode
      }

      const cand = currentNode.children
        .map(v => this.getNode(id, v))
        .find(v => !!v)
      return cand || null
    }
  },
  watch: {
    selectedNode() {
      const selectedTreeNode = this.selectedNode || INITIAL_TREE_NODE

      this.onSelected(selectedTreeNode)
    }
  }
})
</script>

<style scoped>
</style>
