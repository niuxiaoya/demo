<template>
  <div class="myBuy">
    <Top></Top>
    <!-- :num="0" -->
    <Navs></Navs>
    <div class="mainBox">
      <div class="left">
        <navList :nums="3"></navList>
      </div>
      <div class="right">
        <div class="title">
          <span @click="fn(1)" :class="{'navActive':navId == 1}">待付款</span>
          <span @click="fn(2)" :class="{'navActive':navId == 2}">已付款</span>
          <span @click="fn(3)" :class="{'navActive':navId == 3}">待收货</span>
          <span @click="fn(4)" :class="{'navActive':navId == 4}">待评价</span>
          <span @click="fn(5)" :class="{'navActive':navId == 5}">已失效</span>
        </div>
        <div class="content">
          <div class="shop shopTitle">
            <ul>
              <li class="headTitle">
                <span>腕表信息</span>
                <span>单价</span>
                <span>状态</span>
                <span>操作</span>
              </li>
            </ul>
          </div>
          <div v-show="dataList.length<=0&&loading" v-loading="loading" element-loading-text="加载中" style="height: 277px;border-bottom: 1px solid #e6e6e6;"></div>
          <div v-if="navId==1">
            <div class="shop">
              <ul>
                <li v-for="(item,index) in dataList" @click="buyDetail(1,item)">
                  <span>
                    <img :src="item.cover_pic" class="info_img">
                    <div>
                        <p>{{item.title}}</p>
                    </div>
                  </span>
                  <span>{{item.price}}</span>
                  <span class="yellow">待付款</span>
                  <span class="last">
                    <p class="postZf" @click.stop="pstZhfu(item)">立即支付</p>
                    <!--<p @click="delet(item,1)"><img src="../../assets/img/login/del.png" @click="cencelPid(item)"></p>-->
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div v-if="navId==2">
            <div class="shop">
              <ul>
                <li v-for="(item,index) in dataList" @click="buyDetail(2,item)">
                  <span>
                    <img :src="item.cover_pic" class="info_img">
                    <div>
                        <p>{{item.title}}</p>
                    </div>
                  </span>
                  <span>{{item.price}}</span>
                  <span class="tow">
                    <i>已付款</i>
                    <i>准备配送中...</i>
                  </span>
                  <span>
                    <!--<p @click="delet(item,2)"><img src="../../assets/img/login/del.png"></p>-->
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div v-if="navId==3">
            <div class="shop">
              <ul>
                <li v-for="item in dataList"  @click="buyDetail(3,item)">
                  <span>
                    <img :src="item.cover_pic" class="info_img">
                    <div>
                        <p>{{item.title}}</p>
                    </div>
                  </span>
                  <span>{{item.price}}</span>
                  <span>已付款</span>
                  <span class="last">
                    <p @click.stop="yesSh(item)">确认收货</p>
                    <!--<p @click="delet(item,3)"><img src="../../assets/img/login/del.png"></p>-->
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div v-if="navId==4">
            <div class="shop">
              <ul>
                <li v-for="item in dataList"  @click="buyDetail(4,item)">
                  <span>
                    <img  :src="item.cover_pic" class="info_img">
                    <div>
                        <p>{{item.title}}</p>
                    </div>
                  </span>
                  <span>{{item.price}}</span>
                  <span class="hui">待评价</span>
                  <span>
                     <!--class="last"<p>评价</p>-->
                   <p @click.stop="delet(item,index,4)"><img src="../../assets/img/login/del.png"></p>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div v-if="navId==5">
            <div class="shop">
              <ul>
                <li v-for="(item,index) in dataList" @click="buyDetail(5,item)">
                  <span>
                    <img  :src="item.cover_pic" class="info_img">
                    <div>
                        <p class="huis">{{item.title}}</p>
                    </div>
                  </span>
                  <span class="huis">{{item.price}}</span>
                  <span class="huis">已失效</span>
                  <span>
                    <p @click.stop="delet(item,index,5)"><img src="../../assets/img/login/del.png"></p>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="page" v-show="isShow">
            <el-pagination layout="prev,pager,next" :page-count="pagecount" @current-change="handlerPage" :current-page="currentPage"></el-pagination>
            <span class="item">共   <span>{{pagecount}}</span>页</span>
          </div>
        </div>
        <no-more v-if="dataList.length <= 0 && !loading"></no-more>
        <!--<div class="nones" v-if="!dataList">-->
          <!--<noneDates></noneDates>-->
        <!--</div>-->
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>
<script type="javascript">

  export default {
    data() {
      return {
        dataList: [],
        navId: this.$route.query.id || 1,
        process : 'pay',
        pagecount:1,
        currentPage:1,
        p:1,
        isShow:false,
        loading:true
      }
    },
    methods:{
      /**
       * 点击页码获取数据
       * */
      handlerPage(val) {
        this.currentPage = val
        if(val > 0 && val <= this.pagecount) {
            this.info(val)
            this.p = val
            window.scrollTo(0,0)
        }
      },
      fn(index){
        this.p=0;
        this.pagecount=0
        let self =this;
        switch (index){
          case 1:
            this.process='pay'
            this.navId=1;
            self.info()

            break;
          case 2:
            this.process='paid'
            this.navId=2;
            self.info()
            break;
          case 3:
            this.process='delivery'
            this.navId=3;
            self.info()
            break;
          case 4:
            this.process='evaluate'
            this.navId=4;
            self.info()
            break;
          case 5:
            this.process='lose'
            this.navId=5;
            self.info()
            break;
        }
      },
      info(p){
        let self =this;
        self.dataList=[];
        self.loading=true;
        this.isShow=false
        this.$http.get(`${process.env.API.MARKET}/market/buyer/order`,{params:{
          p: p,     //  页码
          rows: 10,
          process:self.process,

        }}).then(res=>{
          if(res.data.errcode=='0'){
            this.dataList=res.data.data
            this.p=res.data.page.p
            this.pagecount = parseInt(res.data.page.total_pages)  //  总共多少页
            this.isShow=true
          }
          self.loading=false;
        }).catch(err => {
          this.p = 1
          this.isShow=false
          self.dataList=[]
          self.loading=false;
        })
      },
      delet(item,index,i){
        let self = this;
        switch (i){
          case i:
            self.$http.delete(`${process.env.API.MARKET}/market/buyer/order`,{
              params:{
                id:item.bill_sn
              }
            }).then(res=>{
              if(res.data.errcode=='0'){
                this.$message({
                  type: 'success',//success
                  message: "删除成功"
                });
//                self.dataList.splice(index, 1)
                self.info()
              }
            }).catch(err=>{
              this.$message.error("删除失败");
            })
            break;
        }
      },
      pstZhfu(item){
        this.$router.push(`/buy/prove?gid=${item.goods_gid}&id=${item.bill_sn}&defult=${item.pay_method}`)
      },
      cencelPid(item){
        let self=this;
        self.$http.put(`${process.env.API.MARKET}/market/buyer/order`,{
            id:item.bill_sn
        }).then(res=>{
          this.$message({
            type: 'success',//success
            message: "删除成功"
          });
          self.info()
        }).catch(err=>{
          this.$message.error("删除失败");
        })
      },
      yesSh(item){
        let self=this
        this.$confirm('为了避免造成个人经济损失，请务必保证收到货物后再确认收货！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$http.put(`${process.env.API.MARKET}/market/buyer/received`,{
            bill_sn:item.bill_sn
          }).then(res=>{
            if(res.data.errcode=="0"){
              this.$message({
                type: 'success',
                message: '已确认!'
              });
              self.info()
            }
          }).catch(err=>{

          })
        }).catch(() => {

        });
      },
      buyDetail(i,item){
        if(i==1){
          this.$router.push(`/buy/purchaseResult?id=${item.bill_sn}&item=1`)
          return false
        }
        this.$router.push(`/buy/purchaseResult?id=${item.bill_sn}`)
      }
    },
    mounted() {
      window.scrollTo(0,0)
      document.title= '瑞时会-我的购买'
      let self=this;
      if(this.$route.query.id==undefined){
        this.$route.query.id=1
      }
      self.fn(Number(this.$route.query.id))
        self.info(Number(this.$route.query.id))
    },
  }
