<template>
  <div>
    <v-treeview
      :items="decorateRootNode.children"
      item-key="id"
      open-on-click>
      <template v-slot:label="{item}">
        <div @click="clickItem(item)">
          {{item.title}}
        </div>
      </template>
    </v-treeview>
  </div>
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
    }
  },
  computed: {
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
    clickItem(item: DecorateTreeNode) {
      if (item.type === TreeType.internal) return

      this.onSelected(item)
    }
  }
})
</script>

<style scoped>
</style>
