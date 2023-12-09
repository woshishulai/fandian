import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Pinpai from '../components/pinpai/pinpai.vue'// 品牌页
import Footer from '../components/owned/footer.vue'// 公共底部
import Header from '../components/owned/header.vue'// 公共头部
import Signin from '../components/owned/signin.vue'
import Hotel from '../components/hotel/hotel.vue'// 酒店与度假酒店
import QueryHotel from '../components/rooms/queryhotel.vue'// 日历
import Rooms from '../components/rooms/rooms.vue'// 住宿
import RoomsList from '../components/rooms/roomslist.vue'// 房型列表
import RoomsDetail from '../components/rooms/roomsdetail.vue'// 房型详情
import Order from '../components/rooms/order.vue'// 订单支付
import Meal from '../components/meal/meal.vue'// 餐饮
import MealDetail from '../components/meal/mealdetail.vue'// 餐饮-单个餐厅酒吧介绍页
import Banquet from '../components/banquet/banquet.vue'// 宴会
import BanquetYu from '../components/banquet/banquestyu'// 宴会
import NewsList from '../components/news/newslist.vue'// 新闻列表
import NewsDetail from '../components/news/newsdetail.vue'// 新闻详情
import Tuku from '../components/news/tuku.vue'// 图库展示
import Century from '../components/century/century.vue'// 体验
import Ambitus from '../components/ambitus/ambitus.vue'// 世纪会
import Law from '../components/ambitus/law.vue'// 世纪会
import Media from '../components/ambitus/media.vue'// 媒体中心
import Contact from '../components/ambitus/contact.vue'// 联系我们
import Details from '../components/ambitus/details.vue'// 详情页
import Forgrt from '../components/owned/forgrt.vue'//忘记密码
import orderlist from '../components/rooms/orderlist.vue'// 订单列表

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/pinpai',
    component: Pinpai,// 品牌页
    name: 'Pinpai'
  },
  {
    path: '/footer',
    component: Footer, // 公共底部
    name: 'Footer'
  },
  {
    path: '/header',
    component: Header, // 公共头部
    name: 'Header'
  },
  //Signin
  {
    path: '/signin',
    component: Signin, // 登录注册
    name: 'Signin'
  },
  {
    path: '/forgrt',
    component: Forgrt, // 忘记密码
    name: 'Forgrt'
  },
  {
    // path: '/hotel',
    path: '/',
    component: Hotel, // 酒店与度假酒店
    name: 'Hotel'
  },
  {
    path: '/rooms',
    component: Rooms, //住宿
    name: 'Rooms'
  },
  {
    path: '/roomslist',
    component: RoomsList, // 房型列表
    name: 'RoomsList'
  },
  {
    path: '/roomsdetail',
    component: RoomsDetail, // 房型详情
    name: 'RoomsDetail'
  },
  {
    path: '/order',
    component: Order, // 订单支付
    name: 'Order'
  },
  {
    path: '/meal',
    component: Meal, // 餐饮
    name: 'Meal'
  },
  {
    path: '/mealdetail',
    component: MealDetail, // 餐饮详情
    name: 'MealDetail'
  },
  {
    path: '/banquet',
    component: Banquet, // 宴会
    name: 'Banquet'
  },
  {
    //BanquetYu
    path: '/banquetyu',
    component: BanquetYu, // 宴会
    name: 'BanquetYu'
  },
  {
    path: '/newslist',
    component: NewsList, // 新闻列表
    name: 'NewsList'
  },
  {
    path: '/newsdetail',
    component: NewsDetail, // 新闻详情
    name: 'NewsDetail'
  },
  {
    path: '/tuku',
    component: Tuku, // 图库展示
    name: 'Tuku'
  },
  {
    path: '/century',
    component: Century, // 体验
    name: 'Century'
  },
  {
    path: '/ambitus',
    component: Ambitus, // 世纪会
    name: 'Ambitus'
  },
  {
    path: '/law',
    component: Law, // 法律声明
    name: 'Law'
  },
  {
    path: '/media',
    component: Media, // 媒体中心
    name: 'Media'
  },
  {
    path: '/contact',
    component: Contact, // 联系我们
    name: 'Contact'
  },
  {
    //datails
    path: '/details',
    component: Details, // 各种优惠信息详情页
    name: 'Details'
  },
  // /import QueryHotel from '../components/rooms/queryhotel.vue'// 日历
  {
    path: '/queryhotel',
    component: QueryHotel, // 日历
    name: 'QueryHotel'
  },
  {
    path: '/orderlist',
    component: orderlist, // 订单列表
    name: 'orderlist'
  },
]

//roomsdetail
const router = new VueRouter({
  routes,
  // mode: 'history'
})




export default router