</script>
<style lang="less" scoped type="text/less">
  .myBuy {
    .mainBox {
      .right {
        .title {
          font-size: 18px;
          span {
            position: relative;
            color: #ccc;
            padding-right: 20px;
            padding-left: 15px;
            cursor: pointer;
            &:first-child {
              padding-left: 0;
            }
            &:after {
              position: absolute;
              content: "";
              right: 0;
              height: 20px;
              top: 3px;
              width: 1px;
              border-right: 1px solid #e6e6e6;
            }
            &:last-child {
              &:after {
                position: absolute;
                content: "";
                right: 0;
                height: 20px;
                top: 3px;
                width: 1px;
                border-right: none;
              }
            }
          }
          .navActive {
            color: #333;
          }
        }
        .content {
          .shop {
            padding-bottom: 60px;
            box-sizing: border-box;
            ul {
              font-size: 14px;
              color: #333;
              li {
                display: flex;
                padding: 25px 20px;
                border-bottom: 1px solid #e6e6e6;
                cursor: pointer;
                span {
                  flex: 1;
                  display: flex;
                  align-items: center;
                  &:last-child{
                    flex: 1.6;
                  }
                  div {
                    flex: 1;
                    padding-left: 20px;
                    padding-right: 40px;
                    color: #333;
                    p {
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
                    cursor: pointer;
                    width: 17px;
                    height: 17px;
                  }
                  .info_img {
                    width: 86px;
                    height: 86px;
                    padding: 1px;
                    border: 1px solid #ccc;
                    object-fit: cover;
                  }
                  &:first-child {
                    flex: 3;
                  }
                }
                .yellow{
                  color: #e9bf76;
                  .postZf{
                    cursor: pointer;
                  }
                }
                .last{
                  p{
                    &:first-child{
                      width: 80px;
                      height: 30px;
                      border: 1px solid #ccc;
                      margin-right: 40px;
                      text-align: center;
                      line-height: 30px;
                    }
                  }
                }
                .hui{
                  color: #999;
                }
                .huis{
                  color: #ccc;
                }
                .tow{
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: flex-start;
                  i{
                    font-style: normal;
                    &:last-child{
                      color: #999;
                    }
                  }
                }
              }

            }
          }
          .shopTitle{
            padding: 30px 0px 0px;
            .headTitle{
              border-top: 1px solid #ccc;
              border-bottom: 1px solid #ccc;
              line-height: 40px;
              background: #f1f1f1;
              padding: 0 20px;
            }
          }
        }
      }
    }
    .page{
      display: flex;
      border-bottom: 1px solid #e9e9e9;
      padding: 20px 0;
      justify-content: flex-end;
    }
  }
</style>
