<template>
  <div class="Purchase">
    <Top></Top>
    <Navs :num="1"></Navs>
    <div class="mian">
        <div class="title">
          地址信息
        </div>
        <div class="maps">
          <ul class="map">
            <li v-for="(item,index) in dataInfo" :class="{'active':default_active==index}" >
              <p>
                <span>{{item.receiver}}</span>
                <span>{{item.receiver_tel}}</span>
                <button v-if="default_active==index">默认地址</button>
                <!--<img src="" alt="">-->
              </p>
              <p>{{item.address}}</p>
              <div>
                <span @click="radioShow(item,index)">设为默认</span>
                <span @click="bianji(item)">编辑</span>
                <span @click="delShow(item,index)">
                  删除
                </span>
              </div>
            </li>
          </ul>
          <div class="add"  @click="$router.push('/buy/addAddress')">
            添加地址

          </div>
        </div>
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
            <span></span>
            <!--<span @click="delShop(dataList)">-->
              <!--<img src="../../assets/img/login/del.png" class="del">-->
            <!--</span>-->
          </li>
          <li class="postPai">
            <span class="pay-title">配送方式</span>
            <span class="item" :class="{'actives':postData.delivery_method==1}" @click="postData.delivery_method=1">快递配送</span>
            <span class="item":class="{'actives':postData.delivery_method==2}" @click="postData.delivery_method=2">线下交货</span>
          </li>
        </ul>
      </div>
      <div class="tit">
        <div class="titPost">
          支付方式 <span>(暂只支持线下转账，默认为选中)</span>
        </div>
        <div class="postMoney">
            <div>
              <el-radio v-model="radio" :label="radio" @click="radioClick()"> </el-radio>
            </div>
            <div>
              <img src="../../assets/img/buy/accounts.png">
              <p>
                <span>线下转账</span>
                <nav>转账至瑞时会平台的账户。并上传转账证
明，平台审核通过即完成支付</nav>
              </p>
            </div>
        </div>
      </div>
      <div class="btns">
        <div>
          <span>订单金额</span>
          <span>{{dataList.price}}</span>
        </div>
        <div>
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
          pay_method:'1'
        }
      }
    },
    created(){
      this.id=this.$route.query.id
    },
    methods:{
      radioClick(){

      },

      bianji(item){
        this.$router.push({name:'AddAddress',params:item})
      },
      //改变默认地址
      radioShow(item,index){
        let self = this
        if( self.default_active!=index){
          self.$http.put(`${process.env.API.USER}/user/address`,{id:item.id,is_default:1}).then(res => {
            if(res.data.errcode=='0'){
              self.default_active=index;

            }else{

            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      //删除地址
      delShow(item,index){
        let self = this
         self.$http.delete(`${process.env.API.USER}/user/address`,{
            params: {
              id:item.id
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
      //提交
      sub(){
        let self=this;
        if(!self.dataInfo){
          this.$message.error("请选择收货地址");
          return false
        }
        self.$http.post(`${process.env.API.MARKET}/market/buyer/order`,{
          address_id:self.datas.id,
          delivery_method:self.postData.delivery_method,
          gid:this.$route.query.id,
          pay_method:1,
          seller_uid:this.$route.query.uid,
        }).then(res=>{
            if(res.data.errcode=='0'){
              this.$message({
                type: 'success',//success
                message: "购买成功"
              });
              self.$router.push(`/buy/prove?gid=${this.$route.query.id}&id=${res.data.id}&defult=${self.postData.delivery_method}`)
            }else{
              this.$message.error("购买失败");
            }

        }).catch(erro=>{
          this.$message.error("购买失败");
        })
      },
      //删除商品
      delShop(){
        let self=this;
        this.$message({
          type: 'success',//success
          message: "删除成功"
        });
        self.$router.push("/buy")
      },
    },
    mounted() {
        document.title= '瑞时会-直买'
        window.scrollTo(0,0)
        let self=this;
      /**
       * 地址信息
       */
      self.$http.get(`${process.env.API.USER}/user/address`).then(res=>{
          if(res.data.data.length>0){
            self.dataInfo=res.data.data
          }
        }).catch(error=>{

        })
      /**
       * 商品信息
       */
      self.$http.get(`${process.env.API.MARKET}/market/buyer/orderplace`,{
        params:{
          gid:this.$route.query.id
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
  .Purchase{
    .mian{
      box-sizing:border-box;
      max-width: 1200px;
      min-width: 1000px;
      padding: 60px 10px 95px;
      margin: 0 auto;
      background: #fff;
      .title{
        font-size: 24px;
        color: #333;
        padding-left: 30px;
        padding-right: 30px;
      }
      .titles{
        padding-top:60px;
      }
      .maps{
       padding: 0 30px;
       border-bottom: 1px solid #e6e6e6;
       .map{
         display: flex;
         flex-wrap: wrap;
         li{
           cursor: pointer;
           position: relative;
           width: 29.8%;
           margin-right: 30px;
           max-width: 346px;
           height: 137px;
           border: solid 1px #cccccc;
           margin-top: 30px;
           padding: 0 20px;
           box-sizing: border-box;
           transition: all .4s;
           p{
             padding-top: 15px;
             button{
               width: 64px;
               height: 17px;
               background-color: #e9bf76;
               color: #ffffff;
               border: none;
               font-size: 14px;
               margin-left: 10px;
             }
             &:first-child{
               font-weight: bold;
               span{
                 &:last-child{
                   font-weight: normal;
                   padding-left: 30px;
                 }
               }
             }
           }
           div{
             z-index: 10;
             bottom:10px;
             position: absolute;
             right: 30px;
             display: none;
             font-size: 14px;
             color: #666;
             span{
               padding-left: 10px;
             }
           }
           &:hover{
             background: #fafafa;
             div{
              display: block;
             }
           }
         }
         .active{
           &:after{
             position: absolute;
             content:"";
             left: 0;
             right: 0;
             bottom: 0;
             top: 0;
             background: url("../../assets/img/login/border.png") no-repeat;
             background-size: 100% 100%;
           }
         }
       }
       .add{
         width: 151px;
         height: 40px;
         border: solid 1px #cccccc;
         margin-top: 28px;
         margin-bottom: 60px;
         text-align: center;
         line-height: 40px;
         box-sizing: border-box;
         cursor: pointer;
         transition: all .4s;
         &:hover{
           background: #333;
           color: #ebebeb;
         }
       }
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
        .postMoney{
          padding-top: 30px;
          display: flex;
          div{
            &:first-child{
              display: flex;
              align-items: center;
            }
            &:last-child{
              margin-left: 20px;
              display: flex;
              padding:15px 50px 15px 30px;
              width: 469px;
              height: 110px;
              border: 1px solid #e4e4e4;
              box-sizing: border-box;
              p{
                padding-left: 30px;
                font-size: 18px;
                color: #666;
              }
              nav{
                font-size: 14px;
                padding-top: 12px;
                color: #999;
              }
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
          &:first-child{
            padding-bottom: 35px;
            span{
              &:first-child{
                color: #999;
              }
              &:last-child{
                color: #333;
              }
            }
          }
          &:last-child{
            justify-content: flex-end;
            display: flex;
            cursor: pointer;
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
          }
        }
      }
    }
  }
</style>
<style type="text/less" lang="less">
.Purchase{
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
