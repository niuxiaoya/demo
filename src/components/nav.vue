<template>
  <div class="nav">
    <ul>
      <li v-for="(item,index) in dataList"  @click="open(item,index)" :class="{'topActive':num==index}">{{item.name}}</li>
        <!--<i><img :src="userInfo.avatar_pic?userInfo.avatar_pic:require('../assets/img/people.png')"  ></i>-->
      <li class="lis">
        <i v-if="!userInfo.uid">
          <img src='../assets/img/people.png' alt="" @click="openLogin" >
        </i>
        <i class="info" v-if="userInfo.uid" @click="isSel=!isSel">
          <img :src="userInfo.avatar_pic"  v-if="userInfo.avatar_pic">
          <img src="../assets/img/login/photo1.png" v-if="!userInfo.avatar_pic">
          <span :class="{'imgShow':isSel}" class="ssel">
            <img class="icon-caret" src="../assets/img/select.png">
          </span>
          <div class="isShow" :class="{'isShowLogin':isSel}">
            <!--v-if="isSel"-->
            <p @click="$router.push('/login/people')">
              <img :src="userInfo.avatar_pic"  v-if="userInfo.avatar_pic">
              <img src="../assets/img/login/photo1.png" v-if="!userInfo.avatar_pic">
              {{userInfo.username || userInfo.tel}} </p>
            <p @click="exit">退出</p>
          </div>
        </i>
        <i>
          <!--<img src="../assets/img/shop.png" alt="">-->
        </i>
      </li>
    </ul>
  </div>
</template>
<script type="javascript">
  export default {
    props: {
      num: Number
    },
    data () {
      return {
        isSel:false,
        select:0,
        userInfo:{},
        userId:'',
        dataList: [
          {
            name: '首页',
          },
          {
            name: '直买',
          },
          {
            name: '直售',
          },
          {
            name: '会籍',
          },
          {
            name: '资讯',
          },
          {
            name: '关于我们',
          },
        ],
      }
    },
    methods: {
      open(item,index){
        switch (item.name){
          case '首页':
            this.$router.push('/')
            break;
          case '直买':
            this.$router.push('/buy')
            break;
          case '直售':
            if(!localStorage.getItem('Authorization')){
              this.$confirm('请登录后再进行操作！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$router.push(`/login`)
              }).catch(() => {
              });
              return false
            }
            this.$router.push('/wealthmanag')
            break;
          case '会籍':
            this.$router.push('/vip')
            break;
          case '资讯':
           this.$router.push('/information')
            break;
          case '关于我们':
           this.$router.push('/about')
            break;
        }
      },
      openLogin(){
        this.$router.push('/login')
      },
      exit(){
        let self=this;
        self.$http.get(`${process.env.API.USER}/logout`,).then(res => {
          if(parseInt(res.data.errcode)===0){
            self.$router.push('/')
            self.userInfo.uid = ''
            self.fn()
//            window.reload()
          }else{

          }
        }).catch(err => {

        })
        localStorage.removeItem('Authorization')
      },
      fn(){
        this.$http.get(`${process.env.API.USER}/user/userinfo`).then(res=>{
          if(res.data.errcode=='0'){
            this.userInfo = res.data.data
          }
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    mounted(){
      this.fn()

    }
  }
</script>
<style lang="less" scoped type="text/less">
  .nav{
    position: relative;
    height: 55px;
    background: #0a0a0a;
    color: #fff;
    display: flex;
    justify-content: center;
    ul{
      position: relative;
      display: flex;
      li{
        position: relative;
        cursor: pointer;
        padding: 15px 30px 8px;
        color: #ccc;
        font-size: 18px;
        &.topActive {
          &:before {
            position: absolute;
            width: 31px;
            height: 1px;
            background: #fff;
            content: '';
            bottom: 10px;
            left: calc(50% - 17px);
          }
        }
      }
      .lis{
        /*position: absolute;*/
        /*right: -200px;*/
        /*top: 0;*/
        display: flex;
        justify-content: center;
        align-items: center;
        i{
          display: inline-block;
          padding-right: 20px;
          img{
            width: 25px;
            height: 25px;
            border-radius: 50%;
            object-fit: cover;
          }
          &:last-child{
            img{
              width: auto;
              height: auto;
              border-radius: 0;
              object-fit: cover
            }
          }
          /*.isShowLogin{*/
            /*opacity: 0;*/
          /*}*/
        }
        .info{
          position: relative;
          .isShow{
            opacity: 0;
            transition: all .4s;
          }
          .isShowLogin{
            opacity: 1;
          }
          .icon-caret {
            width:14px;
            height:8px;
            padding-bottom: 6px;
            transition: all .4s;
          }
          img{
            width: 25px;
            height: 25px;
            border-radius: 50%;
            object-fit: cover;
          }
          span{
            transition: all .4s;
            &.imgShow{
              display: inline-block;
              transform: rotate(180deg);
              vertical-align: top;
              margin-top: -1px;
            }
          }
          div{
            z-index: 100;
            position: absolute;
            top: 40px;
            left: -60px;
            width: 160px;
            min-height: 40px;
            background-color: #fff;
            box-shadow: 1px 1px 10px #ccc;
            p{
              font-style:normal;
              height: 40px;
              padding: 0 10px;
              display: flex;
              align-items: center;
              border-bottom: 1px solid #f2f2f2;
              font-size: 16px;
              color: #333;
              &:last-child{
                border-bottom: none;
              }
              img{
                /*width:25px!important;*/
                /*height: 25px!important;*/
                /*border-radius: 50%!important;*/
                margin-right: 10px;
              }
              &:hover{
                background-color: #f5f5f5;
              }
            }
          }
        }
      }
    }
  }
</style>
<style lang="less" type="text/less">

</style>
