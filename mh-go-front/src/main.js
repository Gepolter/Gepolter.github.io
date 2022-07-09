import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vSelect from "vue-select"
import "vue-select/dist/vue-select.css"

import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

import VueCollapsiblePanel from '@dafcoe/vue-collapsible-panel'
//import '@dafcoe/vue-collapsible-panel/dist/vue-collapsible-panel.css'

import draggable from 'vuedraggable'

import './assets/fonts/fonts.scss'
import './assets/styles/global.scss'
//.component('v-select-3', vSelect)
createApp(App)
    .use(store)
    .use(router)
    .use(VueCollapsiblePanel)
    .component("v-select", vSelect)
    .component("v-slider", VueSlider)
    .component("draggable", draggable)
    .mount('#app')

