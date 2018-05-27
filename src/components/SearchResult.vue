<template>
  <div>
    <div class="title">
      {{ data.name }}
    </div>
    <div class="source">
      <pre>
        <code class="language-cpp">
          {{ data.content }}
        </code>
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
</style>
