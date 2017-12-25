<template>
  <div class="About">
      <Top></Top>
      <Navs :num="5"></Navs>
      <div style="min-height: 500px">
        <div class="BannerImgs" v-for="item in content" v-html="item.content">
        </div>
      </div>

      <Foot></Foot>
  </div>
</template>
<script>
 import Top from '@/components/top'
 import Navs from '@/components/nav'
 import Foot from '@/components/foot'
  export default {
   data(){
     return {
       content:''
     }
   },
    mounted() {
      let self=this;
//
      this.$http.get(`${process.env.API.SYSTEM}/system/aboutus`)
     .then(res=>{
       this.content=res.data.data
      }).catch(() => {

      })




    },
    components: {
      Top,  //头部
      Navs, //导航
      Foot  //公共底部
    },
  }
</script>
<style type="text/less" lang="less" scoped>
  .About{
    min-height: 100vm;
    .BannerImgs{
      min-height: 500px;
      min-width: 1000px;
      max-width: 1200px;
      margin: 0 auto;
    }
  }
</style>
<style type="text/less" lang="less">
  .About{
    /*.banners{*/
    /*min-width: 1000px;*/
    /*max-width: 1200px;*/

    .BannerImgs{
      min-height: 500px;
      img{
        height: auto;
        min-width: 1000px;
        max-width: 1200px;
        width: 100%;
        object-fit: cover;
        padding:0 10px;
        box-sizing: border-box;
        margin:0 auto;
      }
    }

  }
</style>
