// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
// import store from "./vuex/store"
import i18n from '@/plugin/vue-i18n'
import Axios from '@/plugin/axios'
import '@/assets/css/app.less'
import '@/assets/css/commin.less'
import '@/assets/css/threesixty.css'
import Moment from 'moment'
import IdcmComponent from '@/components/index'
import $ from 'jquery'
import animate from 'animate.css'

Vue.use(IdcmComponent)

Vue.use(ElementUI)

Vue.prototype.$http = Axios

Vue.prototype.$moment = Moment

//设置全局钩子
// router.beforeEach((to, from, next) => {
//   gtag('config', 'UA-112072640-1', {
//     // 'page_title': 'homepage',
//     // 'page_location': 'http://foo.com/home',
//     'page_path': `/#${to.path}`
//   });
//   _hmt.push(['_trackPageview', `/#${to.path}`]);
//   // console.log(to.path)
//   next()
// })


// Vue.filter('currency', function(value) {
//   if (!value) { return ''}
//   value = value.toString()
//   return value.substr(0, value.indexOf('.')+3)
// })

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  // store,
  template: '<App/>',
  components: { App },
  data(){
    return{
      proEvent:new Vue()
    }
  }
})
