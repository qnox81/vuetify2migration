<template>
  <v-card class="elevation-12">
    <v-alert
      v-if="isDemoEnv()"
      :value="true"
      type="info"
    >
      <p class="text-sm-left">
        App in DEMO mode, please use credentials bellow to login: <br/>
        <br/>
        email: <strong>demo@dpscable.com</strong><br/>
        password: <strong>password</strong>
      </p>
    </v-alert>

    <progress-bar :show="busy" :height="6"></progress-bar>
    <form @submit.prevent="login" @keydown="form.onKeydown($event)">
      <v-card-title primary-title>
        <h3 class="headline mb-0">{{ $t('login.title') }}</h3>
      </v-card-title>
      <v-card-text>
        <!-- Email -->
        <email-input
          :form="form"
          :label="$t('login.email')"
          :v-errors="errors"
          :value.sync="form.email"
          name="email"
          prepend="person_outline"
          v-validate="'required|email'"
        ></email-input>

        <!-- Password -->
        <password-input
          :v-errors="errors"
          :label="$t('login.password')"
          :form="form"
          :value.sync="form.password"
          name="password"
          prepend="lock_outline"
          v-validate="'required|min:6'"
        ></password-input>

        <!-- Remember Me -->
        <v-checkbox
          :label="$t('login.remember_me')"
          color="primary"
          type="checkbox"
          v-model="remember"
          value="true"
          :disabled="isDemoEnv()"
        ></v-checkbox>
        <submit-button :block="true" :form="form" :busy="busy" :label="$t('login.login')"></submit-button>
        <v-alert
          :value="backendError"
          type="error"
        >
          {{this.backendErrorMessage}}
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <router-link
          v-if="!isDemoEnv()"
          :to="{ name: 'password.request' }"
        >
          {{ $t('login.forgot_password') }}
        </router-link>
      </v-card-actions>
    </form>
  </v-card>
</template>

<script>
  import Form from 'vform'
  import axios from 'axios'

  export default {
    name: 'login-view',
    layout: 'guest',
    metaInfo () {
      return { title: this.$t('login.login') }
    },
    data: () => ({
      form: new Form({
        email: '',
        password: ''
      }),
      eye: true,
      remember: false,
      busy: false,
      backendError: false,
      backendErrorMessage: ''
    }),
    activated () {
      this.busy = false
    },
    methods: {
      isDemoEnv () {
        return (process.env.MIX_APP_ENV === 'demo')
      },
      async login () {
        if (await this.formHasErrors()) return
        this.busy = true
        this.backendError = false
        this.backendErrorMessage = ''
        // Submit the form.
        await axios.post('/api/login', { email: this.form.email, password: this.form.password })
            .then(req => {
              // if (!req.data.token) {
              //   this.loginFailed()
              //   return
              // }
              this.$store.dispatch('saveToken', {
                token: req.data.token,
                remember: this.remember
              })
              // Fetch the user.
              this.$store.dispatch('fetchDpsSettings')
              // Redirect home.

              this.$router.push({ name: 'home' })
            })
            .catch(err => {
              this.backendError = true
              this.backendErrorMessage = err.response.data.message
              this.busy = false
            })
            .finally()
      }

    }
  }
</script>
