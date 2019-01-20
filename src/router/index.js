import Vue from 'vue'
import Router from 'vue-router'

import userRouter from './userRouter';

Vue.use(Router);

//登录
const Form = (resolve) => {
  import ('../page/form').then((module) => {
    resolve(module)
  })
};

//首页
const Home = (resolve) => {
  import ('../page/home').then((module) => {
    resolve(module)
  })
};

//商品列表
const ProductList = (resolve) => {
  import ('../page/productList').then((module) => {
    resolve(module)
  })
};

//商品详情
const ProductDetail = (resolve) => {
  import ('../page/productDetail').then((module) => {
    resolve(module)
  })
};


//关于COI
const About = (resolve) => {
  import ('../page/about').then((module) => {
    resolve(module)
  })
};

//社区
const Community = (resolve) => {
  import ('../page/community').then((module) => {
    resolve(module)
  })
};

//COI行情
const Market = (resolve) => {
  import ('../page/market').then((module) => {
    resolve(module)
  })
};

//资讯
const News = (resolve) => {
  import ('../page/news').then((module) => {
    resolve(module)
  })
};

//资讯
const NewsDetail = (resolve) => {
  import ('../page/newsDetail').then((module) => {
    resolve(module)
  })
};

//个人中心
const User = (resolve) => {
  import ('../page/user').then((module) => {
    resolve(module)
  })
};

//确认订单
const OrderConfirm = (resolve) => {
  import ('../page/orderConfirm').then((module) => {
    resolve(module)
  })
};

//确认订单
const Search = (resolve) => {
  import ('../page/search').then((module) => {
    resolve(module)
  })
};


export default new Router({
  mode: 'history',
  routes: [
    {path: "*", redirect: '/home'}, //路由重定向
    {path: '/form/:type/:invite?', name: 'form', meta: {title: '登录注册'}, component: Form},
    {path: '/home', name: 'home', meta: {id: 0, title: '行权中心'}, component: Home},
    {path: '/about', name: 'about', meta: {id: 1, title: '关于COI'}, component: About},
    {path: '/market', name: 'market', meta: {id: 2, title: '行情'}, component: Market},
    {path: '/productList/:categoryId/:xId', name: 'productList', meta: {id: 0, title: '商品列表'}, component: ProductList},
    {path: '/productDetail/:productId', name: 'productDetail', meta: {id: 0, title: '商品详情'}, component: ProductDetail},
    {
      path: '/OrderConfirm/:productId/:specId/:number/:type',
      name: 'orderConfirm',
      meta: {title: '确定订单'},
      component: OrderConfirm
    },
    {
      path: '/user',
      name: 'user',
      meta: {id: 4, title: '个人中心'},
      component: User,
      children: userRouter
    },
    {path: '/news', name: 'news', meta: {id: 3, title: '资讯'}, component: News},
    {path: '/search/:searchText', name: 'search', meta: {title: '搜索结果'}, component: Search},
    {path: '/newsDetail/:id/:type', name: 'newsDetail', meta: {id: 6, title: '资讯详情'}, component: NewsDetail}
  ]
})
