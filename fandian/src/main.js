import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import configURL from '../public/config.json'
import BaiDuMap from "vue-baidu-map"
const app = createApp(App)
app.config.globalProperties.$axios = axios
app.config.globalProperties.Baseurl = configURL.Baseurl
app.config.globalProperties.productionTip = false
app.use(router)
// app.use(BaiDuMap, {
//     ak: 'B8395f4e710558fabefc56c940a40ce5'
// })
app.mount('#app')