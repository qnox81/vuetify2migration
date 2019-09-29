<template>
  <v-layout row wrap>
    <v-flex xs12>
      <password-input :form="form" :label="$t('main.password')" :v-errors="errors" autocomplete="new-password"
                      name="password" v-model="form.password" v-on:eye="eye = $event"
                      v-validate="'required|min:6'"></password-input>
    </v-flex>
    <v-flex xs12>
      <password-input :form="form" :hide="eye" :label="$t('main.confirm_password')" :v-errors="errors"
                      autocomplete="new-password" data-vv-as="password" hide-icon="true"
                      name="password_confirmation" v-model="form.password_confirmation"
                      v-validate="'required|confirmed:password'"></password-input>
    </v-flex>
  </v-layout>
</template>

<script>
  import Form from 'vform'

  export default {
    name: 'form-user-password',
    data () {
      return {
        required: [v => !!v || 'This field is required'],
        form: new Form({
          password: '',
          password_confirmation: ''
        }),
        eye: true
      }
    },
    methods: {
      updateUser (item, value) {
        // console.log(item, value)
        this.$store.dispatch('updateUser', { item, value })
      }
    },
    computed: {}
  }
</script>

<style scoped>

</style>
