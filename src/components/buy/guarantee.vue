<template>
  <div class="Guarantee">
    <Navs :num="1"></Navs>
    <div class="mian">
      <div class="title">
        <div class="matter">当前位置 :
          <span class="moshover" @click="tzbuyDetail">直买</span> >
          <span class="text">买家保障</span>
        </div>

      </div>
      <div class="content content_img">
        <!--<div class="title-top">-->
          <!--<h2>{{dataList.title}}</h2>-->
          <!--<p class="times"><span>{{dataList.author}}</span><span>{{dataList.publish_time}}</span></p>-->
        <!--</div>-->
        <div class="content-text">
          <div class="texts" >
            <p v-html="this.$route.params.item"></p>
            <div v-if="!this.$route.params.item">
              <no-more></no-more>
            </div>
          </div>
        </div>

      </div>
      <!--<div class="page">-->

      <!--</div>-->
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        dataList:[
        ]
      }
    },
    mounted() {
      document.title= '瑞时会-直买'
      window.scrollTo(0,0)
        let self=this;

    },
    methods:{
      tzbuyDetail(){
        this.$router.push(`/buy/detail?id=${this.$route.params.id}`)
      }
    }
  }
</script>
<style type="text/less" lang="less" scoped>
  .Guarantee{
    .mian{
      max-width: 1200px;
      min-width: 1000px;
      padding-top: 50px;
      min-height: 400px;
      margin: 0 auto;
      background: #fff;
      .title{
        height: 88px;
        font-size: 14px;
        color: #999;
        padding-left: 30px;
        padding-right: 30px;
        border-bottom: 1px solid #e6e6e6;
        overflow: hidden;
        .moshover{
          transition: all .4s;
          &:hover{
            color: #333;
            cursor: pointer;
          }
        }
        .text{
          color: #333;
        }
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
  #my-frame-text{
    img {
      max-width: 100%;
    }
  }
</style>
