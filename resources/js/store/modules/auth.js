import axios from 'axios'
import Cookies from 'js-cookie'
import * as types from '../mutation-types'
// import Vue from 'vue/types/vue'
import Vue from 'vue'
import i18n from '../../plugins/vue-i18n'

// state
export const state = {
  user: null,
  dps: null,
  token: Cookies.get('token')
}

// mutations
export const mutations = {
  [types.SAVE_TOKEN] (state, { token, remember }) {
    state.token = token
    Cookies.set('token', token, { expires: remember ? 365 : null })
  },
  
  [types.FETCH_USER_SUCCESS] (state, { user }) {
    state.user = user
  },
  
  [types.FETCH_USER_FAILURE] (state) {
    state.token = null
    Cookies.remove('token')
  },
  
  [types.FETCH_DPS_SUCCESS] (state, { settings }) {
    state.dps = settings
  },
  [types.DPS_SETTINGS_UPDATE] (state, { item, value }) {
    Vue.set(state.dps, item, value)
  },
  [types.FETCH_DPS_USER_SETTINGS_SUCCESS] (state, { settings }) {
    state.user.settings = settings
  },
  [types.DPS_USER_SETTINGS_UPDATE] (state, { item, value }) {
    Vue.set(state.user.settings, item, value)
  },
  [types.LOGOUT] (state) {
    state.user = null
    state.token = null
    Cookies.remove('token')
  },
  
  [types.UPDATE_ACCOUNT] (state, { item, value }) {
    Vue.set(state.user, item, value)
  }
}

// actions
export const actions = {
  saveToken ({ commit, dispatch }, payload) {
    commit(types.SAVE_TOKEN, payload)
  },
  
  async fetchAuthUser ({ commit }) {
    try {
      const { data } = await axios.get('/api/user/me')
      commit(types.FETCH_USER_SUCCESS, { user: data.data })
    } catch (e) {
      commit(types.FETCH_USER_FAILURE)
    }
  },
  async fetchDpsSettings ({ commit }) {
    try {
      const { data } = await axios.get('/api/dps')
      commit(types.FETCH_DPS_SUCCESS, { settings: data.data })
    } catch (e) {
      // commit(types.FETCH_DPS_FAILURE)
    }
  },
  async updateDpsSettings ({ commit, state, dispatch }, { item, value }) {
    commit('UI_DPS_SETTINGS_API', true)
    
    axios.post('/api/dps/',
      { 'property': item, 'value': value }
    )
      .then(response => {
        commit(types.DPS_SETTINGS_UPDATE, { item, value })
        dispatch('responseMessage', {
          type: 'success',
          text: 'Settings updated succesfully!',
          modal: false
        })
      })
      .catch(err => {
        dispatch('responseMessage', {
          type: 'error',
          text: 'Settings updated failed!',
          modal: false
        })
        console.log(err)
      })
      .finally(() => (
        commit(types.UI_DPS_SETTINGS_API, false)
      ))
  },
  async fetchUserSettings ({ commit }) {
    try {
      const { data } = await axios.get('/api/settings')
      commit(types.FETCH_DPS_USER_SETTINGS_SUCCESS, { settings: data.data })
    } catch (e) {
      // commit(types.FETCH_DPS_FAILURE)
    }
  },
  async updateUserSettings ({ commit, state, dispatch }, { item, value }) {
    console.log(item, value)
    commit('UI_DPS_SETTINGS_API', true)
    axios.patch('/api/settings/' + item,
      { value }
    )
      .then(response => {
        commit(types.DPS_USER_SETTINGS_UPDATE, { item, value })
        dispatch('responseMessage', {
          type: 'success',
          text: 'User settings updated successfully!',
          modal: false
        })
      })
      .catch(err => {
        dispatch('responseMessage', {
          type: 'error',
          text: 'Settings updated failed!',
          modal: false
        })
        console.log(err)
      })
      .finally(() => (
        commit(types.UI_DPS_SETTINGS_API, false)
      ))
  },
  async updateAccount ({ commit, state, dispatch }, { item, value }) {
    commit(types.UI_USER_API, true)
    commit(types.UPDATE_ACCOUNT, { item, value })
    await axios.patch('/api/user/me', { ...state.user })
      .then(() => {
        dispatch('responseMessage', {
          type: 'success',
          text: 'Settings updated successfully!',
          modal: false
        })
      })
      .catch(err => {
        dispatch('responseMessage', {
          type: 'error',
          text: 'Settings updated failed!',
          modal: false
        })
        console.log(err)
      })
      .finally(() => (
        commit(types.UI_USER_API, false)
      ))
  },
  
  async updatePassword ({ commit, state, dispatch }, new_password) {
    commit(types.UI_PASSWORD_API, true)
    await axios.post('/api/password/me', { 'password': new_password })
      .then(() => {
        dispatch('responseMessage', {
          type: 'success',
          text: 'Password changed successfully!',
          modal: false
        })
      })
      .catch(err => {
        dispatch('responseMessage', {
          type: 'error',
          text: 'Password change failed!',
          modal: false
        })
        console.log(err)
      })
      .finally(() => (
        commit(types.UI_PASSWORD_API, false)
      ))
  },
  async logout ({ commit, state, rootState, dispatch }) {
    commit(types.TOGGLE_APP_LOADING)
    await axios.post('/api/logout')
      .then(() => {
        commit(types.LOGOUT)
      })
      .catch(err => {
        // dispatch('responseMessage', {
        //   type: 'error',
        //   text: 'Logout failed!',
        //   modal: false
        // })
        // console.log(err.response.data.message)
        // if (err.response.data.message === 'Unauthenticated' || err.response.data.message === 'Unauthorized')
        commit(types.LOGOUT)
      })
      .finally(() => {
        // console.log(rootState.ui.app_loading)
        if (rootState.ui.app_loading) {
          commit(types.TOGGLE_APP_LOADING)
        }
      })
  }
}

// getters
export const getters = {
  authUser: state => state.user,
  authToken: state => state.token,
  authCheck: state => state.user !== null,
  settings: state => state.dps,
  userSettings: state => state.user.settings
}
