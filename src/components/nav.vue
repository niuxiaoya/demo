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
        is_auth_name:'',
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
        ifBrandCard:[]
      }
    },
    created(){

    },
    methods: {
      open(item,index){
        switch (item.name){
          case '首页':
            this.$router.push('/')
            sessionStorage.removeItem('buy-filter')
            break;
          case '直买':
            this.$router.push('/buy')
//            this.$router.push(`/buy?p=1`)

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
            this.$http.get(`${process.env.API.USER}/user/userinfo?nonce=0.9954606018503807`).then(res=>{
              this.is_auth_name=res.data.data.is_auth_name
              if(this.is_auth_name!='已认证'){
                this.$confirm('请认证后再进行操作！！', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
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
                    return false
                  }
                }).catch(() => {
                });
              }else{
                if(this.ifBrandCard.length<=0){
                  this.$confirm('请先添加银行卡！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    this.$router.push(`/login/addBank`)
                    return false
                  }).catch(err => {
                    console.log(err)
                  });
                  return false;
                }else{
                  this.$router.push('/wealthmanag')
                  sessionStorage.removeItem('buy-filter')
                }
              }
            }).catch(err=>{

            })

            break;
          case '会籍':
            this.$router.push('/vip')
            sessionStorage.removeItem('buy-filter')
            break;
          case '资讯':
            this.$router.push('/information')
            sessionStorage.removeItem('buy-filter')
            break;
          case '关于我们':
            this.$router.push('/about')
            sessionStorage.removeItem('buy-filter')
            break;
        }
      },
      openLogin(){
        sessionStorage.removeItem('buy-filter')
        this.$router.push('/login')
      },
      exit(){
        let self=this;
        self.$http.get(`${process.env.API.USER}/logout`,).then(res => {
          if(parseInt(res.data.errcode)===0){
            self.$router.push('/')
            self.userInfo.uid = ''
            self.fn()
            window.reload()
          }else{

          }
        }).catch(err => {

        })
        localStorage.removeItem('Authorization')
      },
      fn(){
        this.$http.get(`${process.env.API.USER}/user/userinfo?nonce=0.9954606018503807`).then(res=>{
          if(res.data.errcode=='0'){
            this.userInfo = res.data.data

            let isAuth = localStorage.getItem('isAuth')
            if(res.data.data){
              if((res.data.data&&res.data.data.is_auth==0)||(res.data.data&&res.data.data.is_auth==2)){
                localStorage.setItem('isAuth',res.data.data.is_auth)
                isAuth = localStorage.getItem('isAuth')
              }
            }
            if((res.data.data&&res.data.data.is_auth==1)&&(isAuth==0||isAuth==2)){
              this.$http.get(`${process.env.API.USER}/user/getauth`).then(res=>{
                if(res.data.errcode=='0'){
                  localStorage.setItem('Authorization',res.data.Authorization)
                  localStorage.setItem('isAuth',1)
                }
              }).catch(err=>{
                console.log(err)
              })
            }


          }
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    mounted() {
      this.$http.get(`${process.env.API.USER}/user/bankcard`).then(res=>{
        if(res.data.errcode=="0"){
          this.ifBrandCard=res.data.data;
        }
      }).catch(err=>{
        console.log(err)
      })
//      if (this.userInfo && !this.userInfo.uid) {
        this.fn()
//      } else {
//
//      }
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
        width: 86px;
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
        }
        .info{
          position: relative;
          .isShow{
            z-index: 0;
            opacity: 0;
            transition: all .4s;
          }
          .isShowLogin{
            opacity: 1;
            z-index: 22;
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
