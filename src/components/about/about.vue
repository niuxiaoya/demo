<template>
  <div class="About">
      <Navs :num="5"></Navs>
      <div style="min-height: 500px">
        <div class="BannerImgs" v-for="item in content" v-html="item.content">
        </div>
      </div>
  </div>
</template>
<script>
  export default {
   data(){
     return {
       content:'',
       aboutUrl:`${process.env.API.SYSTEM}/system/aboutus`
     }
   },
    mounted() {
      document.title= '瑞时会-关于我们'
      let self=this;
      this.$http.get(self.aboutUrl)
     .then(res=>{
       if(res.data.errcode=='0'){
         this.content=res.data.data
       }
      }).catch(() => {

      })
    },
  }
</script>
<style type="text/less" lang="less" scoped>
  .About{
    min-height: 100vm;
    .BannerImgs{
      min-height: 500px;
      max-width: 1200px;
      margin: 0 auto;
    }
  }
</style>
<style type="text/less" lang="less">
  .About{
    .BannerImgs{
      min-height: 500px;
      img{
        height: auto;
        max-width: 1200px;
        width: 100%;
        object-fit: cover;
        padding:0 10px;
        box-sizing: border-box;
        margin:0 auto;
      }
    }
    .ql-editor{
      margin: 0 auto;
    }
  }
</style>
