import Vue from 'vue'
import vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(vuex)

// Load store modules dynamically.
const requireContext = require.context('./modules', false, /.*\.js$/)

const modules = requireContext.keys()
  .map(file =>
    [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)]
  )
  .reduce((modules, [name, module]) => {
    modules[name] = module
    return modules
  }, {})

export default new vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules,
  plugins: [createPersistedState({ storage: window.sessionStorage })]
})
