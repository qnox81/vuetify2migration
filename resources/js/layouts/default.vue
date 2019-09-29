<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height :class="($vuetify.breakpoint.lgAndDown) ? 'pa-1' : ''">
        <transition name="fade" mode="out-in">
          <router-view :key="$route.fullPath"></router-view>
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'layout-default',
    data: () => ({
      dialog: false
    }),
    computed: {
      ...mapGetters(['appLoading'])
    },
    props: {
      source: String
    }
  }
</script>

<style type="text/css">
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
