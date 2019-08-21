<template>
  <div>
    <div>
      <strong>
        {{title}}
      </strong>
      <v-btn @click="this.clickCopyButton">
        <v-icon left dark>file-copy</v-icon> Copy
      </v-btn>
    </div>
    <div>
      <pre class="hljs">
        <code v-html="highlightedSourceCode" />
      </pre>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import hljs from 'highlight.js' // NOT TYPE SAFE !! 😠

export default Vue.extend({
  props: {
    title: String,
    sourceCode: String,
    onCopy: Function // NOT TYPE SAFE !! 😠
  },
  methods: {
    clickCopyButton() {
      const success = this.copy(this.sourceCode)
      this.onCopy(success)
    },
    copy(source: string): boolean {
      const selection = window.getSelection()
      if (!selection) {
        return false
      }
      selection.removeAllRanges()

      const tmpTxtArea = document.createElement('textarea')
      tmpTxtArea.textContent = source

      document.body.appendChild(tmpTxtArea)
      tmpTxtArea.select()

      const functionSupported = document.execCommand('copy')

      document.body.removeChild(tmpTxtArea)

      return functionSupported
    }
  },
  computed: {
    highlightedSourceCode(): String {
      return hljs.highlightAuto(this.sourceCode, ['cpp']).value
    }
  }
})
</script>

<style scoped>
</style>
