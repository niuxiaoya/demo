<template>
  <div class="People">
    <Top></Top>
    <!-- :num="0" -->
    <Navs ></Navs>
    <div class="mainBox">
      <div class="left">
        <navList :nums="4"></navList>
      </div>
      <div class="right">
        <div class="title">
          实名认证
        </div>
        <div class="info">
          <div class="fileBuy" v-if="this.$route.query.id==2">
            <span class="reds">失败原因：</span>
            {{result}}
          </div>
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
            <p class="uload" v-if="this.$route.query.id==2">
              <span>重新上传</span>
            </p>
          </div>
          <div class="input">
            <span></span>
            <input type="file" @change="uploadImg($event, 2)" class="img">
            <img :src="front_url2" alt="">
            <p class="uload" v-if="this.$route.query.id==2">
              <span>重新上传</span>
            </p>
          </div>
          <div class="button">
            <button @click="sub" v-if="isShow">提交</button>
          </div>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>
<script type="javascript">
  export default {
    data(){
      return {
        dataList:'',
        dataLists:'',
        isShow:true,
        result:'',
        infoList:{
          name:'',
          card:'',
          tel:'',
          back_fid:'',
          front_fid:''
        },
        front_url1: require('@/assets/img/login/add1.png'),
        front_url2: require('@/assets/img/login/add1.png'),
        ifFile:false
      }
    },
    mounted() {
      document.title= '瑞时会-实名认证'
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
        if(self.$route.query.id==2){
          self.$http.put(`${process.env.API.USER}/user/identify`,{
            back_fid:self.infoList.back_fid || self.back_fid,
            front_fid:self.infoList.front_fid || self.front_fid,
            id_number:self.infoList.card,
            realname:self.infoList.name
          }).then(res=>{
            this.$message({
              type: 'success',//success
              message: "提交成功"
            });
            this.$router.push('/login/nameSucess')
          }).catch(err=>{

          })
          return false
        }else if(self.$route.query.id==1){
          self.$http.post(`${process.env.API.USER}/user/identify`,{
            back_fid:self.infoList.back_fid,
            front_fid:self.infoList.front_fid,
            id_number:self.infoList.card,
            realname:self.infoList.name
          }).then(res=>{
            this.$message({
              type: 'success',//success
              message: "提交成功"
            });
//          if(self.$router.query.id==1){
//            this.$router.push('/login/name')
//            window.reload()

//          }
            this.$router.push('/login/nameSucess')
          }).catch(err=>{

          })
        }

      }
    },
    created(){
      let self=this
      this.$http.get(`${process.env.API.USER}/user/identify`).then(res=>{
        if(res.data.errcode=='0'){
          self.dataLists=res.data.manage
          self.infoList.name=self.dataLists.realname
          self.infoList.back_fid=self.dataLists.back_fid
          self.infoList.front_fid=self.dataLists.front_fid
          self.infoList.card=self.dataLists.id_number
          self.front_url1 = self.dataLists.back_pic
          self.front_url2 = self.dataLists.front_pic
          self.result = self.dataLists.audit_result
        }
      }).catch(err=>{
        console.log(err)
      })
    },
  }
</script>
<style lang="less" scoped type="text/less">
  .People{
    .mainBox{
      .right{
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
              width: 400px;
              height: 126px;
              margin-left: 88px;
              opacity: 0;
              z-index: 10;
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
            .uload{
              background: none;
              padding-left: 10px;
              cursor: pointer;
              span{
                padding-top: 100px;
                display: inline-block;
                color: #959595;
                position: relative;
                &:after{
                  position: absolute;
                  content: '';
                  width: 55px;
                  height: 1px;
                  background: #636363;
                  bottom: 10px;
                  left: calc(1%);
                }
              }
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
          .fileBuy{
            margin-top: 15px;
            height: 50px;
            background: #ffefef;
            line-height: 50px;
            padding: 0 10px;
            color: #695f5e;
            overflow: hidden;
            span{
              color: #c8162e;
            }
          }
        }
      }
    }
  }
</style>
<style type="text/less" lang="less">

</style>
