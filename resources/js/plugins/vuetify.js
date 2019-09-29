// v2.0
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

const opts = {
  theme: {
    dark: false,
    light: true,
    themes: {
      light: {
        primary: '#455A64',
        secondary: '#2196f3',
        accent: '#FFC107',
        error: '#ff3d00',
        info: '#80d8ff',
        success: '#4caf50',
        warning: '#fbc02d'
      }
    }
  }
}
export default new Vuetify(opts)
