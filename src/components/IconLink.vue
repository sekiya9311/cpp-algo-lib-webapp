<template>
  <a :href="this.url" :style="{fontSize: fontSize}" target="__blank">
    <font-awesome-icon :icon="this.icon" />
    <small>
      {{this.detail}}
    </small>
  </a>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'

export default Vue.extend({
  props: {
    icon: Object as PropType<IconDefinition>,
    url: String,
    detail: String,
    fontSize: String
  },
  components: {
    FontAwesomeIcon
  }
})
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
