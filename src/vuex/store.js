import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import {
  ADD_TREE,
  ADD_RANGE_TREE,
  CLEAR_TREE,
  SET_DISPLAY_SOURCE_DATA,
  SET_TREE
} from './mutation-type'

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
  },
  mutations: {
    [ADD_TREE]: (state, data) => {
      state.tree.push(data)
    },
    [ADD_RANGE_TREE]: (state, datas) => {
      datas.forEach(d => state.tree.push(d))
    },
    [CLEAR_TREE]: state => {
      state.tree = []
    },
    [SET_DISPLAY_SOURCE_DATA]: (state, data) => {
      state.displaySourceData.name = data.name
      state.displaySourceData.content = data.content
    }
  },
  actions: {
    [SET_TREE]: (context) => {
      const url = 'https://script.google.com/macros/s/AKfycbyJVBH-DZ-3d_rhj8tdVgvOFGqFYt43F9WA7B-8E-AlGOD5B6Y/exec'
      return new Promise((resolve, reject) => {
        axios.get(url).then(res => {
          context.commit(ADD_RANGE_TREE, res.data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  getters: {
    getTree: state => {
      return state.tree
    },
    getSearchResultData: state => {
      return state.searchResultData
    },
    getSourceData: state => {
      return state.sourceData
    },
    getDisplaySourceData: state => {
      return state.displaySourceData
    },
    searchLibraries: state => word => {
      let ret = []
      let stk = []
      if (word.length === 0) {
        return ret
      }
      state.tree.forEach(d => stk.push(d))
      while (stk.length > 0) {
        let el = stk[stk.length - 1]
        stk.pop()
        if (el.content.length && el.name.indexOf(word) > -1) {
          ret.push(el)
        } else if (el.content.indexOf(word) > -1) {
          ret.push(el)
        }
        el.nodes.forEach(d => stk.push(d))
      }
      return ret
    }
  }
})
