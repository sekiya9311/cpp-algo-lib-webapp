<template>
  <div id="app">
    <el-container>
      <el-header>
        <span class="title">
          競技プログラミング用C++ライブラリ by sekiya9311
        </span>
      </el-header>
    <el-container>
      <el-aside>
        <span class="el-search-text">
          <el-input v-model="searchWord" placeholder="Search" />
        </span>
        <span>
          Library List
        </span>
        <repository-tree @send-click-code="displayCode" />
      </el-aside>
      <el-main>
        <search-results :search-word="searchWord" />
          <el-dialog :title="sourceData.name" :visible.sync="sourcePageVisible">
            <source-page />
          </el-dialog>
        </el-main>
      </el-container>
    </el-container>
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
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.el-aside {
  width: 250px;
}
.el-header {
  display: flex;
  margin: auto;
}
</style>
