<template>
  <div class="prove">
    <Top></Top>
    <Navs :num="1"></Navs>
    <div class="mian">
      <div class="title titles">
        商品信息
      </div>
      <div class="shop">
        <ul>
          <li>
            <span>腕表信息</span>
            <span>单价</span>
            <span>数量</span>
            <span>小计</span>
            <span>操作</span>
          </li>
          <li>
            <span>
              <img :src="dataList.cover_pic">
              <div>
                  <p>{{dataList.title}}</p>
              </div>
            </span>
            <span>{{dataList.price}}</span>
            <span>{{num}}</span>
            <span>{{dataList.price}}</span>
            <span>
              <!--<img src="../../assets/img/login/del.png" class="del" @click="cencelPid()">-->
            </span>
          </li>
          <li class="postPai">
            <span class="pay-title">配送方式</span>
            <span class="item" :class="{'actives':postData.delivery_method==1}" @click="postData.delivery_method=1" v-if="postData.delivery_method==1">快递配送</span>
            <span class="item":class="{'actives':postData.delivery_method==2}" @click="postData.delivery_method=2" v-if="postData.delivery_method==2">线下交货</span>
          </li>
        </ul>
      </div>
      <div class="tit">
        <div class="titInfo">
          转入账户信息
        </div>
        <ul class="infosT">
          <li>开户名称：<span>深圳瑞时会网络有限公司</span></li>
          <li>账      号：<span>4000 1042 0910 0180 213</span></li>
          <li>开户银行：<span>中国工商银行股份有限公司深圳岗厦支行</span></li>
        </ul>
      </div>
      <div class="tit">
        <div class="titPost">
          转账证明 <span>(最多可上传10张)</span>
        </div>
        <div class="payList">
          <ul>
            <li v-for="(item,index) in imgList" >
              <img :src="item" alt="">
              <span @click.stop="imgDel(index)">
                <img src="../../assets/img/closes.png">
              </span>
            </li>
            <li v-if="imgList.length<10">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </li>
          </ul>
        </div>
      </div>
      <div class="btns">
        <div class="sub">
          <span @click="sub">提交</span>
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
        uploadUrl:`${process.env.API.USER}/user/upload`,
        imageUrl:require('../../assets/img/zhuanz.png'),
        imgHead:`${process.env.API.USER}/user/upload`,
        dataList:"",
        datas:'',
        id:'',
        active:1,
        dataInfo:'',
        default_active:0,
        radio: '1',
        default_item:1,
        num:1,
        postData:{
          address_id:'',
          gid:'',
          seller_uid:'',
          delivery_method:1,
          pay_method:'1',
          file_id:[]
        },
        imgList:[
        ]
      }
    },
    created(){
      this.id=this.$route.query.id
      this.postData.delivery_method=this.$route.query.defult
    },
    methods:{
      //删除地址
      delShow(item,index){
        let self = this
         self.$http.delete(`${process.env.API.USER}/user/address`,{
            params: {
              id:item.gid
            }
          }).then(res => {
            if(parseInt(res.data.errcode)===0){
              self.default_active=0;
              self.dataInfo.splice(index, 1)
            }
          }).catch(err => {
            console.log(err)
          })
      },
      handleAvatarSuccess(res, file) {
        if(res.errcode=='0'){
          this.postData.file_id.push(res.fileinfo.fid)
          this.imgList.push(URL.createObjectURL(file.raw))
        }else{
          this.$toast(res.errmsg)
        }
      },
      beforeAvatarUpload(file) {
//        const isJPG = file.type === 'image/jpeg';
        const isLt5M = file.size / 1024 / 1024 < 2;
        if(file.type=='image/jpeg'||file.type=='image/jpg'||file.type=='image/png'||file.type=='image/bmp'){

        }else{
//          this.$message.error(this.$t('isImg'));
          return false
        }
        if (!isLt5M) {
//          this.$message.error(this.$t('is5MB'));
        }
//        return isLt5M;
      },
      imgDel(index){
        this.postData.file_id.splice(index,1)
        this.imgList.splice(index,1)
      },
      //提交
      sub(){
        let self = this
//        if(!self.postData.id){
//          self.$toast(self.$t('isOrder'))
//          return false
//        }
         if(self.imgList.length<=0){
           this.$message.error("请提交转账证明");
          return false
        }else{
          self.$http.post(`${process.env.API.MARKET}/market/buyer/ordercertifypay`,{
            bank_id:self.datas.id,
            file_id:self.postData.file_id,
            id: this.$route.query.id
          }).then(res=>{
            this.$message({
              type: 'success',//success
              message: "提交成功"
            });
            self.$router.push(`/login/myBuy?id=2`)
          }).catch(err=>{
            this.$message.error("提交失败");
          })
        }
      },
      //删除
      cencelPid(){
        let self=this;
        self.$http.put(`${process.env.API.MARKET}/market/buyer/order?id=${self.$route.query.id}`).then(res=>{
            if(res.data.errcode=="0"){
              this.$message({
                type: 'success',
                message: "删除成功"
              });
              self.$router.push("/buy")
            }
            else{
              this.$message.error("删除失败");
            }
        }).catch(err=>{
          this.$message.error("删除失败");
        })
      },
    },
    mounted() {
      document.title= '瑞时会-直买'
        window.scrollTo(0,0)
        let self=this;
      /**
       * 商品信息
       */
      self.$http.get(`${process.env.API.MARKET}/market/buyer/orderplace`,{
        params:{
          gid:this.$route.query.gid,

        }
      }).then(res=>{
        if(parseInt(res.data.errcode)==0){
          self.dataList=res.data.data.goods;
          self.datas=res.data.data.default_address
        }
      }).catch(error=>{

      })


    },
  }
