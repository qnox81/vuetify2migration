<template>
  <v-btn v-if="block" block :color="color" :loading="busy" :disabled="busy" type="submit">
    {{ label }}
  </v-btn>
  <v-btn v-else-if="text" text :color="color" :loading="busy" :disabled="busy" type="submit">
    {{ label }}
  </v-btn>
  <v-btn v-else :color="color" :loading="busy" :disabled="busy" type="submit">
    {{ label }}
  </v-btn>
</template>

<script>
  export default {
    name: 'submit-button',
    props: {
      form: {
        type: Object,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      text: {
        type: Boolean,
        default: false
      },
      busy: {
        type: Boolean,
        default: false
      },
      block: {
        type: Boolean,
        default: false
      },
      color: {
        type: String,
        default: 'primary'
      }
    }
  }
</script>
