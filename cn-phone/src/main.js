import Vue from 'vue'
import App from './App.vue'
import router from './router'
import configURL from '../public/config.json'


//百度地图
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap,{
  ak:'B8395f4e710558fabefc56c940a40ce5'
})

//引用axios
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.prototype.Baseurl = configURL.Baseurl
// Vue.use(VueAxios, axios)

Vue.config.productionTip = false
Vue.prototype.SCroll=router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
// if (to.meta.title) {
// 	document.title = to.meta.title;
// }

// chrome
document.body.scrollTop = 0
// firefox
document.documentElement.scrollTop = 0
// safari
console.log(window.pageYOffset)
next()

})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
