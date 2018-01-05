<template>
  <div class="Purchases">
    <Top></Top>
    <Navs :num="1"></Navs>
    <div class="mian">
        <div class="title">
          地址信息
        </div>
        <div class="maps">
          <ul class="map">
            <li >
              <p>
                <span>{{dataList.receiver}}</span>
                <span>{{dataList.receiver_tel}}</span>
              </p>
              <p>{{dataList.address}}</p>
            </li>
          </ul>
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
          </li>
          <li class="postPai">
            <span>订单编号：{{dataList.bill_sn}}</span>
            <span>支付方式：{{dataList.pay_method_name}}</span>
            <span>配送方式：{{dataList.delivery_method_name}}</span>
            <span>下单时间：{{dataList.order_time}}</span>
          </li>
        </ul>
      </div>
      <div class="btns">
        <div>
          <span>订单金额</span>
          <span>￥1000000.00</span>
        </div>
        <div v-show="isTrue">
          <span @click="sub(1)">立即支付</span>
          <span @click="sub(2)">取消订单</span>
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
        isTrue:false,
        dataList:"",
        datas:'',
        id:'',
        item:'',
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
      this.item=this.$route.query.item
      if(this.item){
        this.isTrue=true
      }
    },
    methods:{
      bianji(item){
        this.$router.push({name:'AddAddress',params:item})
      },
      //提交
      sub(item){
        let self=this;
        switch(item){
          case 1:
            self.tijiao()
            break;
          case 2:
            self.cencelPid()
            break;
        }
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
      //提交
      tijiao(){
        let self=this;
        this.$router.push(`/buy/prove?gid=${self.dataList.gid}&id=${self.dataList.bill_sn}&defult=${self.dataList.pay_method}`)

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
      self.$http.get(`${process.env.API.MARKET}/market/buyer/orderdetails`,{
        params:{
          id:this.$route.query.id
        }
      }).then(res=>{
        if(parseInt(res.data.errcode)==0){
          res.data.data.order_time=new Date(res.data.data.order_time * 1000).toLocaleDateString('zh-cn').replace(/\//g, '-')
          self.dataList=res.data.data;
//          self.datas=res.data.data.default_address
        }
      }).catch(error=>{

      })


    },
  }
</script>
<style lang="less" scoped type="text/less">
  @color-ccc:#ccc;
  .Purchases{
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
         margin-bottom: 60px;
         li{
           cursor: pointer;
           position: relative;
           width: 29.8%;
           margin-right: 30px;
           max-width: 346px;
           height: 137px;
           border: solid 1px @color-ccc;
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
         border: solid 1px @color-ccc;
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
        box-sizing: border-box;
        ul {
          font-size: 14px;
          color: #333;
          li{
            display: flex;
            padding: 25px 20px;
            border-bottom: 1px solid #e6e6e6;
            &:first-child{
              border-top: 1px solid @color-ccc;
              border-bottom: 1px solid @color-ccc;
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
            padding-bottom: 20px;
            font-size: 16px;
            span{
              color: #999;
              line-height: 26px;
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
            color: @color-ccc;
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
        padding-left: 30px;
        padding-top: 60px;
        div{
          font-size: 18px;
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
            display: flex;
            cursor: pointer;
           span{
             margin-right: 20px;
             width: 202px;
             height: 40px;
             background-color: #333;
             color: #fafafa;
             display: flex;
             justify-content: center;
             align-items: center;
             font-size: 17px;
             &:last-child{
               background: #fff;
               color: #333;
               border: 1px solid @color-ccc;
             }
           }
          }
        }
      }
    }
  }
</style>
<style type="text/less" lang="less">
.Purchases{
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
