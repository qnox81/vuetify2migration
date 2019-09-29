<template>
  <v-app>
    <loading ref="loading"/>
    <transition name="page" mode="out-in">
      <component :is="layout" v-if="layout"/>
    </transition>
  </v-app>
</template>

<script>
  // import Loading from './Loading'
  // import Home from '~/pages/home/index.vue'
  // import App from '~/layouts/app.vue'
  // import Default from '~/layouts/default.vue'

  import Loading from './Loading'

  const requireContext = require.context('../layouts', false, /.*\.vue$/)

  const layouts = requireContext.keys()
      .map(file =>
          [file.replace(/(^.\/)|(\.vue$)/g, ''), requireContext(file)]
      )
      .reduce((components, [name, component]) => {
        components[name] = component.default || component
        return components
      }, {})
  export default {
    el: '#app',
    name: 'App',
    components: {
      Loading
    },

    metaInfo () {
      const { appName } = window.config
      return {
        title: appName,
        titleTemplate: `%s · ${appName}`
      }
    },
    data: () => ({
      layout: null,
      defaultLayout: 'default',
      goDark: false
    }),
    mounted () {
      this.$loading = this.$refs.loading
    },
    methods: {
      /**
       * Set the application layout.
       *
       * @param {String} layout
       */
      setLayout (layout) {
        if (!layout || !layouts[layout]) {
          layout = this.defaultLayout
        }
        this.layout = layouts[layout]
      }
    },
    computed: {
      setTheme () {
        if (this.goDark === true) {
          return (this.$vuetify.theme.dark = true)
        } else {
          return (this.$vuetify.theme.dark = false)
        }
      }
    }
  }
</script>
