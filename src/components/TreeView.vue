<template>
  <v-treeview
    :items="root.children"
    :active.sync="selectedId"
    open-on-click
    activatable />
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { TreeNode, TreeType } from '../types/TreeNode'

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
      root: {
        children: [] as DecorateTreeNode[]
      } as DecorateTreeNode,
      nodeCount: 0,
      selectedId: [] as number[]
    }
  },
  mounted() {
    this.root = this.decorate(this.rootNode)
  },
  computed: {
    selectedNode(): DecorateTreeNode | null {
      const id = this.selectedId.length ? this.selectedId[0] : -1
      return this.getNode(id)
    }
  },
  methods: {
    decorate(node: TreeNode): DecorateTreeNode {
      const curId = this.nodeCount++
      return {
        id: curId,
        title: node.title,
        sourceCode: node.sourceCode,
        children: node.children.map(this.decorate),
        type: node.type
      }
    },
    getNode(id: number, currentNode?: DecorateTreeNode): DecorateTreeNode | null {
      currentNode = currentNode || this.root

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
      const selectedTreeNode = this.selectedNode || ({
        title: '',
        sourceCode: '',
        children: [],
        type: TreeType.leaf
      } as TreeNode)

      this.onSelected(selectedTreeNode)
    }
  }
})
</script>

<style scoped>
</style>
