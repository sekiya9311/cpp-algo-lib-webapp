<template>
  <div id="app" class="el-container is-vertical">
    <div id="header" class="el-header">
      header dayo!
    </div>
    <div class="el-container">
      <div id="sidebar" class="el-aside">
        sidebar dayo!
        <repository-tree @send-click-code="setSourceCode" :tree-data="tree" />
      </div>
      <div id="main" class="el-main">
        <el-dialog title="Source Page" :visible.sync="sourcePageVisible">
          <source-page :data="sourceData" />
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import InputTokenDialog from './components/InputTokenDialog'
import RepositoryTree from './components/RepositoryTree'
import SearchResults from './components/SearchResults'
import SourcePage from './components/SourcePage'
import axios from 'axios'
export default {
  name: 'App',
  data () {
    return {
      tree: [],
      sourceData: {
        name: 'main',
        content: 'int main() {}'
      },
      sourcePageVisible: false
    }
  },
  components: {
    RepositoryTree,
    SourcePage,
    SearchResults
  },
  methods: {
    setSourceCode (data) {
      this.sourceData = data
      this.sourcePageVisible = true
      const id = setInterval(() => {
        let dlgDom = document.getElementsByClassName('el-dialog__wrapper')
        if (dlgDom[0].scrollTop) {
          dlgDom[0].scrollTop = 0
          clearInterval(id)
        }
      }, 10);
    }
  },
  mounted: function() {
    const url = 'https://script.google.com/macros/s/AKfycbyJVBH-DZ-3d_rhj8tdVgvOFGqFYt43F9WA7B-8E-AlGOD5B6Y/exec'
    axios.get(url)
         .then((res) => this.tree = res.data)
         .catch((err) => {
           console.log(err)
           this.sourceData = {
             name: 'Error!',
             content: 'Error!'
           }
         })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
