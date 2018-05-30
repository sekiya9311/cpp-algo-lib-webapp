<template>
  <div>
    <div class="row" v-for="(rows, key, idx) in getResults" :key="idx">
      <div class="columns" v-for="(data, key, idx) in rows" :key="idx">
        <search-result :data="data" />
      </div>
    </div>
  </div>
</template>

<script>
import SearchResult from '@/components/SearchResult'
export default {
  data () {
    return {
      searchResultNodes: [],
      allData: []
    }
  },
  components: {
    SearchResult
  },
  methods: {
    setAllData (data) {
      this.allData = data
    }
  },
  computed: {
    getResults () {
      const colLength = 4
      let dataArray2D = []
      for (let i = 0; i < this.searchResultNodes.length; i++) {
        dataArray2D.push(this.searchResultNodes.slice(i, i + colLength))
        i += colLength
      }
      return dataArray2D.length ? dataArray2D : [[{name: 'empty', content: 'no results;'}]]
    }
  }
}
</script>

<style>
</style>
