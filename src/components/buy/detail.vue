<template>
  <div class="Detail">
    <Top></Top>
    <Navs :num="1"></Navs>
    <div class="mian">
      <div class="title">
        <p>腕表信息</p>
        <p><img :src="require(dataList.is_collect==1 ?'@/assets/img/buy/str.png':'@/assets/img/buy/cloocet.png')"
                @click="collect(dataList)"> 收藏</p>
      </div>
      <div class="content">
        <div class="left">
          <img src="../../assets/img/buy/360.png" alt="" class="curs" v-if="dataList.is_360">
          <div class="threesixty car" v-show="is360&&navId==0">
            <div class="spinner">
              <span>0%</span>
            </div>
            <ol class="threesixty_images"></ol>
          </div>
          <div class="img" v-if="dataList.file_pic && dataList.file_pic.length > 0&&navId>0">
            <img src="../../assets/img/buy/leftImg.png" class="leftImg" @click="leftTab(num)">
            <img src="../../assets/img/buy/rightImg.png" class="rightImg" @click="rightTab(num)">
            <img :src="dataList.file_pic[num-1]">
          </div>
          <div class="imgs">
            <div @click="navId=0" :class="{'navActive':navId ==0}" v-if="is360" class="pos">
              <img :src="is360">
              <img src="../../assets/img/360.png" alt="" class="curs" v-if="dataList.is_360">
            </div>
            <div  class="pos" v-for="(item,index) in dataList.file_pic" :class="{'navActive':navId == index+1}" @click="tab(index+1)">
              <img :src="item">
            </div>
          </div>
        </div>
        <div class="right" v-show="dataList">
          <p class="tit">{{dataList.title}}</p>
          <div class="price">
            <p>{{dataList.price}}<span>{{dataList.original_price}}</span></p>
            <p>
              <img src="../../assets/img/buy/eye.png" alt="">
              {{dataList.pv}}
            </p>
          </div>
          <div class="button">
            <p @click="buy"  class="btnss" :class="{'buys':dataList.exchange_stage_name=='在售'|| dataList.exchange_stage_name=='售卖中'}">立即购买</p>
            <p  @click="kefu">联系电话：    <span> 400-8451-816</span></p>
          </div>
          <div class="map">
            <p><span>发货时间</span><span>5-15天</span></p>
            <p><span>所在地</span><span>{{dataList.city_name}}</span></p>
          </div>
          <div class="regulations">
            <p>
              <img src="../../assets/img/buy/yes.png" alt="">
              免运费
            </p>
            <span>所有名表免运费</span>
            <p>
              <img src="../../assets/img/buy/yes.png" alt="">
              免运费
            </p>
            <span>支持3天退换，3天内且瑞时会标签未撕方可退货</span>
            <p>
              <img src="../../assets/img/buy/yes.png" alt="">
              免运费
            </p>
            <span>
        SWISS TIME VIP瑞时会名表鉴定评估技术中心是目前国内领先的名表鉴定评估机构,拥有国内专业的技术检测设备,完善的检测管理流程,汇集国内资深的专家顾问团队,通过仪器设备检验和人工结合的方法为您购买的每一件商品进行鉴定
       </span>
          </div>
        </div>
      </div>
      <div class="info">
        <div class="tit">
          基本信息
        </div>
        <ul class="cont">
          <li>
            <p>品牌</p> <span>{{dataList.brand_name}}</span>
          </li>
          <li>
            <p>表盘材质</p> <span>{{dataList.material_name}}</span>
          </li>
          <li>
            <p>机芯类型</p> <span>{{dataList.movement_name}}</span>
          </li>
          <li>
            <p>复杂功能</p> <span>{{dataList.function_name}}</span>
          </li>
          <li>
            <p>表盘形状</p> <span>{{dataList.shape_name}}</span>
          </li>
          <li>
            <p>成色</p> <span>{{dataList.fineness_name}}</span>
          </li>
          <li>
            <p>表盘直径</p> <span>{{dataList.diameter}}mm</span>
          </li>
          <li>
            <p>发布时间</p> <span>{{dataList.publish_time}}</span>
          </li>
        </ul>
        <div class="introduce">
          <div class="tits">商品介绍</div>
          <div class="appraisal">
            <img src="../../assets/img/buy/icon.png" alt="">{{dataList.publish_user}}
          </div>
          <p v-html="dataList.details"></p>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>
