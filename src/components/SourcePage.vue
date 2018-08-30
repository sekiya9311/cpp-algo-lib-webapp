<template>
  <div>
    <div class="btn-div">
      <el-button v-on:click="sourceCopy" v-bind:disabled="!this.data.content">
        Copy
      </el-button>
    </div>
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
    return {
      data: this.$store.getters.getDisplaySourceData
    }
  },
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
.source {
  text-align: left
}
.btn-div {
  text-align: right
}
</style>
