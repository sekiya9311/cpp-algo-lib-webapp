<template>
  <div>
    <el-tree v-if="treeData.length" :data="treeData" :props="props" @node-click="nodeClick" />
    <el-tree v-else :data="preTreeData" :props="props" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      preTreeData: [{
        name: 'now loading',
        nodes: [{
          name: 'now loading',
          nodes: [],
          type: 'file'
        }]
      }],
      props: {
        children: 'nodes',
        label: 'name'
      },
      treeData: this.$store.state.tree
    }
  },
  methods: {
    nodeClick (data) {
      if (data.content && data.content.length) {
        this.$store.state.displaySourceData.name = data.name
        this.$store.state.displaySourceData.content = data.content
        this.$emit('send-click-code')
      }
    }
  }
}
</script>

<style>
</style>
