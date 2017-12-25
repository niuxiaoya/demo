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
            <input type="name" v-model="infoList.name" placeholder="请输入姓名">
          </div>
          <div class="input">
            <span>证件号码</span>
            <input type="text" v-model="infoList.card" placeholder="请输入证件号码">
          </div>
          <div class="input">
            <span>证件正面照</span>
            <input type="file" @change="uploadImg($event, 1)" class="img">
            <img :src="front_url1" alt="">
          </div>
          <div class="input">
            <span></span>
            <input type="file" @change="uploadImg($event, 2)" class="img">
            <img :src="front_url2" alt="">
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
          tel:'',
          back_fid:'',
          front_fid:''
        },
        front_url1: require('@/assets/img/login/add1.png'),
        front_url2: require('@/assets/img/login/add1.png')
      }
    },
    mounted() {
      let self=this;
      self.$http.get(`${process.env.API.USER}/user/userinfo?nonce=0.9954606018503807`).then(res=>{
        if(res.data.data){
          self.dataList=res.data.data
         self.infoList.tel=self.dataList.tel
        }
      }).catch(err=>{

      })
    },
    methods:{
      uploadImg (event, type) {
        let that = this
        let form_data = new FormData()
        let file = event.target.files[0]
        form_data.append('file', file)
        this.$http.post(`${process.env.API.USER}/user/upload`, form_data).then(res => {
          if(parseInt(res.data.errcode) === 0) {
            if(type==1){
              that.front_url1 = URL.createObjectURL(file)
              that.infoList.back_fid=res.data.fileinfo.fid

            }else{
              that.front_url2 = URL.createObjectURL(file)

              that.infoList.front_fid=res.data.fileinfo.fid
            }
          }

          //  to do
        })
      },
      sub(){
        let reg = /^\d{18}$/
        let self=this;
        if(!self.infoList.name){
          this.$message.error('请填写您的姓名');
          return false;
        }
        if(!self.infoList.card){
          this.$message.error("请填写您的证件号码");
          return false;
        }
        if (!reg.test(self.infoList.card)) {
          this.$message.error("请正确填写您的证件号码");
          return false
        }
        if (!self.infoList.back_fid) {
          this.$message.error("请上传您的证件照片");
          return false
        }
        if(!self.infoList.front_fid){
          this.$message.error("请上传您的证件照片");
          return false;
        }
        self.$http.post(`${process.env.API.USER}/user/identify`,{
            back_fid:self.infoList.back_fid,
            front_fid:self.infoList.front_fid,
            id_number:self.infoList.tel,
            realname:self.infoList.name
          }).then(res=>{
          this.$message({
            type: 'success',//success
            message: "提交成功"
          });
          this.$router.push('/login/nameSucess')
        }).catch(err=>{

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
