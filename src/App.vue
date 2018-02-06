<template>
  <div id="app" :class="idcm_page ? 'icdm-app' : ''">
    <Top></Top>
    <!--<Navs :num="0"></Navs>-->
    <router-view></router-view>

    <Foot></Foot>
  </div>
</template>

<script>

  export default {
    name: 'app',
    data() {
      return {
        num:0,
        navNum:0,
        accessToken: '',
        idcm_page: false,  //  是否是交易所页面
      }
    },
    created() {
      this.idcm_page = this.$router.currentRoute.path === '/idcm'
      //如果没有accesstoken请求一次
//      let token = localStorage.getItem('AccessToken')
//      if(!token){
//        this.$http.get(`${process.env.API.USER}/login`).then(res => {
//          if (res.data.errcode=='0') {
//            localStorage.setItem('AccessToken', res.data.AccessToken)
//          }
//        }).catch(err => {
//          console.log(err)
//        })
      },
//      }
    methods:{

    },
    mounted(){
      console.log(123)
    },
    watch: {
      '$route' () {
        this.idcm_page = this.$router.currentRoute.path === '/idcm'
      }
    }
  }
</script>
<style lang="less">
  * {
    font-family: "Microsoft YaHei";
  }
  #app{
    font-size: 16px;
    background: #fafafa;
    min-height: 100vh;
    min-width: 1000px;
    /*position: relative;*/
    /*margin-bottom: 56px;*/
    /*margin-top: 100px;*/
    /*&.icdm-app {*/
      /*margin: 0;*/
      /*padding-bottom: 56px;*/
      /*padding-top: 100px;*/
     /* -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;*/
    /*}*/
  }
</style>
