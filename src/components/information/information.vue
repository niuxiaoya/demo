<template>
  <div class="Information">
      <Navs :num="4"></Navs>
      <div class="mian" >
        <div class="title">
          资讯
          <div class="search"><input type="text" placeholder="输入标题或关键字" v-model="title" @keyup.enter.stop="search()"><span class="imgs"><img src="../../assets/img/search.png" alt="" @click.stop="search()"></span></div>
        </div>
        <div v-show="dataList.length<=0&&loading" v-loading="loading" element-loading-text="加载中" style="height: 400px;"></div>
        <div class="info" v-for="item,i in dataList" :key="i">
          <div class="dl" @click="info(item)">
            <div class="dt">
              <img :src="item.cover_pic?item.cover_pic:require('../../assets/img/vip/news.png')">
            </div>
            <div class="dd">
              <p>
                {{item.title}}
              </p>
              <span class="info-content" v-html="item.summary"></span>
            </div>
          </div>
        </div>
        <no-more v-if="dataList.length <= 0 && !loading"></no-more>
        <div class="page"  v-show="pagecount && pagecount>1  && !loading">
            <!--<span class="item" @click="handlerPage(1)">首页</span>-->
            <el-pagination layout="prev,pager,next" :page-count="pagecount" @current-change="handlerPage"></el-pagination>
            <!--<span class="item" @click="handlerPage(pagecount)">尾页</span>-->
            <span class="item">页数  <i>{{ p }}</i> / <i>{{pagecount}}</i></span>
        </div>
      </div>
  </div>
</template>
<script type="javascript">
  export default {
    data(){
      return {
        pagecount:0,
        p:1,
        dataList:[],
        title:'',
        loading:true
      }
    },
    methods:{
      /**
       * 点击页码获取数据
       * */
      handlerPage(val) {
        if(val > 0 && val <= this.pagecount) {
          this.getList(val)
          this.p = val
          window.scrollTo(0,0)
          this.dataList=[]
        }
      },

      /**
       * 获取记录列表
       * 参数 p: 页码
       * */
      getList(p) {
        let self=this;
        self.loading=true
        let url = `${process.env.API.NEWS}/news/articlelist`    //  接口地址
        this.$http.get(url, {
          params: {
            category_id:'default',
//            keyword: this.keyword,
            p: p,     //  页码
            rows: 10 ,  //  每页多少条
            title: self.title,
          }
         }).then(res => {
          if(parseInt(res.data.errcode)==0) {
            this.pagecount = res.data.page.total_pages  //  总共多少页
            this.dataList = res.data.data
            self.loading = false
          }
         }).catch(() => {
          this.content = []
          this.p = 1
          self.dataList=[]
          self.loading=false
          self.pagecount=0
        })
      },
      info(item){
        this.$router.push(`/information/detail?id=${item.aid}`)
      },
      search(){
        this.dataList=[]
        this.getList(1)
      }
    },
    mounted(){
      document.title= '瑞时会-资讯'
      this.getList(1)
    },
  }
</script>
<style type="text/less" lang="less" scoped>
  .Information{
    .mian{
      box-sizing:border-box;
      max-width: 1200px;
      min-width: 1000px;
      padding: 50px 10px 30px;
      margin: 0 auto;
      background: #fff;
      min-height: 500px;
      .title{
        font-size: 24px;
        color: #333;
        padding:0 30px 20px 30px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        .search {
          display: flex;
          justify-content: space-between;
          width: 225px;
          height: 30px;
          border: 1px solid #ccc;
          background: #f1f1f1;
          z-index: 2;
          input {
            width: 200px;
            height: 28px;
            border: none;
            outline: none;
            background: #f1f1f1;
            padding-left: 10px;
            padding-right: 10px;
            box-sizing: border-box;
            color: #ccc;
            ::-webkit-input-placeholder {
              color: #ccc;
            }
            ::-moz-placeholder {
              color: #ccc;
            }
            ::-ms-input-placeholder {
              color: #ccc;
            }

          }
          .imgs{
            padding-right: 12px;
            top: 5px;
            right: 10px;
            width: 20px;
            height: 20px;
            img{
              width: 100%;
              object-fit: cover;
            }
          }
        }
      }
      .info{
        .dl{
          padding: 20px 30px;
          height: 290px;
          box-sizing:border-box;
          display: flex;
          transition:all .5s;
          cursor: pointer;
          &:hover{
            background:#e6e6e6;
          }
          .dt{
            height: 250px;
            width: 380px;
            padding-right: 30px;
            img{
              width: 380px;
              height: 250px;
              object-fit: cover;
            }
          }
         .dd{
           flex: 1;
            p{
              font-size: 16px;
              color: #333;
              font-weight: bold;
            }
            span{
              padding-top: 20px;
              color: #666;
              display: block;
              line-height: 30px;
            }
          }
        }
      }
      .page{
        /*padding: 40px 30px 60px;*/
        display: flex;
        border-bottom: 1px solid #e9e9e9;
        padding: 20px 0;
        justify-content: flex-end;
      }
    }
  }
</style>

<style type="text/less" lang="less">
  .info-content {
    -ms-word-wrap: break-word;
    word-wrap: break-word;
    -ms-word-break: break-all;
    word-break: break-all;
    max-height: 150px;
    overflow: hidden;
    img {
      display: none !important;
    }
  }
</style>
