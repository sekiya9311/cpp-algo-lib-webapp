
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
      axios.get(path)
      .then(res => {
        func(res.data)
      })
    },
    getTree() {
      this.getApi(RepositoryContents, (data) => {

      })
    },
    makeTree(node) {
      // return tree with node as root
      if (node.type === 'file') {
        if (node.name.endsWith('cpp')) {
          // cppファイル以外は無視
          this.getApi(node.download_url, (data) => {
            Object.defineProperties(node, 'source', data)
          })
        }
      } else if (node.type === 'dir') {
      }
      return node
    }
  }
})