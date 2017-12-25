<template>
  <div class="People">
    <Top></Top>
    <!-- :num="0" -->
    <Navs ></Navs>
    <div class="mian">
      <div class="left">
       <navList :nums="0"></navList>
      </div>
      <div class="right">
        <div class="title">
          <img :src="dataList.avatar_pic" alt="">
          <div>
            <p> {{dataList.username?dataList.username:dataList.tel}}</p>
            <p><img v-show="dataList.is_auth_name=='已认证'" src="../../assets/img/login/name.png" alt="">{{dataList.is_auth_name}}</p>
          </div>
          <button @click="$router.push('/login/setPeople')">
            设置
          </button>
        </div>
        <ul class="uls">
          <li>
            <p>
              <img src="../../assets/img/login/Pay.png">
            </p>
            <p>
              <span>待付款订单：<b>{{buyer && buyer.paid?buyer.paid:0}}</b></span>
              <span @click="$router.push('/login/myBuy?id=1')">查看全部</span>
            </p>
          </li>
          <li>
            <p>
              <img src="../../assets/img/login/paid.png">
            </p>
            <p>
              <span>已付款订单：<b>{{buyer && buyer.pay?buyer.pay:''}}</b></span>
              <span @click="$router.push('/login/myBuy?id=2')">查看全部</span>
            </p>
          </li>
          <li>
            <p>
              <img src="../../assets/img/login/goods.png">
            </p>
            <p>
              <span>待收获订单：<b>{{buyer && buyer.delivery?buyer.delivery:''}}</b></span>
              <span @click="$router.push('/login/myBuy?id=3')">查看全部</span>
            </p>
          </li>
          <li>
            <p>
              <img src="../../assets/img/login/Pay.png">
            </p>
            <p>
              <span>待付款订单：<b>{{buyer && buyer.evaluate ?buyer.evaluate:''}}</b></span>
              <span @click="$router.push('/login/myBuy?id=4')">查看全部</span>
            </p>
          </li>
          <li>
            <p>
              <img src="../../assets/img/login/evaluate.png">
            </p>
            <p>
              <span>待评价订单：<b>{{buyer && buyer.lose ?buyer.lose:''}}</b></span>
              <span @click="$router.push('/login/myBuy?id=5')">查看全部</span>
            </p>
          </li>
        </ul>
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
        dataList:"",
        buyer:{
          paid:'',
          pay:'',
          delivery:'',
          evaluate:'',
          lose:'',
        }
      }
    },
    mounted() {
      setTimeout(()=>{
        let self=this;
        self.$http.get(`${process.env.API.USER}/user/userinfo?nonce=0.9954606018503807&is_pc=1`).then(res=>{
          if(res.data.data){
            self.dataList=res.data.data
            self.buyer=res.data.data.buyer
            self.buyer.paid=res.data.data.buyer.paid
            self.buyer.pay=res.data.data.buyer.pay
            self.buyer.delivery=res.data.data.buyer.delivery
            self.buyer.evaluate=res.data.data.buyer.evaluate
            self.buyer.lose=res.data.data.buyer.lose
          }
        }).catch(err=>{

        })
      },200)
    },
    methods:{

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
          font-size: 14px;
          padding-bottom: 30px;
          height: 101px;
          border-bottom: 1px solid #f2f2f2;
          display: flex;
          align-items: center;
          img{
            width: 101px;
            height: 101px;
            border-radius: 50%;
            object-fit: cover;
          }
          div{
            padding-left: 25px;
            p{
              font-size: 18px;
              color: #333;
              font-weight: bold;
              &:last-child{
                font-size: 14px;
                color: #999;
                padding-top: 10px;
              }
            }
            img{
              width: 14px;
              height: 14px;
              margin-right: 10px;
              border-radius: 0;
            }
          }
          button{
            margin-left: 180px;
            width: 160px;
            height: 40px;
            border: 1px solid #cccccc;
            color: #333;
            background-color: #fff;
            transition: all .4s;
            cursor: pointer;
            &:hover{
              background-color: #333;
              color: #fafafa;
            }
          }
        }
        .uls{
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          li{
            display: flex;
            width: 33.3%;
            padding-top: 60px;
            p{
              padding-left: 10px;
              &:last-child{
                display: flex;
                flex-direction: column;
                span{
                  padding-top: 10px;
                  font-size: 14px;
                  color: #999;
                  cursor: pointer;
                  &:first-child{
                    padding-top: 15px;
                    font-size: 18px;
                    color: #333;
                    b{
                      font-weight: normal;
                      color: #ff5c5c;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
<style type="text/less" lang="less">

</style>
