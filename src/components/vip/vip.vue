<template>
  <div class="VIP">
      <Top></Top>
      <Navs :num="3"></Navs>
      <div class="mian" v-loading="loading" element-loading-text="加载中" >
          <div class="content" v-show="vipInfo.length > 0" style="min-height: 584px;">
          <dl  v-for="item,index in vipInfo" :key="index">
            <dt @click="info(index)">
              <img :src="item.icon_pic" alt="">
              <!--<img :src="require(`../../assets/img/vip/0${index+1}.png`)" alt="">-->
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
<script>
 import Top from '@/components/top'
 import Navs from '@/components/nav'
 import Foot from '@/components/foot'
  export default {
   data(){
     return{
       vipInfo:[],
       loading: true,
     }
   },
   methods:{
     info(resut){
      console.log(resut)
       this.$router.push({
           path:'/vip/detail',
       })
     },
   },
    mounted(){
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
//           for(let i=0;i<this.vipInfo.length;i++){
//             str=this.vipInfo[i].name.split(" ")
//             str1=str[0]+str[1];
//             arr[i]=[str1,str]
//             this.vipInfo[i].name=arr[i];
//           }
           self.vipInfo = res.data.data.data
           self.loading = false
         }
       }).catch(err=>{
         self.loading = false
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
  .VIP{
    .mian{
      max-width: 1200px;
      min-width: 1000px;
      padding: 0 10px;
      padding-top: 50px;
      box-sizing: border-box;
      margin: 0 auto;
      background: #fff;
      min-height:800px;
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
              height: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
    }
  }
</style>
