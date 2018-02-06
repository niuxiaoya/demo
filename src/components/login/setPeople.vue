<template>
  <div class="setPeople">
    <!-- :num="0" -->
    <Navs ></Navs>
    <div class="mainBox">
      <div class="left">
        <navList :nums="0"></navList>
      </div>
      <div class="right" >
        <div class="title">
          个人设置
        </div>
        <div class="info">
          <div class="input">
            <span>收货人</span>
            <input type="file" @change="uploadImg($event, 1)" class="img">
            <img :src="front_url1" alt="" class="imgss"><!--
            <img :src="infoList.pic" alt="" class="imgss" v-if="infoList.pic">-->
          </div>
          <div class="input">
            <span>昵称</span>
            <input type="tel" v-model="infoList.username" placeholder="请输入">
          </div>
          <div class="input">
            <span>性别</span>
            <div class="selInputs">
              <input type="text" readonly v-model="infoList.sex" placeholder="请选择"@click="isSex=!isSex">
            </div>
            <div class="select" v-if="isSex">
              <p v-for="item in sex" @click="sexClick(item)">
                {{item.name}}
              </p>
            </div>
          </div>
          <div class="input">
            <span>出生日期</span>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <div class="button">
            <button @click="sub">提交</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="javascript">
  export default {
    data(){
      return {
        dataList:'',
        value1: '',
        infoList:{
          username:'',
          tel:'',
          email:'',
          proposal:'',
          nameid:'',
          sexId:'',
          sex:'',
          fid:'',
          pic:''
        },
        sex:[
          {
            id:1,
            name:"男"
          },{
            id:2,
            name:"女"
          }
        ],
        isSex:false,
        front_url1: require('@/assets/img/login/photo.png'),
//        self.dataList.avatar_pic||
      }
    },
    created() {
    },
    mounted(){
      document.title= '瑞时会-个人中心'
      let self=this;
      self.$http.get(`${process.env.API.USER}/user/userinfo`).then(res=>{
        if(res.data.data){
          self.dataList=res.data.data
          self.infoList.tel=self.dataList.tel
          self.infoList.username=self.dataList.username ||self.dataList.tel
          self.dataList.birthday = new Date(self.dataList.birthday * 1000).toLocaleDateString('zh-cn').replace(/\//g, '-')
          self.value1=self.dataList.birthday  //生日
          self.infoList.sexId=self.dataList.sex  //性别id
         // self.infoList.pic=self.dataList.avatar_pic  //fid
          self.infoList.fid=self.dataList.avatar_fid  //fidId
          self.front_url1 = self.dataList.avatar_pic || self.front_url1

          for(let i=0;i<self.sex.length;i++){
            if(self.sex[i].id==self.infoList.sexId){
              self.infoList.sex=self.sex[i].name

            }
          }
        }
      }).catch(err=>{

      })
    },
    methods:{
      sexClick(item){
        this.infoList.sex=item.name;
        this.infoList.sexId=item.id;
        this.isSex=!this.isSex;
      },
      sub(){
        let self=this;
        if(!self.value1){
          this.$message.error("请填写出生日期");
          return false;
        }
        let d = new Date(this.value1);
        d = d.toLocaleDateString('zh-cn')
        d = d.split('/')
        d[1] = ('00' + d[1]).substr(-2)
        d[2] = ('00' + d[2]).substr(-2)
        d = d.join('')
        this.value1=d
        self.$http.put(`${process.env.API.USER}/user/userinfo`,{
          age:self.value1,
          avatar_id:self.infoList.fid,
          sex:self.infoList.sexId,
          username:self.infoList.username
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
        }).catch(err=>{

        })

      },
      uploadImg (event, type) {
        let that = this
        let form_data = new FormData()
        let file = event.target.files[0]
        form_data.append('file', file)
        this.$http.post(`${process.env.API.USER}/user/upload`, form_data).then(res => {

          if(parseInt(res.data.errcode) === 0) {
            console.log(type)
            if(type==1){
              that.front_url1 = URL.createObjectURL(file)
              that.infoList.fid=res.data.fileinfo.fid
            }
          }

          //  to do
        })
      },
    },
  }
</script>
<style lang="less" scoped type="text/less">
  .setPeople{
    .mainBox{
      .right{
        .info{
          .input{
            position: relative;
            padding-top: 25px;
            line-height: 40px;
            display: flex;
            .selInputs{
              position: relative;
              &::before{
                content:'';
                position: absolute;
                width: 0;
                height: 0;
                right: -5px;
                bottom: 0px;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-bottom: 10px solid #666;
                transform:rotate(135deg);
                z-index: 1;
              }
            }
            .select{
              position: absolute;
              min-height: 10px;
              width: 338px;
              border: 1px solid #ccc;
              border-top: none;
              left: 85px;
              box-sizing: border-box;
              max-height: 300px;
              overflow-y: auto;
              top: 66px;
              z-index: 9;
              p{
                transition: all .4s;
                line-height: 28px;
                color: #333;
                font-size: 14px;
                padding: 0 10px;
                cursor: pointer;
                background: #f5f5f5;
                &:hover{
                  background-color: #333;
                  font-size: 16px;
                  color: #ebebeb;
                }
              }
            }
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
            .imgss{
              width: 68px;
              height: 68px;
              border-radius: 50%;
              object-fit: cover;
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
.setPeople{
  .el-input__inner{
    width: 338px;
  }
  .el-date-editor{
    width: 338px;
  }
  .el-picker-panel{
    width: 338px;
  }
}
</style>
