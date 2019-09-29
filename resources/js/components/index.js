import Vue from 'vue'

import EmailInput from './input/EmailInput'
import ProgressBar from './ProgressBar'
import PasswordInput from './input/PasswordInput'
import TextInput from './input/TextInput'
import SubmitButton from './form/SubmitButton'
import {
  HasError,
  AlertError,
  AlertSuccess
} from 'vform'

[
  EmailInput,
  ProgressBar,
  PasswordInput,
  SubmitButton,
  TextInput,
  HasError,
  AlertError,
  AlertSuccess,
].forEach(Component => {
  Vue.component(Component.name, Component)
})


