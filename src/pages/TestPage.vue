<template>
  <div>
    <my-header
      siteTitle="Test Page"
      :libraryRepositoryUrl="this.url1"
      :serviceRepositoryUrl="this.url2" />
    <div class="content">
      <aside>
        <tree-view
          :rootNode="this.rootNode"
          :onSelected="() => {}" />
      </aside>
      <main>
        <display-source-code
          :title="title"
          :sourceCode="source"
          :onCopy="func" />
        <display-source-codes
          :nodeArray="this.nodeArray"
          :searchWord="this.searchWord" />
      </main>
    </div>
    <v-alert v-model="this.displayAlert" :type="this.type">
      {{ copyResultText }}
    </v-alert>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import DisplaySourceCode from '../components/DisplaySourceCode.vue'
import DisplaySourceCodes from '../components/DisplaySourceCodes.vue'
import IconLink from '../components/IconLink.vue'
import MyHeader from '../components/Header.vue'
import TreeView from '../components/TreeView.vue'
import { TreeNode, TreeType } from '../types/TreeNode'

export default Vue.extend({
  components: {
    FontAwesomeIcon,
    DisplaySourceCode,
    DisplaySourceCodes,
    IconLink,
    MyHeader,
    TreeView
  },
  data: () => ({
    title: 'hoge',
    source: 'int main() { return 0; }',
    isCopySuccess: false,
    searchWord: '',
    copyResultText: '',
    displayAlert: false,
    url1: 'https://www.google.com',
    url2: 'https://www.yahoo.co.jp',
  }),
  async mounted() {
    const URL =
      'https://raw.githubusercontent.com/sekiya9311/CplusplusAlgorithmLibrary/master/util/calc_bracket_pair_rank.cpp'
    const res = await fetch(URL)
    this.source = await res.text()
    await this.$store.dispatch('setTree')
  },
  methods: {
    func(success: boolean) {
      this.isCopySuccess = success
      this.displayAlert = true
      setTimeout(() => {
        this.displayAlert = false
      }, 2000)
    }
  },
  computed: {
    type(): String {
      return this.isCopySuccess ? 'success' : 'error'
    },
    icon() {
      return faGithub
    },
    rootNode() {
      return this.$store.getters.root as TreeNode
    },
    nodeArray() {
      return this.$store.getters.nodeArray as TreeNode[]
    }
  }
})
</script>

<style scoped>
.content {
  display: flex;
}

.content > main {
  flex-grow: 1;
}
</style>
