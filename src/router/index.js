import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Buy from '@/components/buy/buy'  //直买
import BuyDetail from '@/components/buy/detail'  //直买详情
import Purchase from '@/components/buy/purchase'  //购买详情
import PurchaseResult from '@/components/buy/purchaseResult'  //购买详情
import AddAddress from '@/components/buy/addAddress'  //添加地址
import Prove from '@/components/buy/prove'  //转账证明

import Wealthmanag from '@/components/wealthmanag/wealthmanag' //直售


import Vip from '@/components/vip/vip'  //会籍
import VipDeatil from '@/components/vip/detail'  //会籍详情
import Information from '@/components/information/information'  //资讯
import Detail from '@/components/information/detail'  //资讯详情
import About from '@/components/about/about'  //关于我们

import Login from '@/components/login/login'  //登陆
import People from '@/components/login/people'  //个人中心
import SetPeople from '@/components/login/setPeople'  //设置个人中心
import Public from '@/components/login/public'  //我的发布
import MyCollection from '@/components/login/myCollection'  //我的收藏
import MyBuy from '@/components/login/myBuy'  //我的购买
import Name from '@/components/login/name'  //实名认证
import NameSucess from '@/components/login/nameSucess'  //实名认证
import MyBank from '@/components/login/myBank'  //银行管理
import AddBank from '@/components/login/addBank'  //添加银行卡
import MyMap from '@/components/login/myMap'  //地址管理
import AddMap from '@/components/login/addMap'  //添加地址
import AboutMe from '@/components/login/aboutMe'  //联系我们
import Lodding from '@/components/lodding'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/buy',
      name: 'Buy',
      component: Buy
    },
    {
      path: '/buy/detail',
      name: 'BuyDetail',
      component: BuyDetail
    },
    {
      path: '/buy/addAddress',
      name: 'AddAddress',
      component: AddAddress
    },
    {
      path: '/buy/purchase',
      name: 'Purchase',
      component: Purchase
    },
    {
      path: '/buy/purchaseResult',
      name: 'PurchaseResult',
      component: PurchaseResult
    },
    {
      path: '/buy/prove',
      name: 'Prove',
      component: Prove
    },
    {
      path: '/wealthmanag',
      name: 'Wealthmanag',
      component: Wealthmanag
    },
    {
      path: '/vip',
      name: 'Vip',
      component: Vip
    },
    {
      path: '/vip/detail',
      name: 'VipDeatil',
      component: VipDeatil
    },
    {
      path: '/information',
      name: 'Information',
      component: Information
    },
    {
      path: '/information/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/login/people',
      name: 'People',
      component: People
    },
    {
      path: '/login/setPeople',
      name: 'SetPeople',
      component: SetPeople
    },
    {
      path: '/login/public',
      name: 'Public',
      component: Public
    },
    {
      path: '/login/myCollection',
      name: 'MyCollection',
      component: MyCollection
    },
    {
      path: '/login/myBuy',
      name: 'MyBuy',
      component: MyBuy
    },
    {
      path: '/login/name',
      name: 'Name',
      component: Name
    },
    {
      path: '/login/nameSucess',
      name: 'NameSucess',
      component: NameSucess
    },
    {
      path: '/login/myBank',
      name: 'MyBank',
      component: MyBank
    },
    {
      path: '/login/addBank',
      name: 'AddBank',
      component: AddBank
    },
    {
      path: '/login/myMap',
      name: 'MyMap',
      component: MyMap
    },
    {
      path: '/login/addMap',
      name: 'AddMap',
      component: AddMap
    },
    {
      path: '/login/aboutMe',
      name: 'AboutMe',
      component: AboutMe
    },
    {
      path: '/lodding',
      name: 'Lodding',
      component: Lodding
    }
  ]
})
