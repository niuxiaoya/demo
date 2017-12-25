<template>
  <div class="guarantee">
      <dl v-for="item in dataList">
        <dt>
          <img :src="item.icon" alt="icon">
        </dt>
        <dd>
          <p>{{item.tit}}</p>
          <span>{{item.content}}</span>
        </dd>
      </dl>
  </div>
</template>
<script type="javascript">
  export default {
      data (){
        return {
          dataList:[
            {
              icon:require('../../assets/img/quality.png'),
              tit:"品质保障",
              content:"购买保障说明保障说明保障说明"
            },
            {
              icon:require('../../assets/img/distribution.png'),
              tit:"专员配送",
              content:"专员配送说明保障说明保障说明"
            },
            {
              icon:require('../../assets/img/return.png'),
              tit:"3天包退",
              content:"不人为损坏，则可3天包退"
            },
            {
              icon:require('../../assets/img/service.png'),
              tit:"1对1客服",
              content:"不人为损坏，则可3天包退"
            },
          ]
        }
      }
  }
</script>
<style lang="less" scoped type="text/less">
  .guarantee {
    min-width: 1000px;
    max-width: 1200px;
    margin-bottom: 42px;
    height: 288px;
    margin-top: 26px;
    background: #f5f5f5;
    display: flex;
    justify-content: space-around;
    align-items: center;
    dl{
      text-align: center;
      dt{
        img{
          object-fit: cover;
        }
      }
      dd{
        p{
          position: relative;
          font-size: 18px;
          padding-top: 10px;
          color: #333;
          &:before {
            position: absolute;
            width: 43px;
            height: 2px;
            background: #ccc;
            content: '';
            bottom: -15px;
            left: calc(50% - 10px);
          }
        }
        span{
          color: #999;
          padding-top: 34px;
          display: block;
          font-size: 14px;
        }
      }
    }
  }
</style>
<style type="text/less" lang="less">

</style>
