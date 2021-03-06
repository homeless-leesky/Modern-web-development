import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import axios from 'axios'

Vue.use(VueRouter)
Vue.prototype.$axios = axios
const apiRootPath = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api/' : '/api/'
Vue.prototype.$apiRootPath = apiRootPath
axios.defaults.baseURL = apiRootPath
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

axios.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
  const token = response.data.token
  if (token) localStorage.setItem('token', token)
  return response
}, function (error) {
  return Promise.reject(error)
})

const pageCheck = (to, from, next) => {
  // return next()
  axios.post(`${apiRootPath}page`, { name: to.path.replace('/', '') }, { headers: { Authorization: localStorage.getItem('token') } })
    .then((r) => {
      if (!r.data.success) throw new Error(r.data.msg)
      next()
    })
    .catch((e) => {
      next(`/block/${e.message}`)
    })
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/lv0',
    name: 'lv0',
    component: () => import('../views/test/Lv0.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/lv1',
    name: 'lv1',
    component: () => import('../views/test/Lv1.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/lv2',
    name: 'lv2',
    component: () => import('../views/test/Lv2.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/lv3',
    name: 'lv3',
    component: () => import('../views/test/Lv3.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/user',
    name: 'user',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/manage/User.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/page',
    name: 'page',
    component: () => import('../views/manage/Page.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/site',
    name: 'site',
    component: () => import('../views/manage/Site.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/boards',
    name: 'manageBoards',
    component: () => import('../views/manage/Boards.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/board/:name',
    name: 'board',
    component: () => import('../views/board'),
    beforeEnter: pageCheck
  },
  // {
  //   path: '/header',
  //   name: 'header',
  //   component: () => import('../views/Header.vue')
  // },
  {
    path: '/sign',
    name: 'sign',
    component: () => import('../views/Sign.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/block/:msg',
    name: 'block',
    component: () => import('../views/Block.vue')
  },
  {
    path: '/block/manage',
    name: 'block',
    component: () => import('../views/Block.vue')
  },
  // {
  //   path: '/userCtest',
  //   name: 'userCtest',
  //   component: () => import('../views/userCtest.vue')
  // },
  {
    path: '*',
    name: 'e404',
    component: () => import('../views/E404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
