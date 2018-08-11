<template>
  <div>
    <el-tree v-if="treeData.length" :data="treeData" :props="props" @node-click="nodeClick" />
    <el-tree v-else :data="preTreeData" :props="props" />
  </div>
</template>

<script>
import {
  SET_DISPLAT_SOURCE_DATA
} from '../vuex/mutation-type'
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
      treeData: this.$store.getters.getTree
    }
  },
  methods: {
    nodeClick (data) {
      if (data.content && data.content.length) {
        this.$store.commit(SET_DISPLAT_SOURCE_DATA, data)
        this.$emit('send-click-code')
      }
    }
  }
}
</script>

<style>
</style>
