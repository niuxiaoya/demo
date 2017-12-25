<template>
  <div class="VipDeatil">
    <Top></Top>
    <Navs :num="3"></Navs>
    <div class="mian">
      <div class="title">
        <div class="matter">当前位置 : 会籍 > 详情</div>
      </div>
      <div class="content">
        <img src="../../assets/img/vip/backs.png" alt="">
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
        index:"",

      }
    },
    created(){
      this.index=this.$route.query.dataObj
    },
    mounted(){
      window.scrollTo(0,0)
    },
    components: {
      Top,  //头部
      Navs, //导航
      Foot  //公共底部
    },
  }
</script>
<style type="text/less" lang="less" scoped>
  .VipDeatil{
    .mian{
      max-width: 1200px;
      min-width: 1000px;
      padding: 0 10px;
      padding-top: 50px;
      box-sizing: border-box;
      margin: 0 auto;
      background: #fff;
      .title{
        height: 88px;
        font-size: 16px;
        color: #999;
        padding-left: 30px;
        padding-right: 30px;
        border-bottom: 1px solid #e6e6e6;
        overflow: hidden;
        .matter{
          float: left;
        }

      }
      .content{
        height: auto;
        background-size: 100%;
        text-align: center;
       img{
         width: 100%;
         display: block;
       }
      }
    }
  }
</style>
