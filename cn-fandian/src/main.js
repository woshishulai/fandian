import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// import configURL from '../public/config.json'
import BaiDuMap from "vue-baidu-map-3x"
const app = createApp(App)
app.config.globalProperties.$axios = axios
// app.config.globalProperties.Baseurl = configURL.Baseurl
app.config.globalProperties.Baseurl = 'https://admin_grand.empark.com.cn/'
app.config.globalProperties.productionTip = false
app.use(router)
app.use(BaiDuMap, {
    ak: 'B8395f4e710558fabefc56c940a40ce5'
})
// 判断设备类型
app.mount('#app')