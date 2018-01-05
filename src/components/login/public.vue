<template>
  <div class="People">
    <Top></Top>
    <!-- :num="0" -->
    <Navs ></Navs>
    <div class="mainBox">
      <div class="left">
        <navList :nums="1"></navList>
      </div>
      <div class="right">
        <div class="title">
          我的发布
        </div>
        <div class="shop">
          <ul>
            <li>
              <span>腕表信息</span>
              <span>单价</span>
              <span>时间</span>
              <span>小计</span>
              <span>操作</span>
            </li>
            <li v-show="dataList.length<=0&&loading" v-loading="loading" element-loading-text="加载中" style="height: 227px;"></li>
            <li v-for="(item,index) in dataList" :class="{'isHeight':item.exchange_stage_name=='审核失败'}" @click="detailClick(item)">
            <span>
              <img :src="item.cover_pic">
              <div>
                  <p>{{item.title}}</p>
                  <p>{{item.details || " "}}</p>
              </div>
            </span>
              <span>{{item.price}}</span>
              <span>{{item.create_time}}</span>
              <span v-show="item.exchange_stage_name=='审核中'" class="yellow">{{item.exchange_stage_name}}</span>
              <span v-show="item.exchange_stage_name=='审核失败'" class="red">{{item.exchange_stage_name}}</span>
              <span v-show="item.exchange_stage_name!='审核中'&& item.exchange_stage_name!='审核失败'" class="huis">{{item.exchange_stage_name}}</span>
              <div class="fileSH" v-show="item.exchange_stage_name=='审核失败'">
                <span class="red reds">审核失败 :  </span>
                <span style="max-width: 75%;" class="red reds spanFile">{{item.remark}}
                </span>
                <button @click.stop="publicClick(item)">重新发布</button>
              </div>
              </span>
              <span v-show="item.exchange_stage_name=='审核成功'">审核成功</span>
              <span><img class="del" src="../../assets/img/login/del.png" @click.stop="delet(item,index)"></span>
            </li>
            <li class="pageCon">

            </li>
          </ul>
          <div class="page" v-show="isShow">
            <el-pagination layout="prev,pager,next" :page-count="pagecount" @current-change="handlerPage" :current-page="currentPage"></el-pagination>
            <span class="item">共   <span>{{pagecount}}</span>页</span>
          </div>
          <no-more v-if="dataList.length <= 0&& !loading"></no-more>
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
        dataList:[],
        isHeight:true,
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
      info(p){
        let self=this;
        self.dataList='';
        this.isShow=false
        self.loading=true
        self.$http.get(`${process.env.API.MARKET}/market/seller/mylist`,{
          params:{
            rows:10,
            type:'goods',
            p:p
          }
        }).then(res=>{
          if(res.data.errcode==0){
            self.dataList=res.data.data
            for(let i=0;i<res.data.data.length;i++){
              self.dataList[i].create_time = new Date(self.dataList[i].create_time * 1000).toLocaleDateString('zh-cn').replace(/\//g, '-')
            }
            this.isShow=true
            this.p=res.data.page.p
            this.pagecount = parseInt(res.data.page.total_pages)  //  总共多少页
            self.loading=false
          }
        }).catch(()=>{
          this.p = 1
          this.isShow=false
          self.dataList=[]
          self.loading=false
        })

      },
      delet(item,index){
        let self =this;
        self.$http.delete(`${process.env.API.MARKET}/market/seller/mylist`,{
          params:{
            gid:item.gid
          }
        }).then(res=>{
          if(res.data.errcode=="0"){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.info(1)
//            self.dataList.splice(index, 1)
          }
        }).catch(err=>{
          this.$message.error("删除失败");
        })
      },
      publicClick(item){
        this.$router.push(`/wealthmanag?gid=${item.gid}`)
      },
      detailClick(item){
        this.$router.push(`/buy/detail?id=${item.gid}`)
      },
    },
    mounted() {
      window.scrollTo(0,0)
      document.title= '瑞时会-我的发布'
      this.info(1)
    },
  }
</script>
<style lang="less" scoped type="text/less">
  .People{
    .mainBox{
      .right{
        .shop{
          padding: 30px 0px 60px;
          box-sizing: border-box;
          ul {
            font-size: 14px;
            color: #333;
            li{
              cursor: pointer;
              position: relative;
              display: flex;
              padding: 25px 20px;
              height: auto;
              border-bottom: 1px solid #e6e6e6;
              &:last-child{
                border: none;
              }
              .fileSH{
                position: absolute;
                bottom: 24px;
                left: 0;
                right: 65px;
                display: flex;
                justify-content: space-between;
                left: 0;
                span{
                  &:first-child{
                    padding-left: 20px;
                  }
                  &:nth-child(2){
                    position: absolute;
                    left: 85px;
                    color: #666;
                  }
                }
                button{
                  width: 88px;
                  height: 30px;
                  background: none;
                  border:1px solid #ccc;
                  cursor: pointer;
                  position: absolute;
                  right: -18px;
                  top: -10px;
                }
              }
              &:first-child{
                border-top: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
                line-height: 40px;
                background: #f1f1f1;
                padding:0 20px;
              }
              .yellow{
                color: #e9bf76;
              }
              .red{
                color: #db4a4a;
              }
              .spanFile{
                height: 20px;
                overflow:hidden;
                text-overflow:ellipsis;
                display:-webkit-box;
                -webkit-box-orient:vertical;
                -webkit-line-clamp:1;
              }
              .huis{
                color: #999;
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
                  p{
                    line-height: 26px;
                    &:first-child{
                      font-weight: bold;
                    }
                    &:last-child{
                      color: #333;
                      overflow : hidden;
                      text-overflow: ellipsis;
                      display: -webkit-box;
                      -webkit-line-clamp: 2;
                      -webkit-box-orient: vertical;
                      height: 48px;
                      word-break:break-all
                    }
                  }
                }
                img{
                  width: 86px;
                  height: 86px;
                  padding:1px;
                  border:1px solid #ccc;
                  object-fit: cover;
                }
                .del{
                  width: 17px;
                  height: 17px;
                  cursor: pointer;
                  border: none;
                }
                &:first-child{
                  flex: 3;
                }
                &:last-child{
                  flex: .5;
                }
              }
            }
            .pageCon{
              display: flex;
              justify-content: flex-end;
            }
            .isHeight{
              padding-bottom: 65px;
            }
          }
          .page{
            display: flex;
            justify-content: flex-end;
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
