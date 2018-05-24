
import Vue from 'vue'
import axios from 'axios'

// RepositoryContents + path
// if (path === '') all
const RepositoryContents = 'https://api.github.com/repos/sekiya9311/CplusplusAlgorithmLibrary/contents/'

module.exports = new Vue({
  data: {
    tree: []
  },
  methods: {
    getApi(path, func) {
      axios.get(path).then((res) => {
        func(res.data)
      })
    },
    getTree() {
      this.getApi(RepositoryContents, (data) => {
        data.forEach((item) => {
          this.makeTree(item, (node) => {
            this.tree.push(node)
          })
        })
      })
    },
    makeTree(node, func) {
      let retTree = {
        name: node.name,
        content: '',
        link: url,
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
        this.getApi(node.url, (data) => {
          data.forEach((item) => {
            this.makeTree(item, (child) => {
              retTree.nodes.push(child)
            })
          })
          func(retTree)
        })
      }
    }
  }
})