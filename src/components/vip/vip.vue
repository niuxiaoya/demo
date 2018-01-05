<template>
  <div class="VIP">
      <Top></Top>
      <Navs :num="3"></Navs>
      <div class="mian" v-loading="loading" element-loading-text="加载中" >
          <div class="content" v-show="vipInfo.length > 0" style="min-height: 400px;">
          <dl  v-for="item,index in vipInfo" :key="index">
            <dt @click="info(index)">
              <img :src="item.icon_pic" alt="">
            </dt>
            <dd>
              <div class="detail">
                <p>{{item.name}} </p>
                <b @click="$router.push('vip/detail')">详情</b>
              </div>
              <p>{{item.money}}</p>
              <span class="es" v-html="item.description"> </span>
              <span>{{item.remark}}</span>
            </dd>
          </dl>
        </div>
      </div>
      <Foot></Foot>
  </div>
</template>
<script type="javascript">
  export default {
   data(){
     return{
       vipInfo:[],
       loading: true,
     }
   },
   methods:{
     info(resut){
       this.$router.push({
           path:'/vip/detail',
       })
     },
   },
    mounted(){
      document.title= '瑞时会-会籍'
    let self=this;
       /**
        * vip列表
        */
       this.loading=true
       self.$http.get(`${process.env.API.VIP}/vip/memlevel?is_pc=1`).then(res=>{
         if(res.data.errcode=='0'){
           let str;
           let str1;
           let arr=[];
           self.vipInfo = res.data.data.data
           self.loading = false
         }
       }).catch(err=>{
         self.loading = false
       })
    },
  }
</script>
<style type="text/less" lang="less" scoped>
  .VIP{
    .mian{
      max-width: 1200px;
      min-width: 1000px;
      padding: 0 10px;
      padding-top: 50px;
      box-sizing: border-box;
      margin: 0 auto;
      background: #fff;
      min-height:532px;
      overflow-y: auto;
      .content{
        min-height:500px;
        padding-top:160px;
        margin: 0 auto;
        background: url("../../assets/img/vip/bba.jpg") no-repeat;
        text-agin:center;
        dl{
          width: 555px;
          padding-bottom: 70px;
          margin: 0 auto;
          dt{
            width: 100%;
            height: 352px;
            img{
              border-radius: 5px;
              width: 100%;
              height: 352px;
              cursor: pointer;
              /*box-shadow: 1px 5px 18px #000;*/
            }
          }
          dd{
            .detail{
              position: relative;
              text-align: center;
              margin: 0 auto;
              display: flex;
              justify-content: center;
              p{
                font-size: 32px;
                padding-top: 30px;
                text-align: center;

              }
            }
            b{
              cursor: pointer;
              font-weight: normal;
              margin-top: 38px;
              border-radius: 3px;
              width: 72px;
              height: 23px;
              background-color: #000000;
              text-align: center;
              line-height: 23px;
              color: #fff;
              font-size: 14px;
              display: inline-block;
              margin-left: 38px;
            }
            p{
              text-align: center;
              font-size: 20px;
              line-height: 36px;
            }
            span{
              display: block;
              text-align: center;
              padding-top: 16px;
              color: #606060;
              height: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              &:first-child{
                padding-top: 25px;
              }
            }
            .es{
              height: 30px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>

<style type="text/less" lang="less">
  .es #my-frame-text {
    text-align: center;
  }
</style>
