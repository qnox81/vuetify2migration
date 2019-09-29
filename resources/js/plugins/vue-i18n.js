import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const { locale, translations } = window.config

const i18n = new VueI18n({
  locale,
  messages: {
    [locale]: translations
  },
  silentTranslationWarn: true
})

export default i18n
