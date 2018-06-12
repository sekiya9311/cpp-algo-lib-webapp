<template>
  <div>
    <div class="title">
      {{ data.name }}
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
    return {}
  },
  props: ['data']
}
</script>

<style>
.source {
  text-align: left
}
</style>
