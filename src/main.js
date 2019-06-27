import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/index'
import './registerServiceWorker'
import 'lib-flexible'
// eslint-disable-next-line
import '@/plugin/vant'
import PluginAxios from '@/plugin/axios'
import config from '../config'
import PluginBase64 from '@/plugin/base64'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper /* { default global options } */)

library.add(fas, far, fab)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)
Vue.config.productionTip = false
Vue.use(PluginAxios)
Vue.use(config)
Vue.use(PluginBase64)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
