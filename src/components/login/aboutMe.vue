<template>
  <div class="aboutMe">
    <Top></Top>
    <!-- :num="0" -->
    <Navs ></Navs>
    <div class="mian">
      <div class="left">
        <navList :nums="7"></navList>
      </div>
      <div class="right"  v-loading="loading" element-loading-text="加载中" >
        <div class="title">
          联系我们
        </div>
        <div class="info">
          <div class="input">
            <span>姓名</span>
            <input type="name" v-model="infoList.name" placeholder="您的姓名">
          </div>
          <div class="input">
            <span>联系电话</span>
            <input type="tel" v-model="infoList.tel" placeholder="您的电话">
          </div>
          <div class="input">
            <span>邮箱地址</span>
            <input type="email" v-model="infoList.email" placeholder="您的邮箱">
          </div>
          <div class="input">
            <span>内容</span>
            <textarea name="" id="" placeholder="您对我们的要求建议" v-model="infoList.proposal"></textarea>
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
          tel:'',
          email:'',
          proposal:'',
        },
        loading: false,
      }
    },
    mounted() {

    },
    methods:{
      sub(){
        let self=this;
        this.loading=true;
        let reg = /^1(3|4|5|7|8)\d{9}$/
        if(!self.infoList.name){
          this.$message.error('请填写您的姓名');
          this.loading=false;
          return false;
        }
        if(!self.infoList.tel){
          this.$message.error("请填写您的电话");
          this.loading=false;
          return false;
        }
        if (!reg.test(self.infoList.tel)) {
          this.$message.error("请正确填写您的电话");
          this.loading=false;
          return false
        }
        if(!self.infoList.email){
          this.$message.error("请填写您的邮箱");
          this.loading=false;
          return false;
        }
        if(!self.infoList.proposal){
          this.$message.error("请填写您的建议");
          this.loading=false;
          return false;
        }
        self.$http.post(`${process.env.API.SYSTEM}/system/smtp`,{
          contact:self.infoList.name,
          content:self.infoList.proposal,
          email:self.infoList.email,
          tel:self.infoList.tel,
        }).then(res=>{
          if(parseInt(res.data.errcode)==0){
            this.$message({
              type: 'success',//success
              message: "提交成功"
            });
            self.$router.push('/login/people')
          }else{
            this.$message.error("提交失败");
          }
          this.loading=false;
        }).catch(err=>{
          this.loading=false;
        })

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
  .aboutMe{
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
              /*color: #ccc;*/
            }
            textarea{
              width: 340px;
              height: 160px;
              border-color: #ccc;
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
