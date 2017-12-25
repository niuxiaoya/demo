<template>
  <div class="navList">
    <ul>
      <li v-for="(item,index) in dataLists"  @click="opens(index)" :class="{'topActives':nums==index}">{{item.name}}</li>
      </li>
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
        dataLists: [
          {
            name: '个人中心',
          },
          {
            name: '我的发布',
          },
          {
            name: '我的收藏',
          },
          {
            name: '我的购买',
          },
          {
            name: '实名认证',
          },
          {
            name: '银行管理',
          },
          {
            name: '地址管理',
          },
          {
            name: '联系我们',
          },
        ],
      }
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
            this.$http.get(`${process.env.API.USER}/user/userinfo`).then(res=>{
              if(res.data.errcode=='0'){
                if(res.data.data.is_auth_name!='未认证'){
                  this.$router.push('/login/nameSucess')
                }else{
                  this.$router.push('/login/name')
                }
              }
            }).catch(err=>{
              console.log(err)
            })
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
        &.topActives {
          /*&:before {
            position: absolute;
            width: 31px;
            height: 1px;
            background: #fff;
            content: '';
            bottom: 10px;
            left: calc(50% - 17px);
          }*/
          color: #333;
          background: #f5f5f5;
        }
        &:hover{
          color: #333;
          background: #f5f5f5;
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
            object-fit: cover;
          }
        }
      }
    }
  }
</style>
<style lang="less" type="text/less">
  .mian {
    > .left {
      ul{
        li{
          font-size: 16px!important;
        }
      }
    }
    > .right {
      flex: 1;
      max-width: none !important;
    }
  }
</style>
