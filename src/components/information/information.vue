<template>
  <div class="Information">
      <Top></Top>
      <Navs :num="4"></Navs>
      <div class="mian">
        <div class="title">
          资讯
          <div class="search"><input type="text" placeholder="输入标题或关键字" v-model="title" @keyup.enter="search()"><span class="imgs"><img src="../../assets/img/search.png" alt="" @click="search()"></span></div>
        </div>
        <div class="info" v-for="item in dataList">
          <dl @click="info(item)">
            <dt>

              <img :src="item.cover_pic?item.cover_pic:require('../../assets/img/vip/news.png')">
            </dt>
            <dd>
              <p>
                {{item.title}}
              </p>
              <span class="info-content" v-html="item.content"></span>
            </dd>
          </dl>
        </div>
        <div class="page"  v-show="isShow">
            <!--<span class="item" @click="handlerPage(1)">首页</span>-->
            <el-pagination layout="prev,pager,next" :page-count="pagecount" @current-change="handlerPage"></el-pagination>
            <!--<span class="item" @click="handlerPage(pagecount)">尾页</span>-->
            <span class="item">页数  <i>{{ p }}</i> / <i>{{pagecount}}</i></span>
        </div>
      </div>
      <Foot></Foot>
  </div>
</template>
<script>
 import Top from '@/components/top'
 import Navs from '@/components/nav'
 import Foot from '@/components/foot'
  export default {
    data(){
      return {
        pagecount:1,
        p:1,
        dataList:[],
        title:'',
        isShow:false,
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
        }
      },

      /**
       * 获取记录列表
       * 参数 p: 页码
       * */
      getList(p) {
        let self=this;
        let url = `${process.env.API.NEWS}/news/articlelist`    //  接口地址
//        http://apidev.swisstimevip.com:8000/news/v1/news/articlelist?category_id=default&p=1&rows=10&is_pc=1
       this.$http.get(url, {
          params: {
            category_id:'default',
            is_pc:1,
//            keyword: this.keyword,
            p: p,     //  页码
            rows: 10 ,  //  每页多少条
            title: self.title,
          }
        }).then(res => {

          this.pagecount = res.data.page.total_pages  //  总共多少页

          this.dataList = res.data.data
         this.isShow=true
       }).catch(() => {
          this.content = []
          this.p = 1
//          this.currentPage1 = 1
        })
      },
      info(item){
        this.$router.push(`/information/detail?id=${item.aid}`)
      },
      search(){
        this.getList(1)
      }
    },
    mounted(){
      this.getList(1)
    },
    components: {
      Top,  //头部
      Navs, //导航
      Foot  //公共底部
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
        dl{
          padding: 20px 30px;
          height: 290px;
          box-sizing:border-box;
          display: flex;
          transition:all .5s;
          cursor: pointer;
          &:hover{
            background:#e6e6e6;
          }
          dt{
            height: 100%;
            width: 380px;
            padding-right: 30px;
            img{
              width: 380px;
              height: 100%;
              object-fit: cover;
            }
          }
          dd{
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
  .Information{
    .page{
      .item{
        font-size: 16px;
        color: #666;
        height: 16px;
        line-height: 30px;
        cursor: pointer;
        i{
          font-style: normal;
        }
      }
      .el-pagination{
        .btn-prev,.btn-next{
          border: none!important;
        }
        .el-pager{
          background: none;
          .number,.btn-quicknext,.btn-quickprev{
            border: none;
            font-size: 16px;
            color: #666;
          }
          .active{
            color: #333;
            background: none;
            border: 1px solid #333;
          }
        }
      }
    }
    .el-radio-group{
      width: 100%;
    }
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
  }
</style>
