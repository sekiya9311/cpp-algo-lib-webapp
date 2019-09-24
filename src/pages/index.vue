<template>
  <div>
    <my-header
      :siteTitle="appTitle"
      :libraryRepositoryUrl="libraryUrl"
      :serviceRepositoryUrl="appUrl" />
    <div class="content">
      <aside>
        <v-text-field
          v-model="searchWord"
          label="Search text" />
        <tree-view
          :rootNode="rootNode"
          :onSelected="() => {}" />
      </aside>
      <main>
        <display-source-codes :nodeArray="searchedNodeArray" />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MyHeader from  '../components/Header.vue'
import TreeView from '../components/TreeView.vue'
import DisplaySourceCodes from '../components/DisplaySourceCodes.vue'
import { TreeNode } from '../types/TreeNode'

export default Vue.extend({
  components: {
    MyHeader,
    TreeView,
    DisplaySourceCodes
  },
  data() {
    return {
      appTitle: 'C++ Algorithm Library',
      libraryUrl: 'https://github.com/sekiya9311/CplusplusAlgorithmLibrary',
      appUrl: 'https://github.com/sekiya9311/cpp-algo-lib-webapp',
      searchWord: '',
      data: '',
      tmp: false
    }
  },
  mounted: async function() {
    const res = await fetch('./.netlify/functions/nyaa')
    this.data = await res.text()
    await this.$store.dispatch('setTree')
  },
  computed: {
    rootNode() {
      return this.$store.getters.root as TreeNode
    },
    nodeArray() {
      console.log(this.$store.getters.nodeArray)
      return this.$store.getters.nodeArray as TreeNode[]
    },
    searchedNodeArray(): TreeNode[] {
      return this.$store.getters.filteredNodeArray(this.searchWord)
    }
  }
})
</script>

<style>
.content {
  display: flex;
  margin-right: 5vw;
}

.content > aside {
  width: 25vw;
}
</style>
