import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
const routes = [
    {
        path: '/header',
        component: () => import('@/components/layout/header.vue')
    },
    {
        path: '/:id?',
        name: 'Hotel',
        component: () => import('@/pages/home/index.vue')
    },
    {
        path: '/:id?/rooms',
        component: () => import('@/pages/rooms/rooms.vue'), //住宿
        name: 'Rooms'
    },
    {
        // path: '/',
        path: '/:id?/roomslist',
        component: () => import('@/pages/rooms/roomslist.vue'), // 房型列表
        name: 'RoomsList'
    },
    {
        path: '/roomsdetail',
        component: () => import('@/pages/rooms/roomsdetail.vue'), // 房型详情
        name: 'RoomsDetail'
    },
    {
        path: '/order',
        component: () => import('@/pages/rooms/order.vue'), // 订单支付
        name: 'Order'
    },
    {
        path: '/meal',
        component: () => import('@/pages/meal/meal.vue'), // 餐饮
        name: 'Meal'
    },
    {
        path: '/mealdetail',
        component: () => import('@/pages/meal/mealdetail.vue'), // 餐饮详情
        name: 'MealDetail'
    },
    {
        path: '/banquet',
        component: () => import('@/pages/banquet/banquet.vue'), // 宴会
        name: 'Banquet'
    },
    {
        path: '/newslist',
        component: () => import('@/pages/news/newslist.vue'), // 新闻列表
        name: 'NewsList'
    },
    {
        path: '/newsdetail',
        component: () => import('@/pages/news/newsdetail.vue'), // 新闻详情
        name: 'NewsDetail'
    },
    {
        path: '/tuku',
        component: () => import('@/pages/news/tuku.vue'), // 图库展示
        name: 'Tuku'
    },
    {
        path: '/century',
        component: () => import('@/pages/century/century.vue'), // 体验
        name: 'Century'
    },
    {
        path: '/ambitus',
        component: () => import('@/pages/ambitus/ambitus.vue'), // 世纪会
        name: 'Ambitus'
    },
    {
        path: '/law',
        component: () => import('@/pages/ambitus/law.vue'), // 法律声明
        name: 'Law'
    },
    {
        path: '/media',
        component: () => import('@/pages/ambitus/media.vue'), // 媒体中心
        name: 'Media'
    },
    {
        path: '/contact',
        component: () => import('@/pages/ambitus/contact.vue'), // 联系我们
        name: 'Contact'
    },
    {
        //datails
        path: '/details',
        component: () => import('@/pages/ambitus/details.vue'), // 各种优惠信息详情页
        name: 'Details'
    },
    // /import QueryHotel from '../components/rooms/queryhotel.vue'// 日历
    {
        path: '/queryhotel',
        component: () => import('@/pages/rooms/queryhotel.vue'), // 日历
        name: 'QueryHotel'
    },
    {
        path: '/orderlist',
        component: () => import('@/pages/rooms/orderlist.vue'), // 订单列表
        name: 'orderlist'
    },
]
const router = createRouter({
    history: createWebHistory(),
    // history: createWebHashHistory(),
    routes,
    // 路由滚动行为定制
    scrollBehavior() {
        return {
            top: 0
        }
    }
});
// 添加全局前置守卫
// router.beforeEach((to, from, next) => {
//     // 获取用户信息的逻辑，可能是从全局状态管理或者其他地方获取
//     const user = useUserInfo();
//     // const userInfo = user.userInfo ? user.userInfo : {}
//     //消息提示
//     const info = (status, msg) => message[status](msg);
//     // console.log('我是router路由 用户的信息为', user.userInfo, 'userInfo对象为', userInfo);
//     // console.log('我是router路由 用户的信息为', user.userInfo, 'userInfo对象为');
//     // 如果用户未登录且要访问的页面不是登录页面，则重定向到登录页面
//     if (Object.keys(user.userInfo).length === 0 && to.path !== '/login' && to.path !== '/register' && to.path !== '/reset-password') {
//         next('/login');
//         info("error", "请先登录");
//     } else {
//         next(); // 继续正常跳转
//     }
// });
export default router;
