<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">InputGithubToken</el-button>
      <el-dialog title="Input Github Token" :visible.sync="dialogVisible">
        <el-input placeholder="Token" v-model="token" />
        <el-button type="primary" @click="inputToken">InputToken</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      token: ''
    }
  },
  methods: {
    inputToken () {
      // TODO: repository get logic (in App.vue or RepositoryTree.vue ?)
      console.log('token : ' + this.token)
      this.dialogVisible = false
    }
  }
}
</script>

<style>
</style>
