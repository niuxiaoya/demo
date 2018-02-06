<template>
  <div class="VipDeatil">
    <Navs :num="3"></Navs>
    <div class="main">
      <div class="title">
        <div class="matter">当前位置 :
        <span class="moshover" @click="$router.push('/vip')">会籍</span> >
        <span class="text">详情</span>
      </div>
      </div>
      <div class="content">
        <!--<img src="../../assets/img/vip/backs.png" alt="">-->
        <!--{{dataList.remark}}-->
        <div v-html="dataList.description"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        code:"",
        dataList:''
      }
    },
    created(){

    },
    mounted(){
      document.title= '瑞时会-会籍'
      window.scrollTo(0,0)

      this.code=this.$route.query.code
      this.$http.get(`${process.env.API.VIP}/vip/leveinfo?code=${this.code}&is_pc=1`).then(res=>{
        if(res.data.errcode=='0'){
//          let arr=[];
//          console.log(res.data)
          this.dataList = res.data.data
//          {{dataList.description}}
          this.dataList.description=this.sethtml(this.dataList.description || '')
        }
        self.loading = false
      }).catch(err=>{
        self.loading = false
      })
    },
    methods:{
      sethtml (html) {
        return html
          .replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, "\"")
          .replace(/&#39;/g, "\'");
      },
    }
  }
</script>
<style type="text/less" lang="less" scoped>
  .VipDeatil{
    .main{
      max-width: 1200px;
      min-width: 1000px;
      padding: 0 10px;
      padding-top: 50px;
      box-sizing: border-box;
      margin: 0 auto;
      background: #fff;
      min-height: 438px;
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
        height: auto;
        background-size: 100%;
        text-align: center;
       img{
         width: 100%;
         display: block;
       }
      }
    }
  }
</style>
<style type="text/less" lang="less">
  .my-frame-text{
    img{
      max-width: 100%;
    }
  }
</style>
