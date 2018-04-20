import Vue from 'vue'
import Router from 'vue-router'
import FoodRecord from 'c/FoodRecord/FoodRecord'
import sort from 'c/sort/sort'
import homePage from 'c/homePage/homePage'
import myInformation from 'c/myInformation/myInformation'
import shoppingCar from 'c/shoppingCar/shoppingCar'
import City from 'c/homePage/City'
import foodSort from 'c/FoodRecord/foodsort/foodsort'
import nod from 'c/FoodRecord/nod/nod'
import indexPage from 'c/indexPage/indexPage'
import informations from 'c/informations/informations'
import search from 'c/search/search'
import login from 'c/myInformation/login'
import register from 'c/myInformation/register'
import goodList from 'c/goodList/goodList'
import goodsDetail from 'c/goodsDetail/goodsDetail'
import evl from 'c/goodsDetail/evl'
import prod from 'c/goodsDetail/prod'
import addressWrap from 'c/myInformation/addressWrap'
import addressDetail from 'c/myInformation/addressDetail'

Vue.use(Router);
let routes = [
  {
    path:'/',
    redirect:'/indexPage'
  },
  {
    path:'/indexPage',
    component:indexPage,
    children:[
      {
        path:'/',
        redirect:'homePage'
      },
      {
        path:'FoodRecord',
        component:FoodRecord,
        children:[
          {
            path:'foodsort',
            name:'foodSort',
            component:foodSort
          },
          {
            path:'nod',
            name:'nod',
            component:nod
          }
        ]
      },
      {
        path:'sort',
        component:sort
      },
      {
        path:'homePage',
        component:homePage

      },
      {
        path:'myInformation',
        component:myInformation
      },

    ]
  },
  {
    path:'/informations',
    component:informations,
    children:[
      {
        path:'City',
        component:City
      },
      {
        path:'search',
        component:search
      },
      {
        path:'login',
        component:login
      },
      {
        path:'register',
        component:register
      },
      {
        path:'goodList',
        component:goodList
      },
      {
        path:'shoppingCar',
        component:shoppingCar
      },
      {
        path:'goodsDetail',
        component:goodsDetail,
        children:[
          {
            path:'/',
            register:'prod'
          },
          {
            path:'prod',
            component:prod
          },
          {
            path:'evl',
            component:evl
          }
        ]
      },
      {
        path:'addressWrap',
        component:addressWrap
      },
      {
        path:'addressDetail/:addressData',
        component:addressDetail,
        name:'addressDetail'
      }
    ]
  }


]

export default new Router({
  routes:routes,
  linkActiveClass:'act'
})
