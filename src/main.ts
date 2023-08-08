import { createApp } from 'vue'
import './css/app.scss'
import App from './App.vue'
import Router from './router'
import Store from './stores'
import { plugin, defaultConfig } from '@formkit/vue'
import config from '../formkit.config'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import "@/css/icons";
import notify from './helpers/notify'

createApp(App)
  .use(Router)
  .use(Store)
  .use(plugin, defaultConfig(config))
  .use(notify)
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .mount('#app')
