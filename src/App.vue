<template>
  <div id="app" class="el-container is-vertical">
    <div id="header" class="el-header">
      header dayo!
      <input-token-dialog @send-token="getRepository" />
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
      Token: '',
      tree: [],
      RepositoryContents: 'https://api.github.com/repos/sekiya9311/CplusplusAlgorithmLibrary/contents',
      AccessToken: '',
      sourceData: {
        name: 'main',
        content: 'int main() {}'
      },
      sourcePageVisible: false
    }
  },
  components: {
    InputTokenDialog,
    RepositoryTree,
    SourcePage,
    SearchResults
  },
  methods: {
    getRepository (tkn) {
      console.log(this)
      this.Token = tkn
      console.log('token: ' + this.Token)
      // TODO: get repository tree
      //       send RepositoryTree and SearchResult
      this.getTree(this.Token)
    },
    getApi (path, func) {
      axios.get(path).then((res) => {
        func(res.data)
      }).catch((err) => {
        console.log(err)
        console.log('path: ' + path)
      })
    },
    getTree (token) {
      if (token) {
        this.AccessToken = 'access_token=' + token
      }
      this.getApi(this.RepositoryContents + '/?' + this.AccessToken, (data) => {
        data.forEach((item) => {
          this.makeTree(item, (node) => {
            this.tree.push(node)
          })
        })
      })
    },
    makeTree (node, func) {
      let retTree = {
        name: node.name,
        content: '',
        link: node.url,
        nodes: []
      }
      if (node.type === 'file') {
        if (node.name.endsWith('cpp')) {
          // cppファイル以外は無視
          this.getApi(node.download_url, (data) => {
            retTree.content = data
            func(retTree)
          })
        }
      } else if (node.type === 'dir') {
        this.getApi(node.url + '&' + this.AccessToken, (data) => {
          data.forEach((item) => {
            this.makeTree(item, (child) => {
              retTree.nodes.push(child)
            })
          })
          func(retTree)
        })
      }
    },
    setSourceCode (data) {
      this.sourceData = data
      this.sourcePageVisible = true
      const foo = setInterval(() => {
        if (document.getElementsByClassName('el-dialog__wrapper')[1].scrollTop) {
          document.getElementsByClassName('el-dialog__wrapper')[1].scrollTop = 0
        }
        clearInterval(foo)
      }, 10)
      console.log(this.sourceData.content)
    }
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
