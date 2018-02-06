import Top from '@/components/top'
import Navs from '@/components/nav'
import Foot from '@/components/foot'
import NoMore from '@/components/noneData'
import navList from '@/components/navList'
import Story from '@/components/index/story'

// 导出组件
export default {
  install: function(Vue){
    Vue.component('Top',Top)    //  公共底部
    Vue.component('Navs',Navs)    //  公共底部
    Vue.component('Foot',Foot)    //  公共底部
    Vue.component('no-more',NoMore)    //  公共底部
    Vue.component('navList',navList)    //  公共底部
    Vue.component('story',Story)    //  公共底部
  }
}

