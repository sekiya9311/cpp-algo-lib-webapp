<template>
  <div id="app" class="el-container is-vertical">
    <div id="header" class="el-header">
      競技プログラミング用C++ライブラリ by sekiya9311
      <el-input v-model="searchWord" />
    </div>
    <div class="el-container">
      <div id="sidebar" class="el-aside">
        Library List
        <repository-tree @send-click-code="displayCode" />
      </div>
      <div id="main" class="el-main">
        <search-results :search-word="searchWord" />
        <el-dialog :title="sourceData.name" :visible.sync="sourcePageVisible">
          <source-page />
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import RepositoryTree from './components/RepositoryTree'
import SearchResults from './components/SearchResults'
import SourcePage from './components/SourcePage'
import { Loading } from 'element-ui'
import {
  ADD_TREE,
  SET_TREE
} from './vuex/mutation-type'
export default {
  name: 'App',
  data () {
    return {
      sourcePageVisible: false,
      searchWord: '',
      searchResultLibs: [],
      sourceData: this.$store.getters.getDisplaySourceData
    }
  },
  components: {
    RepositoryTree,
    SourcePage,
    SearchResults
  },
  methods: {
    displayCode () {
      this.sourcePageVisible = true
      const id = setInterval(() => {
        let dlgDom = document.getElementsByClassName('el-dialog__wrapper')
        if (dlgDom[0].scrollTop) {
          dlgDom[0].scrollTop = 0
          clearInterval(id)
        }
      }, 10)
    }
  },
  mounted () {
    let loading = Loading.service({ fullscreen: true })
    this.$store.dispatch(SET_TREE).then(() => {
      loading.close()
    }).catch(err => {
      console.log(err)
      this.$store.commit(ADD_TREE, {
        name: 'Error!',
        content: 'Error!'
      })
      loading.close()
    })
  },
  computed: {
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
.el-aside {
  width: 250px;
}
</style>
