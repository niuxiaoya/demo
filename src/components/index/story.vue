<template>
  <div class="story">
      <div class="img">
        <img src="../../assets/img/back.png">
        <div>
            <p>BRAND ZONE</p>
            <p>品牌故事</p>
            <span class="first">每一个知名品牌的背后都有着无数个小故事，</span>
            <span>追溯，让我们从这里开始。</span>
            <!--<button>查看更多</button>-->
        </div>
      </div>
  </div>
</template>
<script>
  export default {

  }
</script>
<style lang="less" scoped type="text/less">
  .story {
    min-width: 1000px;
    max-width: 1200px;
    height: 428px;
    .img{
      position: relative;
      img{
        width: 100%;
        max-height: 428px;
        object-fit: cover;
      }
      div{
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        p{
          &:nth-child(1){
            font-size: 32px;
            color: #333;
          }
          &:nth-child(2){
            font-size: 20px;
            position: relative;
            color: #656565;
            padding-top: 20px;
            &:before {
              position: absolute;
              width: 42px;
              height: 2px;
              background: #333;
              content: '';
              bottom: -15px;
              left: calc(50% - 30px);
            }
          }
        }
        span{
          padding-top: 10px;
          display: block;
          font-size: 16px;
          color: #333;
        }
        .first{
          padding-top: 45px!important;
        }
        button{
          margin-top: 76px;
          height: 40px;
          width: 180px;
          border: 1px solid #999 ;
          box-sizing: border-box;
          background: none;
          transition: all 0.5s;
          cursor: pointer;
          color: #333;
          font-size: 14px;
          &:hover{
            background: #333;
            color: #fff;
          }
        }
      }
    }
  }
</style>
<style type="text/less" lang="less">

</style>