<script type="javascript">
  import ThreeSixty from '@/plugin/threesixty'

  export default {
    data() {
      return {
        is360: '',
        dataList: "",
        navId: 1,
        num: 1,
        iscollect: true,
        uid: ''
      }
    },
    mounted() {
      document.title= '瑞时会-直买'
      window.scrollTo(0,0)
        let self = this;
//
        this.$http.get(`${process.env.API.MARKET}/market/buyer/watchinfo`, {
          params: {
            gid: this.$route.query.id
          }
        }).then(res => {
          if (res.data.errcode == '0') {
            res.data.manage.file_pic = res.data.manage.file_pic.split(",")
            res.data.manage.publish_time = new Date(res.data.manage.publish_time * 1000).toLocaleDateString('zh-cn').replace(/\//g, '-')
            this.dataList = res.data.manage
            this.uid = res.data.manage.user_uid

            if (res.data.manage.file_pic_360 && res.data.manage.file_pic_360.total_num) {
              this.is360 = `${res.data.manage.file_pic_360.url}/1${res.data.manage.file_pic_360.ext}`
              this.navId = 0
              let product = $('.car').ThreeSixty({
                totalFrames: res.data.manage.file_pic_360.total_num,
                endFrame: res.data.manage.file_pic_360.total_num,
                currentFrame: 1,
                imgList: '.threesixty_images',
                progress: '.spinner',
                imagePath: `${res.data.manage.file_pic_360.url}/`,
                filePrefix: '',
                ext: res.data.manage.file_pic_360.ext,
                height: 620,
                width: 625,
                navigation: true,
                disableSpin: false
              });
            }
          }
        }).catch(() => {

        })

    },
    methods: {
      kefu(){

      },
      /**
       * 是否登陆
       */
      isLogin(){
        this.$confirm('请登录后再进行操作！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push(`/login`)
        }).catch(() => {
        });
      },
      buy() {
        if(!localStorage.getItem('Authorization')) {
          this.isLogin()
          return false
        }
        if(this.dataList.exchange_stage_name!="在售" &&this.dataList.exchange_stage_name!="售卖中"){
//          return false;
        }else{
          this.$router.push(`/buy/purchase?id=${this.dataList.gid}&uid=${this.uid}`)
        }
      },
      tab(index) {
        this.navId = index
        this.num = index
      },
      leftTab(num) {
        if (num <= 1) {
          return false
        }
        this.num = num - 1
        this.navId = this.num;
      },
      rightTab(num) {
        if (num >= this.dataList.file_pic.length ) {
          return false
        }
        this.num = num + 1
        this.navId = this.num;
      },
      collect(item) {
        let self = this;
        if(!localStorage.getItem('Authorization')) {
          this.isLogin()
          return false;
        }
        if (item.is_collect == 1) {
          self.$http.delete(`${process.env.API.USER}/user/collect`, {
            params: {
              collect_id: self.$route.query.id,
              publish_uid: self.uid,
              type: 'goods'
            }
          }).then(res => {
            if (res.data.errcode == '0') {
              item.is_collect = 0
            }
            else {

            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          self.$http.post(`${process.env.API.USER}/user/collect`, {
            collect_id: self.$route.query.id,
            publish_uid: self.uid,
            type: 'goods'
          }).then(res => {
            if (res.data.errcode == '0') {
              item.is_collect = 1
            } else {

            }
          }).catch(err => {
            console.log(err)
          })
        }
      }
    },
  }
</script>
<style lang="less" scoped type="text/less">
  .Detail {
    .mian {
      box-sizing: border-box;
      max-width: 1200px;
      min-width: 1000px;
      padding: 60px 0px 100px;
      margin: 0 auto;
      background: #fff;
      min-height: 500px;
      .title {
        display: flex;
        justify-content: space-between;
        font-size: 24px;
        color: #333;
        padding: 0 30px;
        p {
          padding-left: 10px;
          display: flex;
          align-items: center;
          &:last-child {
            font-size: 16px;
            color: #999;
            padding-right: 10px;
          }
          img {
            cursor: pointer;
            margin-right: 10px;
          }
        }
      }
      .content {
        margin-top: 30px;
        padding: 0 40px 60px;
        box-sizing: border-box;
        border-bottom: 1px solid #e6e6e6;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        justify-content: space-between;
        .left {
          width: 627px;
          position: relative;
          .curs{
            position: absolute;
            right: 30px;
            top: 30px;
            z-index: 10;
          }
          .img {
            position: relative;
            width: 100%;
            height: 620px;
            border: 1px solid #ebebeb;
            box-sizing: border-box;
            .leftImg, .rightImg {
              position: absolute;
              width: 50px;
              height: 50px;
              top: 50%;
              margin-top: -25px;
              cursor: pointer;
              opacity: 0;
              transition: all 1s;
            }
            .leftImg {
              left: 20px;
            }
            .rightImg {
              right: 20px;
            }
            &:hover {
              .leftImg, .rightImg {
                opacity: 1;
              }
            }
            img {
              transition: all .4s;
              object-fit: cover;
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          .imgs {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            margin-top: 15px;
            div {
              width: 106px;
              height: 106px;
              display: flex;
              margin-bottom: 15px;
              justify-content: center;
              align-items: center;
              box-sizing: border-box;
              margin-left: 15px;
              &:last-child {
                margin-right: 15px;
              }
              &.navActive {
                border: solid 2px #ccc;
              }
              img {
                width: 102px;
                height: 102px;
                object-fit: cover;
                display: inline-block;
                &:nth-child(5n) {
                  margin-right: 0;
                }
              }
            }
            .pos{
              position: relative;
              .curs{
                width: 44px;
                height: 22px;
                right: 2px;
                top: 2px;
              }
            }
          }
        }
        .right {
          width: calc(~'100% - 657px');
          display: flex;
          flex-direction: column;
          .tit {
            line-height: 40px;
            color: #333;
            font-size: 18px;
          }
          .price {
            display: flex;
            justify-content: space-between;
            p {
              font-size: 22px;
              line-height: 40px;
              color: #333333;
              span {
                color: #cccccc;
                font-size: 16px;
                padding-left: 15px;
                text-decoration: line-through;
                img {
                  padding-left: 10px;
                  padding-right: 10px;
                }
              }
              &:last-child {
                font-size: 15px;
                color: #999;
              }
            }
          }
          .button {
            padding-top: 22px;
            padding-bottom: 8px;
            border-bottom: 1px solid #e6e6e6;
            p {
              cursor: pointer;
              width: 100%;
              height: 61px;
              transition: all .4s;
              text-align: center;
              line-height: 61px;
              border: 1px solid #ccc;
              box-sizing: border-box;
              color: #999999;
              margin-bottom: 20px;
            }
            .buys{
              background: #333;
            }
          }
          .map {
            line-height: 60px;
            p {
              display: flex;
              justify-content: space-between;
              border-bottom: solid 1px #e6e6e6;
              color: #999;
              span {
                &:last-child {
                  color: #333;
                }
              }
            }
          }
          .regulations {
            min-height: 200px;
            border: 1px solid #e6e6e6;
            box-sizing: border-box;
            margin-top: 28px;
            padding: 0 20px 30px 55px;
            p {
              color: #333;
              font-size: 18px;
              padding-top: 35px;
              position: relative;
              img {
                position: absolute;
                left: -30px;
                top: 40px;
              }
            }
            span {
              color: #999;
              font-size: 14px;
              display: block;
              padding-top: 20px;
            }
          }
        }
      }
      .info {
        padding: 60px 30px 0px;
        box-sizing: border-box;
        .tit {
          color: #333333;
          font-size: 24px;
          border-bottom: solid 1px #e5e5e5;
          padding-bottom: 30px;
        }
        .cont {
          display: flex;
          flex-wrap: wrap;
          li {
            width: 47.6%;
            border-bottom: 1px solid #e5e5e5;
            display: flex;
            line-height: 50px;
            &:last-child, &:nth-child(7) {
              border-bottom: none;
            }
            p {
              color: #999;
              width: 143px;
            }
            span {
              color: #333;
            }
            &:nth-child(2n-1) {
              margin-right: 45px;
            }
          }
        }
        .introduce {
          border-top: 1px solid #e6e6e6;
          padding: 60px 187px 100px 0;
          .tits {
            font-size: 24px;
            color: #333333;
          }
          .appraisal {
            padding: 25px 0 20px 38px;
            line-height: 30px;
            color: #999;
            position: relative;
            img {
              position: absolute;
              left: 0;
            }
          }
          p {
            font-size: 14px;
            color: #999999;
            padding-top: 12px;
          }
        }
      }
    }
    .btnss{
      background: #ccc;
      color: #fff!important;
    }
  }
</style>
<style type="text/less" lang="less">
  .Detail {
    .el-carousel__indicator {
      display: none;
    }
    .el-message-box__content{
      padding: 0 20px;
    }

  }
  .el-button--primary{
    background: #333!important;
    border: none;
    span{
      color: #fff;
    }
  }
  .el-button{
    border-radius: 0;
  }
</style>
