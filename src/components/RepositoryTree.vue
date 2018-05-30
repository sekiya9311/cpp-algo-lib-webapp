<template>
  <div>
    <el-tree :data="treeData" :props="props" @node-click="nodeClick">
    </el-tree>
  </div>
</template>

<script>
export default {
  data () {
    return {
      treeData: [{
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
  methods: {
    nodeClick (data) {
      if (data.type === 'file') {
        console.log('file dayo')
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
