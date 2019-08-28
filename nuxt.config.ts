import NuxtConfiguration from '@nuxt/config'

const config: NuxtConfiguration = {
  mode: 'spa',

  srcDir: './src/',

  /*
  ** Headers of the page
  */
  head: {
    title: 'C++ Algorithm Library By sekiya9311',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'C++ Algorithm Library By sekiya9311' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/tailwind.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
    'highlight.js/styles/github.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/fontawesome.ts'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/proxy',
    '@nuxtjs/vuetify'
  ],

  proxy: {
    '/.netlify/': {
      target: 'http://localhost:9000',
      pathRewrite: {'^/.netlify/.lambda': ''}
    }
  },
}

export default config
