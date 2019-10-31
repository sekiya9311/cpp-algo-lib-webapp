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
          :onSelected="selectedNode" />
      </aside>
      <main>
        <display-source-codes :nodeArray="searchedNodeArray" />
      </main>
    </div>
    <v-dialog v-model="displaySourceCodeDialog"
              width="75vw">
      <display-source-code
        :title="selectedTitle"
        :sourceCode="selectedSourceCode"
        :onCopy="disabledDialog" />
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MyHeader from  '../components/Header.vue'
import TreeView from '../components/TreeView.vue'
import DisplaySourceCode from '../components/DisplaySourceCode.vue'
import DisplaySourceCodes from '../components/DisplaySourceCodes.vue'
import { TreeNode } from '../types/TreeNode'

export default Vue.extend({
  components: {
    MyHeader,
    TreeView,
    DisplaySourceCode,
    DisplaySourceCodes
  },
  data() {
    return {
      appTitle: 'C++ Algorithm Library',
      libraryUrl: 'https://github.com/sekiya9311/CplusplusAlgorithmLibrary',
      appUrl: 'https://github.com/sekiya9311/cpp-algo-lib-webapp',
      searchWord: '',
      displaySourceCodeDialog: false,
      selectedTitle: '',
      selectedSourceCode: ''
    }
  },
  mounted: async function() {
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
  },
  methods: {
    selectedNode(selectedNode: TreeNode) {
      this.selectedTitle = selectedNode.title
      this.selectedSourceCode = selectedNode.sourceCode
      this.displaySourceCodeDialog = true
    },
    disabledDialog() {
      this.displaySourceCodeDialog = false
    }
  }
})
</script>

<style>
* {
  font-size: 14px;
}

.content {
  display: flex;
}

.content > aside {
  width: 20vw;
}

.content > main {
  flex-grow: 1;
  margin-right: 5em;
}

.v-dialog {
  background-color: white;
}
</style>
