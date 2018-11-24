import Vue from 'vue'
import Router from 'vue-router'

//引入组件
import Index from './views/Index';
import About from './views/About';
import Login from './views/Login';
import News from './views/News';
import NewsDetail from './views/NewsDetail';
import Product from './views/Product';
import ProductDetail from './views/ProductDetail';
import Register from './views/Register';
import Cart from './views/Cart';
import Contact from './views/Contact';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
    {
      path:"/about",
      name: "about",
      component: About
    },
    {
      path:"/contact",
      name: "contact",
      component: Contact
    },
    {
      path:"/login",
      name: "login",
      component: Login
    },
    {
      path:"/register",
      name: "register",
      component: Register
    },
    {
      path:"/news",
      name: "newslist",
      component: News,
    },
    {
      path:"/newsdetail/:nid",
      name: "newsdetail",
      component: NewsDetail
    },
    {
      path:"/product/:type",
      name: "product",
      component: Product,
    },
    {
      path: "/productdetail/:pid",
      name: "productdetail",
      component: ProductDetail
    },
    {
      path:"/cart",
      name: "cart",
      component: Cart
    },
  ]
})
