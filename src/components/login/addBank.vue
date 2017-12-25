<template>
  <div class="addBank">
    <Top></Top>
    <!-- :num="0" -->
    <Navs ></Navs>
    <div class="mian">
      <div class="left">
        <navList :nums="5"></navList>
      </div>
      <div class="right">
        <div class="title">
          添加银行卡
        </div>
        <div class="info">
          <div class="input">
            <span>姓名</span>
            <input type="name" v-model="infoList.name" placeholder="请输入真实姓名">
          </div>
          <div class="input">
            <span>银行卡号</span>
            <input type="text" v-model="infoList.card" placeholder="请输入正确的卡号">
          </div>
          <div class="input">
            <span>所属银行</span>
            <input type="text" v-model="infoList.bank" placeholder="请输入所属银行类型(如：招商银行)">
          </div>
          <div class="input">
            <span>开户行地址</span>
            <input type="text" v-model="infoList.map" placeholder="请输入开户行地址(如：广东省深圳市宝安区支行)">
          </div>
          <div class="button">
            <button @click="sub">提交</button>
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
        }
      }
    },
    mounted() {
    },
    methods:{
      sub(){
        let reg = /^\d{18}$/
        let self=this;
        if(!self.infoList.name){
          this.$message.error('请填写您的姓名');
          return false;
        }
        if(!self.infoList.card){
          this.$message.error("请填写您的银行卡号");
          return false;
        }
        if (!reg.test(self.infoList.card)) {
          this.$message.error("请正确填写您的银行卡号");
          return false
        }
        if (!self.infoList.bank) {
          this.$message.error("请填写您的所属银行");
          return false
        }
        if(!self.infoList.map){
          this.$message.error("请填写您的开户行地址");
          return false;
        }
        self.$http.post(`${process.env.API.USER}/user/bankcard`,{
          nonce:0.42947779531310104,
          bank_name:self.infoList.bank,
          cardholder:self.infoList.name,
          cardnum:self.infoList.card,
          is_china:1,
          opening_bank:self.infoList.bank,

        }).then(res=>{
          if(res.data.errcode=='0') {
            this.$message({
              type: 'success',//success
              message: "提交成功"
            });
            setTimeout(() => {
              window.history.back(-1);
            }, 1000)
          }
        }).catch(()=>{

        })
      }
    },
    created(){
      console.log(this.$route.params)
      if(this.$route.params){
        this.infoList.name= this.$route.params.cardholder
        this.infoList.card= this.$route.params.cardnum
        this.infoList.bank= this.$route.params.bank_name
        this.infoList.map= this.$route.params.opening_bank
//        name:'',
//          card:'',
//          bank:'',
//          map:'',
      }
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
  .addBank{
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
            input{
              width: 338px;
              height: 40px;
              box-sizing: border-box;
              border:1px solid #ccc;
              padding: 0 10px;
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
