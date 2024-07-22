import './assets/common.css'
import 'bootstrap'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'


const app = createApp(App)

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$serverUrl = '//localhost:8080/first'
app.use(createPinia())
app.use(router)

app.mount('#app')
