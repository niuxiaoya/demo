<template>
  <div class="Detail">
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
          <div class="threesixty car" v-show="is360&&!num">
            <div class="spinner">
              <span>0%</span>
            </div>
            <ol class="threesixty_images"></ol>
          </div>
          <div class="img" v-if="dataList.file_pic && dataList.file_pic.length > 0&&!!num">
            <img src="../../assets/img/buy/leftImg.png" class="leftImg" @click="num = Math.max(0, num - 1)" v-show="num > 1">
            <img src="../../assets/img/buy/rightImg.png" class="rightImg" @click="num = Math.min(dataList.file_pic.length, num + 1)" v-show="num < dataList.file_pic.length">
            <img class="transtion-img" v-for='(item,key) in dataList.file_pic' :src="item" :style="`transform:translateX(${(num - 1 - key)*100}%)`" />
          </div>
          <div class="imgs">
            <div @click="num=0" :class="{'navActive':!num}" v-if="is360" class="pos">
              <img :src="is360">
              <img src="../../assets/img/360.png" alt="" class="curs" v-if="dataList.is_360">
            </div>
            <div  class="pos" v-for="(item,index) in dataList.file_pic" :class="{'navActive':num == index+1}" @click="num = index+1">
              <img :src="item">
            </div>
          </div>
        </div>
        <div class="right">
          <p class="tit">{{dataList.title}}</p>
          <div class="price">
            <p>USD : {{dataList.price}}
            </p>
            <p>
              <img src="../../assets/img/buy/eye.png" alt="">
              {{dataList.pv}}
            </p>
          </div>
          <div class="price-can">
            <p>{{dataList.reference_price}}</p>
            <p class="nowPrice">
              <!--实时汇率:( {{dataList.rate | tqNumber}}-->
              <!--{{dataList.rate}}-->
              当天汇率:({{hl}}
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <div class="pos">
                    <img src="../../assets/img/buy/why.png">
            <p class="box2"></p>
          </div>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix" id="clearhui" style="color: #999">
              <span>{{dataList.rate}}</span>
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              <p>{{dataList.rate_str}}</p>
            </el-dropdown-item>
          </el-dropdown-menu>
          </el-dropdown>
          </p>
        </div>
        <div class="price-Official">
          <div class="p-head">官方媒体公价</div>
          <div class="p_content" v-for="i in dataList.official_price">
            <p>{{i[0]}}: <span>{{i[1]}}</span></p>
          </div>
        </div>
        <div class="map">
          <p><span>所在地</span><span><img class="contory" :src="dataList.country_flag" v-if="dataList.country_flag"></span>{{dataList.country_name}}<span v-if="dataList.country_short_name"> ({{dataList.country_short_name}})</span></p>
          <p><span>发货时间</span><span>5-15天</span></p>
        </div>
        <div class="button">
          <p @click="buy"  class="btnss" :class="{'buys':dataList.exchange_stage_name=='在售'|| dataList.exchange_stage_name=='售卖中'}">立即购买</p>
          <p >联系电话：    <span> 400-8451-816</span></p>
        </div>
        <div class="buyer-guarantee" @click="tzGuarantee">
          买家保障
          <img src="../../assets/img/buy/jt.png">
        </div>
      </div>
    </div>
    <div class="detailShop">
      <div class="detail-head">
        <div @click="active=1;isSelect=false" :class="{'active-detail':active == 1}">图文详情</div>
        <div @click="active=2" :class="{'active-detail':active == 2}">腕表参数</div>
        <div @click="active=3;isSelect1=false" :class="{'active-detail':active == 3}">腕表溯源</div>
      </div>
      <div v-loading="loading" element-loading-text="加载中..." style="min-height: 290px;">
        <div class="detail_three detailphoto" v-if="active==1">
          <p class="isSelect" v-show="dataList.graphic_details">
          <span @click="isSelect=!isSelect" class="watch-translate">
            {{en || '查看翻译'}}
            <img src="../../assets/img/buy/xjt.png" :class="{'flip':isSelect}" />
          </span>
            <span @click="getList(1)" v-show="en">查看原文</span>
            <transition name="fade">
              <ul class="translate-select" v-show="isSelect">
                <li v-for="item,key in language" :key="key" @click="translate(item,1)">{{item.name}}</li>
              </ul>
            </transition>
          </p>
          <div class="tran1" v-show="translate1">{{translate1}}</div>
          <div v-html="dataList.graphic_details"></div>
          <no-more v-show="!dataList.graphic_details && !loading"></no-more>
        </div>
        <div class="detail_three detailParams" v-if="active==2">
          <ul class="cont">
            <li>
              <p>品牌</p> <span>{{dataList.brand_name || '暂无'}}</span>
            </li>
            <li>
              <p>表壳材质</p> <span>{{dataList.material_name|| '暂无'}}</span>
            </li>
            <li>
              <p>机芯类型</p> <span>{{dataList.movement_name|| '暂无'}}</span>
            </li>
            <li>
              <p>复杂功能</p> <span>{{dataList.function_name|| '暂无'}}</span>
            </li>
            <li>
              <p>表盘形状</p> <span>{{dataList.shape_name|| '暂无'}}</span>
            </li>
            <li>
              <p>成色</p> <span>{{dataList.fineness_name|| '暂无'}}</span>
            </li>
            <li>
              <p>表盘直径</p> <span>{{dataList.diameter|| '暂无'}}mm</span>
            </li>
            <li>
              <p>型号</p> <span>{{dataList.model_num|| '暂无'}}</span>
            </li>
            <li>
              <p>性别</p> <span>{{dataList.gender_name|| '暂无'}}</span>
            </li>
          </ul>
        </div>
        <div class="detail_three detailphoto" v-if="active==3">
          <p class="isSelect" v-show="dataList.history">
          <span @click="isSelect1=!isSelect1" class="watch-translate">
            {{en1 || '查看翻译'}}
            <img src="../../assets/img/buy/xjt.png" :class="{'flip':isSelect}" />
          </span>
            <span @click="getList(2)" v-show="en1">查看原文</span>
            <transition name="fade">
              <ul class="translate-select" v-show="isSelect1">
                <li v-for="item,key in language" :key="key" @click="translate(item,2)">{{item.name}}</li>
              </ul>
            </transition>
          </p>
          <div class="tran1" v-show="translate2">{{translate2}}</div>
          <div v-html="dataList.history"></div>
          <no-more v-show="!dataList.history && !loading"></no-more>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script type="javascript">
  import ThreeSixty from '@/plugin/threesixty'
  export default {
    data() {
      return {
        showindex: 0,
        show:true,
        is360: '',
        dataList: "",
        navId: 1,
        num: 0,
        active:1,
        iscollect: true,
        uid: '',
        isSelect:false,
        loading: false,
        translate1:'',
        translate2:'',
        isSelect1:false,
        hl:'',
        isShow:false,
        en:'',
        en1:'',
        graphic_details:'',
        history:'',
        language:[
          {id:'zh',name:'中文（简）'},
          {id:'cht',name:'中文（繁）'},
          {id:'en',name:'英文'},
          {id:'fra',name:'法文'},
          {id:'de',name:'德文'},
        ],
      }
    },
    mounted() {
      document.title= '瑞时会-直买'
      window.scrollTo(0,0)
      this.getList()
      $('body').on('click',(e)=>{
        if($(e.target).attr('class')!='watch-translate'){
          this.isSelect1=false
          this.isSelect=false
        }
      })
    },
    methods: {
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
        if(this.dataList.exchange_stage_name!="在售" &&this.dataList.exchange_stage_name!="售卖中" || this.$route.query.fineness_id=='8'){
//          return false;
        }else{
          this.$router.push(`/buy/purchase?id=${this.dataList.gid}&uid=${this.uid}`)
        }
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
      },
      sethtml (html) {
        return html
          .replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, "\"")
          .replace(/&#39;/g, "\'");
      },
      tzGuarantee(){
//        this.$router.push(`/buy/guarantee?id=${this.$route.query.id}`)
        this.$router.push({name:'Guarantee',params:{
          item:this.sethtml(this.dataList.guarantee || ''),
          id:this.$route.query.id
        }
        })
      },
      translate(item,type){
        let content,key,isChangeName
        this.loading=true
        if(type==1){
          content=this.dataList.graphic_details
          key='graphic_details'
          this.getTranslate(item,content,key,type)
          this.dataList.graphic_details = ''
          this.en=item.name
        }else{
          content=this.dataList.history
          key='history'
          this.getTranslate(item,content,key,type)
          this.dataList.history = ''
          this.en1=item.name
        }
      },
      getTranslate(item,content,key,type){
        this.$http.post(`${process.env.API.SYSTEM}/system/translate`,{
          target:item.id,
          is_html:1,
          content:content,
          key:key,
          gid:this.$route.query.id
        }).then(res=>{
          if(res.data.errcode=='0'){
            if(type==1){
              this.dataList.graphic_details=res.data.content
              this.translate1=res.data.supply
            }else{
              this.dataList.history=res.data.content
              this.translate2=res.data.supply
            }
          }
          this.loading=false
        }).catch(err=>{
          this.loading=false
        })
      },
      getList(id){
        if(id==1){
          this.en=false
          this.translate1=false
        }else{
          this.en1=false
          this.translate2=false
        }
        let self = this;
        this.$http.get(`${process.env.API.MARKET}/v2/market/buyer/watchinfo`, {
          params: {
            gid: this.$route.query.id
          }
        }).then(res => {
          if (res.data.errcode == '0') {
            res.data.manage.file_pic = res.data.manage.file_pic.split(",")
            res.data.manage.publish_time = new Date(res.data.manage.publish_time * 1000).toLocaleDateString('zh-cn').replace(/\//g, '-')
            this.dataList = res.data.manage
            this.graphic_details = this.dataList.graphic_details
            this.history = this.dataList.history
            this.hl=this.dataList.rate.split('(')[1]
            this.uid = res.data.manage.user_uid

            if(!this.dataList.is_360) {
              this.num = 1
            }
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
                height: 580,
                width: 580,
                navigation: true,
                disableSpin: false
              });
            }
          }
        }).catch(() => {

        })
      }
    },
    filters:{
      tqNumber(type){
        return type.split('(')[1]
      }
    }
  }
