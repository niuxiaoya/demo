<template>
  <div class="foot">
    <div class="img">
      <img src="../assets/img/logo.png" alt="">
    </div>
    <p class="p">粤ICP备17150951号</p>
    <div class="us">
      <div>
        <p>联系我们</p>
        <p><span><img src="../assets/img/tel.png"></span> 联系电话：400-8451-816</p>
        <p><span><span><img src="../assets/img/map.png"></span></span> 公司地址：福田区平安银行金融中心73楼</p>
      </div>
      <div>
        <p>关注微信</p>
        <i>
          <img src="../assets/img/weixin.jpg" alt="">
        </i>
      </div>
      <div>
        <p>IOS下载</p>
        <i><img src="../assets/img/ios.png" alt=""></i>
      </div>
      <div>
        <p>安卓下载</p>
        <i><img src="../assets/img/ani.png" alt=""></i>
      </div>

    </div>
  </div>
</template>
<script>
  export default {
    props: {
      num: Number
    }
  }
</script>
<style lang="less" scoped type="text/less">

</style>
<style lang="less" type="text/less">
  .foot{
    height: 340px;
    width: 100%;
    text-align: center;
    background: #131313;
    .img{
      padding-top: 34px;
      img{
        width: 38px;
        height: 52px;
        object-fit: cover;
      }
    }
    .p{
      color: #545353;
      line-height: 54px;
      font-size: 14px;
    }
    .us{
        padding-top: 30px;
        display: flex;
        width: 888px;
        margin: 0 auto;
        justify-content: space-between;
      div{
        text-align: left;
        p{
          color: #939699;
          padding-top: 22px;
          span{
            img{
              width: 13px;
              height: 17px;
              padding-right: 10px;
              object-fit: cover;
            }
          }
        }
        i{
          width: 72px;
          height: 72px;
          background: #fff;
          display: block;
          margin-top: 15px;
          img{
            width: 100%;
            height:auto;
            display: block;
          }
        }
      }
    }
  }
</style>
