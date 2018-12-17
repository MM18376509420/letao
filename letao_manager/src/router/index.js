import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Users from '@/views/user/Users'
import Onecategory from '@/views/category/Onecategory'
import categorySecond from '@/views/category/categorySecond'
import productList from '@/views/productList/productList'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: { 'name': 'Login' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [{
      path: '/user',
      name: 'Users',
      component: Users
    },
    {
      path: '/one',
      name: 'Onecategory',
      component: Onecategory
    },
    {
      path: '/tow',
      name: 'categorySecond',
      component: categorySecond
    },
    {
      path: '/product',
      name: 'productList',
      component: productList
    }
    ]
  }
  ]
})
