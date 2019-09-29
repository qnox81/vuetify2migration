<template>
  <div>
    welcome
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'welcome-view',

    metaInfo () {
      return { title: this.$t('home') }
    },

    computed: mapGetters({
      authenticated: 'authCheck'
    }),

    data: () => ({
      title: window.config.appName
    })
  }
</script>
