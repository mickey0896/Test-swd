import Vue from 'vue'

// *************************** UI Framwork ********************************
// vuesax
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css';

// bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// ********* vuesax ********
Vue.use(Vuesax)

// ********* bootstrap ***********
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// *************************** /UI Framwork ********************************


// *************************** Component ********************************

// Dropdown
import Dropdown from '@/components/Dropdown/Dropdown.vue'

// ******** Dropdown **********
Vue.component('Dropdown', Dropdown);


// *************************** /Component ********************************



// *************************** $API ********************************
import axios from 'axios'
import jwt from '@/middlewares/jwt.js'

Vue.prototype.$http = axios

Vue.prototype.$url2 = "https://swdapi.ddns.net:8094/"

Vue.prototype.$API = new jwt.API()

Vue.prototype.$jwt = jwt
// *************************** /$API ********************************

// *************************** $session ********************************
// session
// import VueSession from 'vue-session'
// Vue.use(VueSession)

// import VueSessionStorage from 'vue-sessionstorage'
// Vue.use(VueSessionStorage)
// *************************** /$session ********************************
