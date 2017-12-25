<template>
  <div class="Login">
  <div class="Information">
    <div class="phoness">
      <p @click="$router.push('/about')">关于我们</p>
      <p>
        <img src="../../assets/img/tel.png" alt="">
        400-8451-816
      </p>
    </div>
      <Top></Top>
      <!--<Navs :num="4"></Navs>-->
      <div class="mian">
        <div class="login">
            <h2>登录</h2>
            <div class="phone">
                <input type="tel" placeholder='请输入手机号码' v-model="postData.phone">
                <p class="reminder" v-if="info">{{info}}</p>
            </div>
            <div class="code">
                <input type="text" placeholder='请输入6位验证码' v-model="postData.code">
                <button class="verification" @click="Code()">获取验证码</button>
                 <p class="reminder" v-if="infos">{{infos}}</p>
            </div>
            <div class="checks">
                <input type="checkbox" name="" id="" v-model="isCheck">登录即同意
                 <!-- <el-button type="text">点击打开 Message Box</el-button> -->
                <span @click="open5">《用户协议》</span>
            </div>
            <button class="btn" @click="sub">登录</button>
        </div>
      </div>
      <Foot></Foot>
  </div>
        <div class="mark">
        <div class="title">
          <p>{{contentList.title}}</p>
          <span>{{contentList.publish_time}}</span>
        </div>
         <p><span class="close" @click="close">
           <img src="../../assets/img/buy/closeh.png" alt="">
         </span></p>
         <div class="cont">
           <p v-html="contentList.content">

           </p>
         </div>
      </div>
      <div class="marks">

      </div>
    </div>
