<template>
  <header>
    <div>
      <div>
        <h1>
          {{siteTitle}}
        </h1>
      </div>
      <h2>
        <icon-link detail="Library"
                  :url="this.libraryRepositoryUrl"
                  :icon="this.icon"
                  fontSize="1.5rem" />
        <icon-link detail="This"
                  :url="this.serviceRepositoryUrl"
                  :icon="this.icon"
                  fontSize="1.5rem" />
      </h2>
    </div>
  </header>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import IconLink from '../components/IconLink.vue'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export default Vue.extend({
  components: {
    IconLink
  },
  props: {
    siteTitle: String,
    serviceRepositoryUrl: String,
    libraryRepositoryUrl: String
  },
  data: () => ({
    icon: faGithub
  })
})
</script>

<style scoped>
header {
  border-bottom: solid 1px #CCCCCC;
  padding: 0.5em 1.5em;
  margin-bottom: 1em;
}

header > div {
  display: flex;
  align-items: center;
}

h2 {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

h2 > * {
  padding: 0.5em;
}

h2:last-child {
  flex-grow: 1;
}
</style>
