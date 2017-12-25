<template>
  <div class="Detail">
    <Top></Top>
    <Navs :num="4"></Navs>
    <div class="mian">
      <div class="title">
        <div class="matter">当前位置 : 资讯 > 正文</div>

      </div>
      <div class="content content_img">
        <div class="title-top">
          <h2>{{dataList.title}}</h2>
          <p class="times"><span>{{dataList.author}}</span><span>{{dataList.publish_time}}</span></p>
        </div>
        <div class="content-text">
          <div class="texts" >
            <p v-html="dataList.content"></p>
          </div>
        </div>

      </div>
      <div class="page">

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
        dataList:[
        ]
      }
    },
    mounted() {
      window.scrollTo(0,0)
        let self=this;
//
        this.$http.get(`${process.env.API.NEWS}/news/articledetail`,{params:{
          article_id:this.$route.query.id
        }}).then(res=>{
//          if(res.data.manage!=0) {
//            res.data.manage.file_pic=res.data.manage.file_pic.split(",")


            res.data.manage.detail.publish_time=new Date(res.data.manage.detail.publish_time * 1000).toLocaleDateString('zh-cn').replace(/\//g, '-')
            this.dataList=res.data.manage.detail

//          }
        }).catch(() => {

        })

    },
    components: {
      Top,  //头部
      Navs, //导航
      Foot  //公共底部
    },
  }
</script>
<style type="text/less" lang="less" scoped>
  .Detail{
    .mian{
      max-width: 1200px;
      min-width: 1000px;
      padding-top: 50px;
      min-height: 400px;
      margin: 0 auto;
      background: #fff;
      .title{
        height: 88px;
        font-size: 16px;
        color: #999;
        padding-left: 30px;
        padding-right: 30px;
        border-bottom: 1px solid #e6e6e6;
        overflow: hidden;
        .matter{
          float: left;
        }
        .search{
          position: relative;
          width: 225px;
          height: 30px;
          float: right;
          border: 1px solid #ccc;
          background: #f1f1f1;
          z-index: 2;
          input{
            width: 200px;
            height: 28px;
            border: none;
            outline: none;
            background: #f1f1f1;
            padding-left: 10px;
            padding-right: 10px;
            box-sizing: border-box;
            color: #ccc;
            ::-webkit-input-placeholder{
              color: #ccc;
            }
            ::-moz-placeholder{
              color: #ccc;
            }
            ::-ms-input-placeholder{
              color: #ccc;
            }

          }
          .imgs{
            position: absolute;
            top: 5px;
            right: 10px;
            width: 20px;
            height: 20px;
            img{
              width: 100%;
            }
          }
        }
      }
      .content{
        padding: 28px 30px 0;
        .title-top{
          height: 134px;
          border-bottom: 1px solid #e6e6e6;
          h2{
            margin-top: 30px;
            color: #333;
          }
          .times{
            margin-top: 33px;
            font-size: 14px;
            color: #999;
            span{
              display: inline-block;
              margin-right: 60px;
            }
          }
        }
        .content-text{
          img{
            max-width: 100%
          }
          p{
            padding-top: 22px;
            padding-bottom: 22px;
            font-size: 16px;
            color: #333;
            line-height: 38px;
            -ms-word-wrap: break-word;
            word-wrap: break-word;
            -ms-word-break: break-all;
            word-break: break-all;
          }
          h2{
            font-size: 24px;
            color: #333;
          }
          .watch{
            margin-top: 33px;
            img{
              width: 100%;
              height: 760px;
            }
            .small-watch{
              width: 700px;
              height: 466px;
              margin: auto;
              img{
                width: 700px;
                height: 466px;
              }
            }
          }
        }
      }
    }
  }
</style>
<style type="text/less" lang="less">
  .content_img{
    img{
      width: 100%;
    }
  }
</style>
