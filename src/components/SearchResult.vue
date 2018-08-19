<template>
  <div class="search-result">
    <div class="title">
      {{ data.name }}
    </div>
    <el-button v-on:click="sourceCopy" v-bind:disabled="!this.data.content">
        Copy
      </el-button>
    <div class="source">
      <pre v-highlightjs="data.content">
        <code class="cpp" />
      </pre>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: ['data'],
  methods: {
    sourceCopy () {
      window.getSelection().removeAllRanges()

      const fooTextArea = document.createElement('textarea')
      fooTextArea.textContent = this.data.content

      document.body.appendChild(fooTextArea)

      fooTextArea.select()

      const isFuntionSupported = document.execCommand('copy')

      document.body.removeChild(fooTextArea)

      if (isFuntionSupported) {
        this.$message({
          message: 'Copied!',
          type: 'success'
        })
      } else {
        this.$message({
          message: 'not supported this function ...',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style>
</style>
