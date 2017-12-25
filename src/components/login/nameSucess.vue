<template>
  <div class="People">
    <Top></Top>
    <!-- :num="0" -->
    <Navs ></Navs>
    <div class="mian">
      <div class="left">
        <navList :nums="4"></navList>
      </div>
      <div class="right">
        <div class="title">
          实名认证
        </div>
        <div class="info">
          <div class="input">
            <span>姓名</span>
            <div>{{dataList.realname}}</div>
          </div>
          <div class="input">
            <span>证件号码</span>
            <div>{{dataList.id_number}}</div>
          </div>
          <div class="input">
            <span>证件正面照</span>
            <img :src="dataList.back_pic" alt="">
          </div>
          <div class="input">
            <span></span>
            <img :src="dataList.front_pic" alt="">
          </div>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>
<script type="javascript">
  import Top from '@/components/top'
  import Navs from '@/components/nav'
  import navList from '@/components/navList'
  import Foot from '@/components/foot'
  export default {
    data(){
      return {
        dataList:'',
        infoList:{
          name:'',
          card:'',
          bank:'',
          map:'',
        },
      }
    },
    mounted() {

    },
    methods:{

    },
    created(){
      this.$http.get(`${process.env.API.USER}/user/identify`).then(res=>{
        if(res.data.errcode=='0'){
          this.dataList=res.data.manage
//            .manage.manage
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    components: {
      Top,  //头部
      Navs, //导航
      navList,
      Foot  //公共底部
    },
  }
</script>
<style lang="less" scoped type="text/less">
  .People{
    .mian{
      box-sizing:border-box;
      max-width: 1200px;
      min-width: 1000px;
      padding: 0 10px;
      margin: 0 auto;
      box-sizing: border-box;
      background: #fff;
      min-height: 690px;
      display: flex;
      .left{
        width: 200px;
        padding-top: 55px;
        border-right: 1px solid #f5f5f5;
      }
      .right{
        padding: 60px;
        box-sizing:border-box;
        .title{
          color: #333;
          font-size: 24px;
        }
        .info{
          .input{
            padding-top: 25px;
            line-height: 40px;
            display: flex;
            span{
              width: 85px;
              font-size: 14px;
            }
            .img{
              position: absolute;
              width: 202px;
              height: 126px;
              margin-left: 88px;
              opacity: 0;
            }
            input{
              width: 338px;
              height: 40px;
              box-sizing: border-box;
              border:1px solid #ccc;
              padding: 0 10px;
            }
            img{
              width: 202px;
              height: 126px;
              object-fit: cover;
            }
            p{
              width: 202px;
              height: 126px;
              background: url("../../assets/img/login/add1.png");
            }
          }
          .button{
            padding: 60px 0 0 85px;
            button{
              background: #333;
              width: 220px;
              height: 40px;
              color: #fafafa;
              font-size: 14px;
              border:none;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
</style>
<style type="text/less" lang="less">

</style>