</template>
<script>
// $router.push('/login')
 import Top from '@/components/top'
 import Navs from '@/components/nav'
 import Foot from '@/components/foot'
  export default {
    data(){
      return {
        isCheck:true,
        postData:{
          phone:"",
          code:"",
          terminal:3,
          country_code:86,
          country_id:41
        },
        postDatas:{},
        info:"",
        infos:"",
        contentList:'',
      }
    },
    methods:{
       Code(){
         let self=this;
        var left_time = 60;
         if(this.postData.phone){
           let reg = /^1(3|4|5|7|8)\d{9}$/
           if (!reg.test(self.postData.phone)) {
             this.info='手机号错误'
             return false
           }else{
             this.info=""
            // http://apidev.swisstimevip.com:8000/system/v1/system/sms  tel: "14703467877", country_id: 86}
//             {params:{tel:self.postData.phone,country_id:86}})
             self.$http.post(`${process.env.API.SYSTEM}/system/sms`,{tel:self.postData.phone,country_id:86}).then(res => {
//                         console.log(res.data)
               if(res.data.errcode=='0'){
               }else{
                  //self.$messagebox.alert(res.data.errmsg)
               }
             }).catch(err => {
               console.log(err)
             })
             var tt = setInterval(function(){
               left_time = left_time - 1;
               if (left_time <= 0) {
                 window.clearInterval(tt);
                 $(".verification").html("重新发送")
                 $(".verification").css("background","#333")
                 $(".verification").attr("disabled", false)
               }
               else {
                 $(".verification").html('（' + left_time + '）秒');
                 $(".verification").css("background","#ccc")
                 $(".verification").attr({"disabled":"disabled"});
               }
             }, 1000);
           }

         }else{
           this.info="手机号不能为空"
         }

      },
      sub () {
        this.infos=""
        let self = this
        let reg = /^1(3|4|5|7|8)\d{9}$/
        var regNum = /^\d{6}$/
        if (!self.postData.phone) {
          this.info="手机号不能为空"
          return false
        }

//        if(self.postData.country_code==86) {
          if (!reg.test(self.postData.phone)) {
            this.info='手机号错误'
            return false
          }else{
            this.info=''
          }
//        }
        if (!self.postData.code) {
          this.infos='验证码不能为空'
          return false
        }else if (!regNum.test(self.postData.code)) {
          this.infos='验证码错误'
          return false
        } else if (!self.isCheck) {
          this.infos='请阅读协议'
          return false
        } else {
          self.postDatas={
            tel:self.postData.phone,
            code:self.postData.code,
            terminal:3,
            country_code:86,
            country_id:41
          }
          self.$http.post(`${process.env.API.USER}/login`,self.postDatas).then(res => {
            if(res.data.errcode=='0'){
//              this.$message({
//                type: 'success',
//                message: "登陆成功"
//              });
//
              localStorage.setItem('Authorization',res.data.Authorization)
//              self.$router.push('/')
//              location.href=`${process.env.URL.USER}/#/`
                self.$router.push('/')
            }else{
              //self.$messagebox.alert(res.data.errmsg)
              this.$message({
                type: 'success',
                message: res.data.errmsg
              });
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      open5() {
        if($(".mark").hide()){
          $(".mark").show()
          $(".marks").show()
        }
      },
      close(){
        $(".mark").hide()
          $(".marks").hide()
      }
    },
    mounted () {

      document.title= '瑞时会-登陆'
      let self=this;
//      ${process.env.API.MARKET}/market/buyer/goodsList
      self.$http.get(`${process.env.API.NEWS}/news/agreement?name=USER`,).then(res => {
        if(res.data.errcode=='0'){
          self.contentList=res.data.data
          res.data.data.publish_time=new Date(res.data.data.publish_time * 1000).toLocaleDateString('zh-cn').replace(/\//g, '-')
        }else{

        }
      }).catch(err => {
        console.log(err)
      })
      localStorage.removeItem('Authorization')
    },
    components: {
      Top,  //头部
      Navs, //导航
      Foot  //公共底部
    },
  }
</script>
<style type="text/less" lang="less" scoped>
#app{
  position: relative;
}
 .mark{
      width: 882px;
      max-height: 700px;
      overflow-y: auto;
      padding:30px;
      position: absolute;
      z-index: 9999;
      background: #fff;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      margin:auto;
      transition:all .4s;
      display: none;
      .close{
        cursor: pointer;
        position: absolute;
        right: 30px;
        top:20px;
      }
      .title{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-bottom: 30px;
        border-bottom: 1px solid #ebebeb;
        p{
          font-size: 18px;
          padding-bottom: 10px;
        }
        span{
          font-size: 14px;
          color: #999;
        }
      }
      .cont{
        font-size: 14px;
        line-height: 36px;
        p{
          padding-bottom: 50px;
        }
      }
    }
    .marks{
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: 999;
      background: #000;
      opacity: .7;
      position: absolute;
      display: none;
    }
  .Information{
    position: relative;
    .phoness{
      position: absolute;
      right: 16%;
      top: 7px;
      color: #939699;
      font-size: 12px;
      display: flex;
      p{
        position: relative;
        padding-right: 21px;
        &:first-child{
          cursor: pointer;
        }
        &:last-child{
          padding-left: 20px;
        }
        img{
          position: absolute;
          padding-left: 22px;
          padding-right: 15px;
          left: -25px;
        }
      }
    }
    .mian{
      max-width: 1200px;
      min-width: 1000px;
      padding: 50px 0 30px;
      margin: 0 auto;
      background: #fff;
      .login{
          width: 472px;
          height: 308px;
          margin: 192px auto;
          h2{
            color: #333;
            font-weight: normal;
            margin-bottom: 30px;
          }
          .phone{
              width: 472px;
              height: 79px;
              input{
                  width: 100%;
                  box-sizing: border-box;
                  height: 50px;
                  border: 1px solid #ccc;
                  outline:medium;
                  padding-left: 15px;
                  padding-right: 15px;
              }
              .reminder{
                  font-size: 13px;
                  color: #c11c23;
                  padding-top: 6px;
              }

          }
          .code{
              position: relative;
              input{
                width: 292px;
                box-sizing: border-box;
                height: 50px;
                border: 1px solid #ccc;
                outline:medium;
                padding-left: 15px;
                padding-right: 15px;
              }
              .verification{
                cursor: pointer;
                  position: absolute;
                  top: 0;
                  right: 0;
                  width: 180px;
                  height: 50px;
                  background: #333;
                  text-align: center;
                  line-height: 50px;
                  font-size: 16px;
                  color: #fff;
                  border:none;
              }
            .reminder{
              font-size: 13px;
              color: #c11c23;
              padding-top: 6px;
            }
          }
          .checks{
              margin-top: 33px;
              font-size: 12px;
              color: #999;
              span{
                  color: #333;
                  cursor: pointer;
              }
          }
          .btn{
            cursor: pointer;
              width: 472px;
              height: 50px;
              text-align: center;
              line-height: 50px;
              color: #fff;
              font-size: 15px;
              background: #181818;
              margin-top: 30px;
          }
      }
    }
  }
</style>
