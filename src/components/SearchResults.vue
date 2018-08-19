<template>
  <div>
    <div class="row" v-for="(rows, key, idx) in getResults" :key="idx">
      <el-row :gutter="10">
        <div class="columns" v-for="(data, key, idx) in rows" :key="idx">
          <el-col :span="10">
            <search-result :data="data" />
          </el-col>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import SearchResult from '@/components/SearchResult'
export default {
  data () {
    return {
      searchResultLibs: []
    }
  },
  props: ['searchWord'],
  components: {
    SearchResult
  },
  methods: {
  },
  computed: {
    getResults () {
      let searchResultLibs = this.$store.getters.searchLibraries(this.searchWord)
      const colLength = 4
      let dataArray2D = []
      if (searchResultLibs) {
        for (let i = 0; i < searchResultLibs.length; i++) {
          dataArray2D.push(searchResultLibs.slice(i, i + colLength))
          i += colLength
        }
      }
      return dataArray2D.length ? dataArray2D : [[{name: 'empty', content: 'no results;'}]]
    }
  }
}
</script>

<style>
</style>
