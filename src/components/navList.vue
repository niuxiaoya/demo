<template>
  <div class="navList">
    <ul>
      <!--<li v-for="(item,index) in dataLists"  @click="opens(index)" :class="{'topActives':nums==index}">{{item.name}}</li>-->
      <li  @click="opens(0)" :class="{'topActives':nums==0}">个人中心</li>
      <li  @click="opens(1)" :class="{'topActives':nums==1}">我的发布</li>
      <li  @click="opens(2)" :class="{'topActives':nums==2}">我的收藏</li>
      <li  @click="opens(3)" :class="{'topActives':nums==3}">我的购买</li>
      <li  @click="opens(4)" :class="{'topActives':nums==4}">实名认证
        <span v-if="is_auth_name=='审核中'">({{is_auth_name}})</span>
        <span v-if="is_auth_name=='认证失败'" class="red">({{is_auth_name}})</span>
      </li>
      <li  @click="opens(5)" :class="{'topActives':nums==5}">银行管理</li>
      <li  @click="opens(6)" :class="{'topActives':nums==6}">地址管理</li>
      <li  @click="opens(7)" :class="{'topActives':nums==7}">联系我们</li>
    </ul>
  </div>
</template>
<script type="javascript">
export default {
  props: {
    nums: Number
  },
  data () {
    return {
      is_auth_name:'',
      dataList:''
    }
  },
  created(){
    sessionStorage.removeItem('buy-filter')
  },
  mounted(){
    this.$http.get(`${process.env.API.USER}/user/userinfo`).then(res=>{
      if(res.data.errcode=='0'){
        this.is_auth_name=res.data.data.is_auth_name
        this.dataList=res.data.data

      }
    }).catch(err=>{
      console.log(err)
    })
  },
  methods: {
    opens(index){
      switch (index){
        case 0:
          this.$router.push('/login/people')
          break;
        case 1:
          this.$router.push('/login/public')
          break;
        case 2:
          this.$router.push('/login/myCollection')
          break;
        case 3:
          this.$router.push('/login/myBuy')
          break;
        case 4:
          if(this.is_auth_name=='未认证'){
            this.$router.push('/login/name?id=1')
            return false
          }
          if(this.is_auth_name=='认证失败'){
          this.$router.push('/login/name?id=2')
          return false
          }
          else{
            this.$router.push('/login/nameSucess')
          }
          break;
        case 5:
          this.$router.push('/login/myBank')
          break;
        case 6:
          this.$router.push('/login/myMap')
          break;
        case 7:
          this.$router.push('/login/aboutMe')
          break;
      }
    },
    openLogin(){
      // this.$router.push('/people')
    }
  }
}
</script>
<style lang="less" scoped type="text/less">
  .navList{
    position: relative;
    height: 55px;
    color: #fff;
    display: flex;
    justify-content: center;
    ul{
      position: relative;
      width: 100%;
      display: flex;
      flex-direction:column;
      line-height: 40px;
      li{
        position: relative;
        cursor: pointer;
        color: #999;
        font-size: 18px;
        padding: 0 30px;
        transition:all .4s;
        box-sizing:border-box;
        span{
          color: #949494;
          font-size: 14px;
        }
        .red{
           color: #a01f23;
        }
        &.topActives {
          color: #333;
          background: #f5f5f5;
        }
        &:hover{
          color: #333;
          background: #f5f5f5;
        }
      }
      .lis{
        display: flex;
        justify-content: center;
        align-items: center;
        i{
          display: inline-block;
          padding-right: 20px;
          img{
            object-fit: cover;
          }
        }
      }
    }
  }
  .main{

  }
</style>
<style lang="less" type="text/less">
  .mainBox {
    box-sizing:border-box;
    max-width: 1200px;
    min-width: 1000px;
    padding: 0 10px;
    margin: 0 auto;
    box-sizing: border-box;
    background: #fff;
    min-height: 690px;
    display: flex;
    > .left {
      width: 200px;
      padding-top: 55px;
      border-right: 1px solid #f5f5f5;
      ul{
        li{
          font-size: 16px!important;
        }
      }
    }
    > .right {
      padding: 60px;
      box-sizing:border-box;
      flex: 1;
      max-width: none !important;
      >.title{
        color: #333;
        font-size: 24px;
      }
    }
  }
</style>
