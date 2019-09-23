<template>
  <v-container>
    <v-row v-for="(r, rowIdx) in filteredNodeArrayForDisplay" :key="rowIdx">
      <v-col v-for="(cell, cellIdx) in r" :key="cellIdx">
        <display-source-code
          :title="cell.title"
          :sourceCode="cell.sourceCode"
          :onCopy="copied"
          class="w-1/2" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import DisplaySourceCode from './DisplaySourceCode.vue'
import { TreeNode } from '../types/TreeNode'

export default Vue.extend({
  components: {
    DisplaySourceCode
  },
  props: {
    nodeArray: Object as PropType<TreeNode[]>
  },
  computed: {
    filteredNodeArrayForDisplay(): TreeNode[][] {
      const COL_LENGTH_EVERY_ROW = 2
      const res: TreeNode[][] = []
      const rowLength =
        (this.nodeArray.length + COL_LENGTH_EVERY_ROW - 1) / COL_LENGTH_EVERY_ROW
      for (let i = 0; i < rowLength; i++) {
        const cur: TreeNode[] = []
        for (let j = 0; j < COL_LENGTH_EVERY_ROW &&
                        i * COL_LENGTH_EVERY_ROW + j < this.nodeArray.length; j++) {
          cur.push(this.nodeArray[i * COL_LENGTH_EVERY_ROW + j])
        }
        res.push(cur)
      }

      return res
    }
  },
  methods: {
    copied(success: boolean) {

    }
  }
})
</script>

<style scoped>

</style>
