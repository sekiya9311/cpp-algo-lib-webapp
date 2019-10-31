<template>
  <a :href="this.url" :style="{fontSize: fontSize}" target="__blank">
    <div class="context">
      <div>
        <font-awesome-icon :icon="this.icon" />
      </div>
      <div>
        {{this.detail}}
      </div>
    </div>
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
  display: inline-block;
}

a > div {
  text-align: center;
}

.context > * {
  font-size: 20px;
}

.context > *:first-child {
  margin-bottom: -0.3em;
}
</style>
