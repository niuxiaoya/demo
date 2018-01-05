<template>
  <div class="People">
    <Top></Top>
    <!-- :num="0" -->
    <Navs ></Navs>
    <div class="mainBox">
      <div class="left">
        <navList :nums="2"></navList>
      </div>
      <div class="right">
        <div class="title">
          <span @click="fn(0)" :class="{'navActive':navId == 0}">商品</span>
          <span @click="fn(1)" :class="{'navActive':navId == 1}">资讯</span>
        </div>
        <div class="content">
          <div v-if="navId==0">
            <div class="shop">
              <ul>
                <li>
                  <span>腕表信息</span>
                  <span>单价</span>
                  <span>状态</span>
                  <span>操作</span>
                </li>
                <li v-show="dataList.length<=0&&loading" v-loading="loading" element-loading-text="加载中" style="height: 227px;"></li>
                <li v-for="(item,index) in dataList" @click="detailClick(item)" :key="index" >
                  <span>
                    <img :src="item.cover_pic">
                    <div>
                        <p style="font-weight: normal">{{item.title}}</p>
                    </div>
                  </span>
                  <span>{{item.price}}</span>
                  <span></span>
                  <span><img src="../../assets/img/login/del.png"  class="del" @click.stop="delet(item,index)"></span>
                </li>
              </ul>
            </div>
          </div>
          <div v-if="navId==1">
            <div class="shop shops">
              <ul>
                <li>
                  <span>资讯信息</span>
                  <span>操作</span>
                </li>
                <li v-show="dataList.length<=0&&loading" v-loading="loading" element-loading-text="加载中" style="height: 227px;"></li>
                <li v-for="(item,index) in dataList" @click="detailClick2(item)" :key="index">
                  <span>
                    <img :src="item.content_pic">
                    <div>
                        <p>{{item.title}}</p>
                        <p>{{item.summary}}</p>
                    </div>
                  </span>
                  <span><img src="../../assets/img/login/del.png"  class="del" @click.stop="delet(item,index)"></span>
                </li>
              </ul>
            </div>
          </div>
          <div class="page" v-show="isShow">
            <el-pagination layout="prev,pager,next" :page-count="pagecount" @current-change="handlerPage" :current-page="currentPage"></el-pagination>
            <span class="item">共   <span>{{pagecount}}</span>页</span>
          </div>
        </div>
        <no-more v-if="dataList.length<=0 && !loading"></no-more>
        <!--<div  v-loading="loading" element-loading-text="加载中"></div>-->
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>
<script type="javascript">
  export default {
    data(){
      return {
        dataList:[],
        navId:0,
        type:'goods',
        isShow:false,
        pagecount:1,
        currentPage:1,
        p:1,
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
        let self=this;
        switch (index){
          case index:
            this.navId = index;
            if(index==0){
              self.type="goods"
              self.info();
            }
            if(index==1){
              self.type="article"
              self.info();
            }
            break;
        }
      },
      info(p){
        let self=this;
        self.dataList=[];
        this.isShow=false
        this.loading=true
        this.$http.get(`${process.env.API.USER}/user/collect`,{params:{
          type:self.type,
          p:p,
          rows:10,
        }}).then(res=>{
            if(res.data.errcode==0){

              for(let i=0;i<res.data.data.length;i++){
                if(res.data.data[i].content_pic!=undefined){
                  res.data.data[i].content_pic=res.data.data[i].content_pic.split(",")[0]

                }
              }
              self.dataList=res.data.data
              this.isShow=true
              this.p=res.data.page.p
              this.pagecount = parseInt(res.data.page.total_pages)  //  总共多少页
            }
            this.loading=false
        }).catch(err=>{
          this.p = 1
          this.isShow=false
          this.pagecount=0
          this.loading=false
          self.dataList=[]
        })
      },
      delet(item,index){
        let self = this;
        self.$http.delete(`${process.env.API.USER}/user/collect`,{
           params:{
             type:self.type,
             publish_uid:item.publish_uid,
             collect_id:item.gid || item.aid,
           }
        }).then(res=>{
          if(res.data.errcode=='0') {
            this.$message({
              type: 'success',//success
              message: "提交成功"
            });
            this.info()
//            self.dataList.splice(index, 1)
          }
        }).catch(error=>{
          this.$message.error("删除失败");
        })
      },
      detailClick(item){
        this.$router.push(`/buy/detail?id=${item.gid}`)
      },
      detailClick2(item){
        this.$router.push(`/information/detail?id=${item.aid}`)
      },
    },
    mounted() {
      document.title= '瑞时会-我的收藏'
      let self=this;
      self.info();
    },
  }
</script>
<style lang="less" type="text/less" scoped>
  .People{
    .mainBox{
      .right{
        .title{
          font-size: 18px;
          span{
            position: relative;
            color: #ccc;
            padding-right: 20px;
            cursor: pointer;
            &:first-child{
              &:after{
                position: absolute;
                content: "";
                right: 0;
                height: 20px;
                top: 3px;
                width: 1px;
                border-right: 1px solid #e6e6e6;
              }
            }
            &:last-child{
              padding-left: 15px;
            }
          }
          .navActive{
            color: #333;
          }
        }
        .content{
          .shop {
            padding: 30px 0px 60px;
            box-sizing: border-box;
            ul {
              font-size: 14px;
              color: #333;
              li {
                cursor: pointer;
                display: flex;
                padding: 25px 20px;
                border-bottom: 1px solid #e6e6e6;
                &:first-child {
                  border-top: 1px solid #ccc;
                  border-bottom: 1px solid #ccc;
                  line-height: 40px;
                  background: #f1f1f1;
                  padding: 0 20px;
                }
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
                      line-height: 26px;
                      &:first-child {
                        font-weight: bold;
                      }
                      &:last-child{
                        height: 55px;
                        overflow : hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                      }
                    }
                  }
                  .del{
                    width: 17px;
                    height: 17px;
                    border: none;
                  }
                  img {
                    width: 86px;
                    height: 86px;
                    padding: 1px;
                    border: 1px solid #ccc;
                    object-fit: cover;
                  }
                  &:first-child {
                    flex: 5;
                  }
                  &:last-child {
                    flex: .5;
                  }
                }
                .yellow{
                  color: #e9bf76;
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
          .shops{
            ul{
              li{
                span{
                  &:first-child{

                  }
                }
              }
            }
          }
          .nones{
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #333;
            font-size: 14px;
          }
        }
      }
    }
  }
</style>
<style type="text/less" lang="less">
  .People{
    .page{
      display: flex;
      justify-content: flex-end;
      padding: 20px 0;
      border-bottom: 1px solid #e6e6e6;
    }
  }
</style>