</script>
<style lang="less" scoped type="text/less">
  .prove{
    .mian{
      box-sizing:border-box;
      max-width: 1200px;
      min-width: 1000px;
      padding: 60px 10px 95px;
      margin: 0 auto;
      background: #fff;
      .titles{
        font-size: 24px;
        color: #333;
        padding-left: 30px;
        padding-right: 30px;
      }
      .shop{
        padding: 30px 30px 60px;
        border-bottom: 1px solid #e6e6e6;
        box-sizing: border-box;
        ul {
          font-size: 14px;
          color: #333;
          li{
            display: flex;
            padding: 25px 20px;
            border-bottom: 1px solid #e6e6e6;
            &:first-child{
              border-top: 1px solid #ccc;
              border-bottom: 1px solid #ccc;
              line-height: 40px;
              background: #f1f1f1;
              padding:0 20px;
            }
            span{
              flex: 1;
              display: flex;
              align-items: center;
              div{
                flex: 1;
                padding-left: 20px;
                padding-right: 40px;
                color: #333;
                font-size: 16px;
                p{
                  height: 46px;
                  line-height: 26px;
                  overflow:hidden;
                  text-overflow:ellipsis;
                  display:-webkit-box;
                  -webkit-box-orient:vertical;
                  -webkit-line-clamp:2;
                }
              }
              img{
                width: 110px;
                height: 110px;
                object-fit: cover;
              }
              .del{
                width: 17px;
                height: 17px;
                cursor: pointer;
              }
              &:first-child{
                flex: 3;
              }
              &:last-child{
                flex: .5;
              }
            }
          }
          .postPai{
            display: block;
            padding-bottom: 40px;
            span{
              float: left;
            }
            .pay-title {
              width: 93px;
              font-size: 16px;
            }
            .item {
              cursor: pointer;
              position: relative;
              width: 134px;
              height: 30px;
              border:1px solid #ccc;
              margin-right: 20px;
              line-height: 30px;
              margin-top: -5px;
              display: block;
              text-align: center;
              color: #999;
              z-index: 10;
            }
            .actives{
              &:after{
                position: absolute;
                content:"";
                left: 0;
                right: 0;
                bottom: 0;
                top: 0;
                background: url("../../assets/img/login/border.png") no-repeat;
                background-size: cover;
              }
            }
          }
        }
      }
      .tit{
        padding-top: 40px;
        font-size: 24px;
        padding-left: 30px;
        color: #333;
        padding-bottom: 60px;
        border-bottom: 1px solid #e6e6e6;
        .titPost{
          span{
            font-size: 16px;
            color: #ccc;
          }
        }
        .payList{
          ul{
            display: flex;
            flex-wrap: wrap;
            li{
              width: 160px;
              height: 160px;
              position: relative;
              margin-top: 30px;
              margin-right: 30px;
              img{
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
              span{
                position: absolute;
                right: -7px;
                top: -7px;
                border-radius: 50%;
                img{
                  width: 26px!important;
                  height: 26px!important;
                }
              }
            }
          }
        }
        .infosT{
          display: flex;
          font-size: 16px;
          flex-wrap: wrap;
          li{
            width: 50%;
            padding-top: 25px;
            color: #999;
            span{
              color: #333;
            }
          }
        }
      }
      .btns{
        padding-right: 30px;
        padding-top: 60px;
       text-align: right;
        div{
          font-size: 24px;
            padding-bottom: 35px;
            span{
              width: 300px;
              height: 60px;
              background-color: #333;
              color: #fafafa;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 17px;
            }
          justify-content: flex-end;
          display: flex;
          cursor: pointer;
          &:last-child{

          }
        }
      }
    }
  }
</style>
<style type="text/less" lang="less">
  .payList{
    .avatar{
      width: 160px!important;
      height: 160px!important;
    }
  }
.prove{
  .el-radio{
    width: 48%;
    padding-bottom: 18px;
    margin-left: 0;
    .is-checked{
      .el-radio__inner{
        background: none;
        border: 1px solid #000;
        &:after{
          background: #000!important;
        }
      }
    }
  }
  .el-checkbox{
    width: 49%;
    margin-left: 0;
    padding-bottom: 18px;
    .el-checkbox__inner{
      background: #fff;
      &:after{
        border-color: #333;
      }
    }
  }
  .el-radio__label{
    display: none;
  }

}
</style>
