<template>
  <div>
    <strong>
      {{title}}
    </strong>
    <v-btn @click="this.clickCopyButton">
      <v-icon left>file_copy</v-icon> Copy
    </v-btn>
    <pre class="hljs cpp">
      <code>
        {{sourceCode}}
      </code>
    </pre>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { TreeNode } from '../types/TreeNode'

export default Vue.extend({
  props: {
    title: String,
    sourceCode: String,
    onCopy: Function as PropType<(success: boolean) => void>
  },
  methods: {
    clickCopyButton() {
      const success = this.copy(this.sourceCode)
      this.onCopy(success)
    },
    copy(source: string): boolean {
      window.getSelection().removeAllRanges()

      const tmpTxtArea = document.createElement('textarea')
      tmpTxtArea.textContent = source

      document.body.appendChild(tmpTxtArea)
      tmpTxtArea.select()

      const functionSupported = document.execCommand('copy')

      document.body.removeChild(tmpTxtArea)

      return functionSupported
    }
  }
})
</script>

<style scoped>

</style>
