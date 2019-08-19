<template>
  <div>
    <display-source-code
      :title="this.title"
      :sourceCode="this.source"
      :onCopy="this.func" />
    <v-alert v-model="this.displayAlert" :type="this.type">
      {{ copyResultText }}
    </v-alert>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DisplaySourceCode from '../components/DisplaySourceCode.vue'

export default Vue.extend({
  components: {
    DisplaySourceCode
  },
  data: () => ({
    title: 'hoge',
    source: 'int main() { return 0; }',
    isCopySuccess: false,
    copyResultText: '',
    displayAlert: false
  }),
  async mounted() {
    const URL =
      'https://raw.githubusercontent.com/sekiya9311/CplusplusAlgorithmLibrary/master/util/calc_bracket_pair_rank.cpp'
    const res = await fetch(URL)
    this.source = await res.text()
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
    }
  }
})
</script>

<style scoped>
</style>
