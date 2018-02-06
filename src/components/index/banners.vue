<template>
  <div class="banners" :class="{'no-arrow': banners.length <= 1}">
    <div class="banner"  v-if="banners">
      <el-carousel>
        <el-carousel-item v-for="item,index in banners" :key="index">
          <img :src="item.file_pic" alt="banner">
        </el-carousel-item>
      </el-carousel>
    </div>
    <!--<div class="banner"  v-if="banners">-->
        <!--<div v-for="item,index in banners" >-->
          <!--<img :src="item.file_pic" alt="banner" v-show="banners.length==1">-->
        <!--</div>-->
    <!--</div>-->
  </div>
</template>
<script>
  export default {
    data(){
      return{
        banners:"",
      }
    },
    mounted(){
      //      banner请求
      this.$http.get(`${process.env.API.SYSTEM}/system/ad`).then(res=>{
        if(parseInt(res.data.errcode)==0){
          this.banners=res.data.data;
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  }
</script>
<style lang="less" scoped type="text/less">
 .banners{
   min-width: 1000px;
   img{
     width: 100%;
     min-width: 1024px;
     object-fit: cover;
   }
 }
</style>
<style type="text/less" lang="less">
  .banners{
    .banner{
      .el-carousel__container {
        max-height: 725px;
        min-height: 600px;
        overflow: hidden;
        object-fit: cover;
      }
      .el-carousel__item{
        img{
          max-height: 725px;
          min-height: 600px;
          object-fit: cover;
          height: 100%;
        }
      }
    }

    &.no-arrow .el-carousel__arrow {
      display: none !important;
    }
  }
</style>