</script>
<style lang="less" scoped type="text/less">
  .Detail {
    .mian {
      box-sizing: border-box;
      max-width: 1200px;
      min-width: 1000px;
      padding: 60px 0px 0px;
      margin: 0 auto;
      background: #fff;
      min-height: 500px;
      .title {
        display: flex;
        justify-content: space-between;
        font-size: 24px;
        color: #333;
        padding: 0 20px;
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
        padding: 0 30px 60px;
        box-sizing: border-box;
        border-bottom: 1px solid #e6e6e6;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        justify-content: space-between;
        .left {
          /*width: 627px;*/
          width: 580px;
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
            height: 580px;
            border: 1px solid #ebebeb;
            box-sizing: border-box;
            overflow: hidden;
            .transtion-img {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            .leftImg, .rightImg {
              position: absolute;
              width: 50px;
              height: 50px;
              top: 50%;
              margin-top: -25px;
              cursor: pointer;
              opacity: 0;
              transition: all 1s;
              z-index: 10;
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
              width: 98px;
              height: 98px;
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
                width: 94px;
                height: 94px;
                object-fit: cover;
                display: inline-block;
                &:nth-child(5n) {
                  margin-right: 0;
                }
              }
            }
            .pos{
              position: relative;
              cursor: pointer;
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
          width: calc(~'100% - 610px');
          /*width: calc(~'100% - 657px');*/
          min-width: 340px;
          display: flex;
          flex-direction: column;
          .tit {
            line-height: 40px;
            color: #333;
            font-size: 18px;
          }
          .price,.price-can {
            display: flex;
            justify-content: space-between;
            border-bottom: solid 1px #e6e6e6;
            p {
              font-size: 22px;
              line-height: 60px;
              color: #333333;
              overflow: hidden;
              &:nth-child(1){
                min-width: 146px;
                overflow: hidden;
              }
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
            }
          }
          .price-can{
            height: 55px;
            p {
              font-size: 14px;
              color: #999;
              display: flex;
              align-items: center;
            }
          }
          .price-Official{
            background: #fafafa;
            font-size: 14px;
            line-height: 38px;
            margin-top: 20px;
            padding: 10px;
            .p_head{
              color: #333;
            }
            .p_content{
              color: #999;
              span{
                color: #333;
                padding-left: 20px;
              }
            }
          }
          .map{
            padding: 10px 10px 25px;
            border-bottom: solid 1px #e6e6e6;
            font-size: 14px;
            line-height: 38px;
            color: #999;
            p{
              display: flex;

              span{
                display: inline-block;
                &:nth-child(1){
                  width: 92px;
                }
                .contory{
                  width: 24px;
                  height: 24px;
                  display: inline-block;
                  object-fit: cover;
                  margin-right: 5px;
                }
                &:nth-child(2){
                  color: #333;
                  display: flex;
                  align-items: center;
                  height: 38px;
                }
              }
            }
          }
          .button {
            padding-top: 22px;
            padding-bottom: 8px;
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
              font-size: 18px;
            }
            .buys{
              background: #333;
            }
          }
          .buyer-guarantee{
            color: #999;
            height: 98px;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            img{
              padding-left: 8px;
            }
          }
        }
      }
      .detailShop{
        .detail-head{
          border-bottom: 1px solid #e6e6e6;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50px;
          background: #f1f1f1;
          padding: 0 25%;
          padding-left: 28%;
          color: #999;
          transition: all .4s;
          cursor: pointer;
          div{
            position: relative;
            padding-right: 90px;
            &:hover{
              color: #333;
            }
          }
          .active-detail{
            color: #333;
            &:before {
              position: absolute;
              width: 90px;
              height: 2px;
              background: #333;
              content: '';
              bottom: -15px;
              left: calc(50% - 58px);
            }
          }
        }
        .detail_three{
          padding: 20px;
        }
        .detailphoto{
          /*padding-bottom: 0;*/
          .isSelect{
            padding-bottom: 10px;
            position: relative;
            transition: all .4s;
            color: #999;
            text-align: center;
            .translate-select{
              z-index: 99999999;
            }
            span{
              cursor: pointer;
              display: inline-block;
              color: #007099;
              margin-right: 15px;
              img{
                transition: all .4s;
              }
              .flip{
                transform: rotate(180deg);
              }
            }
            .fade-enter-active, .fade-leave-active {
              transition: opacity .5s;
            }
            .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
              opacity: 0;
            }
            ul{
              position: absolute;
              background: #fff;
              width: 150px;
              line-height: 40px;
              box-sizing: border-box;
              box-shadow: -1px 1px 3px #eeeeee;
              border: 1px solid #ebebeb;
              top:25px;
              left: 42%;
              li {
                cursor: pointer;
                padding: 0 20px;
                text-align: left;
                &:hover{
                  background: #f5f7fa;
                }
              }
            }
          }
          .tran1{
            padding: 15px 15px 0 0;
          }
          margin:22px 0;
        }
        .detailParams{
          padding: 60px 30px 90px;
          .cont {
            display: flex;
            flex-wrap: wrap;
            li {
              &:nth-child(1),&:nth-child(2){
                border-top: 1px solid #e5e5e5;
              }
              width: 47.6%;
              border-bottom: 1px solid #e5e5e5;
              display: flex;
              line-height: 50px;
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
  .popper__arrow {
    top: -6px;
    left: 50%;
    margin-right: 3px;
    border-top-width: 0;
    &:after{
      top: 1px;
      margin-left: -6px;
      border-top-width: 0;
      border-bottom-color: #fff;
      content: " ";
      border-width: 6px;
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
    }
  }
  .el-autocomplete, .el-dropdown {
    display: inline-block;
    position: relative;
    margin-top: 5px;
    img{
      padding: 0;
    }
  }
  .el-dropdown-link{
    cursor: pointer;
    .pos{
      padding-left: 10px;
      position: relative;
    }
    .pos:hover{
      .box2{
        position:relative;
      }
    }
  }
  .content .right .price-can p span img[data-v-001ff992] {
    padding: 0!important;
  }
  .el-dropdown-menu{
    top: 467px!important;
    padding: 0;
  }
  .el-dropdown-menu__item ,#clearhui{
    border-bottom: 1px solid #ececec;
    width: 200px;
    line-height: 40px;
    padding: 0 20px;
    box-sizing: border-box;
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
  .el-dropdown-menu{
    .item {
      margin-top: 10px;
      margin-right: 40px;
    }
  }
  #my-frame-text{
    img {
      max-width: 100%;
    }
  }
  .el-carousel__item {
    .pos{
      img{
        width: 94px;
        height: 94px;
      }
    }
  }
</style>
