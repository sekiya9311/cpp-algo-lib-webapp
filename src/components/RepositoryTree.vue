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
      }
    }
  },
  props: {
    treeData: Array
  },
  methods: {
    nodeClick (data) {
      if (data.content && data.content.length) {
        this.$emit('send-click-code', data.content)
      }
    },
    setTreeData (data) {
      this.treeData = data
    }
  }
}
</script>

<style>
</style>
