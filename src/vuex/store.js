import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tree: [],
    searchResultData: [],
    sourceData: {
      name: 'main',
      content: 'int main() {}'
    },
    displaySourceData: {
      name: 'empty',
      content: 'empty'
    }
  }
})
