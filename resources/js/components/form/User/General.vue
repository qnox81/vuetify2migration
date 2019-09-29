<template>
  <v-layout row wrap>
    <v-flex md6 xs12>
      <v-text-field
        :loading="this.$store.state.settings.user_loading"
        :label="$t('form.name_usr')"
        :rules=required
        outline
        background-color="accent"
        ref="name_usr"
        v-model="name_usr"
      ></v-text-field>
    </v-flex>
    <v-flex md6 xs12>
      <v-text-field
        :loading="this.$store.state.settings.user_loading"
        :label="$t('form.email')"
        :rules=required
        outline
        background-color="accent"
        ref="email"
        v-model="email"
      ></v-text-field>
    </v-flex>
    <v-flex md6 xs12>
      <v-select
        :loading="this.$store.state.settings.net_loading"
        :label="$t('form.language_usr')"
        :items="languages"
        background-color="primary"
        outline
        ref="language_usr"
        item-text="text"
        item-value="value"
        v-model="language_usr"
      ></v-select>
    </v-flex>
  </v-layout>
</template>

<script>
  const DEFAULT_LANGUAGE = [
    { text: ' - please select - ', value: null },
    { text: 'Polski (Polish)', value: 'pl' },
    { text: 'English', value: 'en' },
    { text: 'Spanish', value: 'es' }
  ]
  export default {
    name: 'form-user-general',
    data () {
      return {
        required: [v => !!v || 'This field is required'],
        languages: DEFAULT_LANGUAGE
      }
    },
    methods: {
      updateUser (item, value) {
        // console.log(item, value)
        this.$store.dispatch('updateUser', { item, value })
      }
    },
    computed: {
      name_usr: {
        get () {
          return this.$store.state.settings.user_edited.name_usr
        },
        set (value) {
          this.updateUser('name_usr', value)
        }
      },
      email: {
        get () {
          return this.$store.state.settings.user_edited.email
        },
        set (value) {
          this.updateUser('email', value)
        }
      },
      language_usr: {
        get () {
          return this.$store.state.settings.user_edited.language_usr
        },
        set (value) {
          this.updateUser('language_usr', value)
        }
      }
    }
  }
</script>

<style scoped>

</style>
