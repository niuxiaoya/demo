<template>
  <div class="wraps">
    <Navs :num="0"></Navs>
    <!--<div class="fixed">-->
    <!--<img src="../assets/img/kefu.png" alt="">-->
    <!--</div>-->
    <!--banner-->
    <Banners></Banners>

    <div class="center">
      <!--content内容-->
      <div class="surface">
          <div class="title">
              <div class="left">
                <p>{{dataList.title.tit}}</p>
                <span>{{dataList.title.cont}}</span>
              </div>
              <div class="right">
                <p @click="$router.push(`/buy`)">查看全部 <img src="../assets/img/yy.png" alt=""></p>
              </div>
        </div>
        <div class="shops">
          <dl class="commodity" v-for="item in data"  @click="openDetail(item)">
            <dt>
              <img :src="item.cover_pic" alt="">
              <img src="../assets/img/360.png" alt="" class="curs" v-if="item.is_360">
            </dt>
            <dd>
              <p>{{item.title}}</p>
              <span>{{item.price}}</span>
              <button @click.stop="openDetail(item)">
                立即购买
              </button>
            </dd>
          </dl>
        </div>
      </div>

      <div class="surface">
        <div class="title titles">
          <div class="left">
            <p>{{tab1.title.tit}}</p>
            <span>{{tab1.title.cont}}</span>
          </div>
          <div class="right" @click="$router.push(`/buy`)">
            <p>查看全部 <img src="../assets/img/yy.png" alt=""></p>
          </div>
        </div>

        <div class="market">
          <div class="navs">
            <span v-for="(item,index) in datas.watchAll" :class="{'navActive':navId == item.id}"  @click="demos(item)" :id="item.id" :key="index">

              {{item.name}}
            </span>
          </div>

          <div v-loading="loading" element-loading-text="加载中" style="min-height: 651px;">
            <div class="list" v-if="datas.watchBrand.length!=0 && datas.watchAll.length!=0">
              <div class="jts">
                <i class="z" @click="jjs"></i>
                <i class="y" @click="adds"></i>
              </div>

              <div class="marckshop" v-for="(i,$index) in datas.watchBrand" @click="openDetail(i)" :key="$index">
                <el-carousel trigger="click"  :autoplay="false">
                  <el-carousel-item v-for="(item,k) in i.file_pic" :key="k">
                    <img :src="item">
                  </el-carousel-item>
                </el-carousel>
                <p class="tt">{{i.title}}</p>
                <p>{{i.price}}</p>
                <div class="hidden">
                  <div class="hbtn" @click.stop="openDetail(i)">
                    立即购买
                  </div>
                </div>
              </div>
            </div>
            <div class="over" v-if="datas.watchBrand.length<=0 && !loading">
              <img src="../assets/img/icon.png" alt="">
              <span> 暂无数据...</span>
            </div>
          </div>
        </div>
      </div>

      <div class="surface">
        <div class="title titles">
          <div class="left">
            <p>{{tab2.title.tit}}</p>
            <span>{{tab2.title.cont}}</span>
          </div>
          <div class="right">
            <p @click="$router.push(`/buy`)">查看全部 <img src="../assets/img/yy.png" alt=""></p>
          </div>
        </div>

        <div class="market">
          <div class="navs">
            <span v-for="(i,index) in content" :class="{'navActive':navIds == i.id }" @click="demo(i)" :id="i.id" :key="index">
                 {{i.title}}
            </span>
          </div>
          <div v-loading="loadings" element-loading-text="加载中" style="min-height: 651px;">
            <div class="list" v-if="datas.watchPrice.length!=0 && datas.watchAll.length!=0">
              <div class="jts">
                <i class="z" @click="jj"></i>
                <i class="y" @click="add"></i>
              </div>

              <div class="marckshop" v-for="(i,index) in datas.watchPrice" @click="openDetail(i)" :key="index">
                <el-carousel trigger="click"  :autoplay="false">
                  <el-carousel-item v-for="(item,key) in i.file_pic" :key="key">
                    <img :src="item">
                  </el-carousel-item>
                </el-carousel>
                <p  class="tt" >{{i.title}}</p>
                <p>{{i.price}}</p>
                <div class="hidden">
                  <div class="hbtn" @click="openDetail(i)">
                    立即购买
                  </div>
                </div>
              </div>
            </div>
            <div class="over" v-if="datas.watchPrice.length<=0 && !loadings">
              <img src="../assets/img/icon.png" alt="">
              <span> 暂无数据...</span>
            </div>
          </div>
        </div>
      </div>

      <!--品牌故事-->
      <Story></Story>
      <!--品牌保障-->
      <!--<Guarantee></Guarantee>-->
    </div>
  </div>
</template>
<script type="javascript">
  import Banners from '@/components/index/banners'
  //  故事
  import Story from '@/components/index/story'
  //  保障
  import Guarantee from '@/components/index/guarantee'
  export default {
    data () {
      return {
        uid:'',
        navNum:0,
        navId:1,
        navIds:1,
        datas:{
          watchAll:'',
          watchBrand:'',
          watchPrice:'',
        },
        loading: true,
        loadings: true,
        arr:[],
        brandData:{
          brand:""
        },
        postData: {
          money1: '60',
          money2: '79.9999999999999',
        },
        img:"",
        dataList:
          {
            type:1,
            title:{
              tit:"THE NEW TABLE SHELVES",
              cont:"最新上架"
            },
          },
        tab1:
          {
            type:0,
            title:{
              tit:"THOUSANDS OF BRANDS",
              cont:"万千品牌"
            },

          },
        data:[],
        tab2:
          {
            title:{
              tit:"Collectors area",
              cont:"藏家专区",
            },
          },
        content:[
          {
            id:1,
            title:"60-80万",
          },
          {
            id:2,
            title:"80-100万",
          },
          {
            id:3,
            title:"100-200万",
          },
          {
            id:4,
            title:"200万以上",
          },
        ],
        news:null,
        pages:0,
        price_p:1,
        bard_p:1,
        p_bard:0,
        page:0,
      }
    },
    methods:{
      openDetail(item) {
        this.$router.push(`/buy/detail?id=${item.gid}&uid=${item.cover_fid}&fineness_id=${item.fineness_id}`)
      },
//     价格商品 数据变化
      change(){
        switch (this.navIds){
          case 1:
            this.postData.money1=60
            this.postData.money2=79.999999999
            this.getPrice()
            break;
          case 2:
            this.postData.money1=80
            this.postData.money2=99.999999999
            this.getPrice()
            break;
          case 3:
            this.postData.money1=100
            this.postData.money2=199.99999999
            this.getPrice()
            break;
          case 4:
            this.postData.money1=200
            this.postData.money2=null
            this.getPrice()
            break
        }
      },
//      左箭头
      jj(){
        if(this.price_p>1){
          this.price_p--;
          return this.getPrice()
        }
      },
//      右箭头
      add(){
        if(this.price_p<this.page){
          this.price_p++;
          return this.getPrice()
        }
      },
//     品牌商品 数据变化
      changes(){
        this.brandData.brand==this.navId;
        this.getMacket()
      },
      jjs(){
        if(this.bard_p>1){
          this.bard_p--;
          return this.getMacket()
        }
      },

      adds(){
        if(this.bard_p<this.p_bard){
          this.bard_p++;
          return this.getMacket()
        }
      },
//      价格区域数据变化
      demo(i){
        this.navIds = i.id
        this.change()
        this.price_p=1
      },
//      品牌区域数据变化
      demos(i){
        this.navId = i.id
        this.changes()
        this.bard_p=1
      },
//      价格请求
      getPrice(){
        this.datas.watchPrice="";
        let self = this
        this.loadings=true
        setTimeout(() => {
          this.$http.get(`${process.env.API.MARKET}/v2/market/buyer/goodsList?price_l=${this.postData.money1*10000 || 0}&price_h=${this.postData.money2*10000|| -1}&rows=3&p=${this.price_p}`).then(res=>{
            if(res.data.data.length!=0){
              for(var i=0;i<res.data.data.length;i++){
                if(res.data.data[i].file_pic.length!=0){
                  res.data.data[i].file_pic=res.data.data[i].file_pic.split(",")
                }
              }
              this.datas.watchPrice=res.data.data;
              self.page=res.data.page.total_pages
            }
            self.loadings = false
          }).catch(err=>{
            self.loadings = false
          })
        },500)
      },
//      品牌请求
      getMacket(){
        this.datas.watchBrand="";
        this.loading=true
        let self = this
        setTimeout(()=>{
          this.brandData.brand=this.navId;
          this.$http.get(`${process.env.API.MARKET}/v2/market/buyer/goodsList?brand_id=${this.brandData.brand}&rows=3&p=${this.bard_p}`).then(res=>{
            if (res.data.errcode == '0') {
              for(var i=0;i<res.data.data.length;i++){
                if(res.data.data[i].file_pic.length!=0){
                  res.data.data[i].file_pic=res.data.data[i].file_pic.split(",")
                }
              }
              this.datas.watchBrand=res.data.data;
              self.p_bard=res.data.page.total_pages
            }else{

            }
            self.loading = false
          }).catch(err=>{
            self.loading = false
          })
        },500)
      }

    },
    mounted(){
      window.scrollTo(0,0)
      document.title= '瑞时会-只珍藏顶级腕表和你'
      this.uid = localStorage.getItem('Authorization')
      this.$http.get(`${process.env.API.USER}/user/userinfo`).then(res=>{

      }).catch(err=>{
        console.log(err)
      })
//      新品
      this.$http.get(`${process.env.API.MARKET}/v2/market/buyer/goodsList?rows=3`).then(res=>{
        if(res.data.data.length!=0){
          this.data=res.data.data;
        }
      }).catch(err=>{
        console.log(err)
      })

//      品牌手表全部请求
      this.$http.get(`${process.env.API.DICT}/dict/brand`).then(res=>{
        if(res.data.data.length!=0){
          this.datas.watchAll=res.data.data.splice(0,5);
          this.navId=this.datas.watchAll[0].id
          for(var i=0;i<this.datas.watchAll.length;i++){
            this.arr.push(this.datas.watchAll[i].id)
          }
        }
      }).catch(err=>{
        console.log(err)
      })

//      品牌手表
      this.getMacket()
//      价格请求
      this.getPrice()
    },
    components: {
      Banners,  //banner
      Story,   //品牌故事
      Guarantee,  //客服保障
    },
  }
</script>
<style type="text/less" scoped lang="less">
  body{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .wraps{
    position: relative;
    background: #fafafa;
    .fixed{
      cursor: pointer;
      position: absolute;
      bottom: 386px;
      right: 52px;
      z-index: 999;
      width: 86px;
      height: 86px;
      border-radius: 50%;
      background: #fff;
      text-align: center;
      line-height: 86px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .center{
      box-sizing:border-box;
      background: #fafafa;
      margin: 0 auto;
      padding:0 10px;
      min-width: 1000px;
      max-width: 1200px;
      padding-top: 30px;
      .surface{
        padding:0 10px;
        min-width: 960px;
        max-width: 1200px;
        padding-top: 100px;
        box-sizing:border-box;
        .title{
          position: relative;
          height: 115px;
          .left{
            position: absolute;
            left: 0;
            top: 0;
            p{
              font-size: 32px;
              color: #333;
              padding-bottom: 15px;
            }
            span{
              font-size: 20px;
              color: #999;
            }
          }
          .right{
            position: absolute;
            right: 0;
            top: 28px;
            cursor: pointer;
            font-size: 14px;
            color: #333;
            p{
              color: #333;
              font-size: 14px;
              img{
                width: 8px;
                height: 12px;
                padding-left:8px;
              }
            }
          }
        }
        .titles{
          height: 128px;
        }
        .shops{
          max-width: 1200px;
          min-width: 970px;
          height: 568px;
          display: flex;
          .commodity{
            cursor: pointer;
            width: 30%;
            background: #fff;
            text-align: center;
            margin-right: 50px;
            &:last-child{
              margin-right: 0;
            }
            dt{
              width: 100%;
              height:350px;
              position: relative;
              img{
                width: 100%;
                height: 346px;
                object-fit: cover;
              }
              .curs{
                position: absolute;
                right: 12px;
                top: 12px;
                width: 44px;
                height: 22px;
                z-index: 10;
              }
            }
            dd{
              padding:14px 35px 20px;
              text-align: center;
              p{
                font-size: 18px;
                color: #333;
                font-weight: bold;
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                height: 48px;
              }
              span{
                font-size: 18px;
                color: #333;
                padding-top: 24px;
                position: relative;
                display: block;
                &:before {
                  position: absolute;
                  width: 38px;
                  height: 2px;
                  background: #acacac;
                  content: '';
                  bottom: -15px;
                  left: calc(50% - 7px);
                }
              }
              button{
                display: inline-block;
                margin-top: 35px;
                width: 180px;
                height:40px;
                box-sizing: border-box;
                border: 1px solid #ccc;
                line-height: 40px;
                background: #fff;
                cursor: pointer;
                transition: all 0.5s;
                &:hover{
                  background: #333;
                  color: #fff;
                }
              }
            }
          }
        }
        .market{
          .navs{
            .navActive{
              background: #333;
              color: #fff;
            }
            span{
              cursor: pointer;
              display: inline-block;
              padding: 10px 20px;
              border: 1px solid #ccc;
              box-sizing: border-box;
              margin-right: 20px;
              transition: all 0.5s;
              &:hover{
                background: #333;
                color: #fff;
              }
            }
          }
          .over{
            padding: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            border-bottom: 1px solid #eaeaea;
            height: 585px;
            box-sizing: border-box;
            .load{
              margin-bottom: 20px;
              margin-left: -40px;
              display: inline-block;
            }
            img{
              text-align: center;
            }
            span{
              text-align: center;
              height: 40px;
              line-height: 40px;
              font-size: 14px;
              color: #a59f9f;
            }
          }
          .list{
            position: relative;
            padding: 80px 80px 100px;
            display: flex;
            border-bottom: 1px solid #eaeaea;
            .jts{
              transition: all 1s;
              position: absolute;
              width: 100%;
              height: 100%;
              left: 0;
              top: 0;
              i{
                width: 32px;
                height: 53px;
                position: absolute;
                top: 258px;
                cursor: pointer;
              }
              .z{
                left: 0;
                transition: all .4s;
                background: url("../assets/img/zjts.png");
                &:hover{
                  background: url("../assets/img/hzjt.png");
                }
              }
              .y{
                transition: all .4s;
                right: 0;
                background: url("../assets/img/yjts.png");
                &:hover{
                  background: url("../assets/img/hyjt.png");
                }
              }
            }
            .marckshop{
              width: 30%;
              transition:all .5s;
              cursor: pointer;
              position: relative;
              text-align: center;
              height: 470px;
              display: flex;
              margin-right: 50px;
              flex-direction: column;
              justify-content: center;
              &:last-child{
                margin-right: 0!important;
              }
              .hbtn{
                position: absolute;
                display: none;
              }
              .zjt{
                display: none;
                position: absolute;
                left: -7px;
                top: 125px;
                img{
                  object-fit: cover;
                  width: 15px;
                  height: 25px;
                }
              }
              .yjt{
                display: none;
                position: absolute;
                right: -7px;
                top: 125px;
                img{
                  object-fit: cover;
                  width: 15px;
                  height: 25px;
                }
              }
              &:hover{
                .zjt,.yjt,hbtn{
                  display: block;
                }
                .zjt{

                }
                .yjt{
                }
                .hbtn{
                  display: block;
                  margin-top: 20px;
                  left: 50%;
                  margin-left: -70px;
                  width: 140px;
                  height:40px;
                  box-sizing: border-box;
                  border: 1px solid #ccc;
                  line-height: 40px;
                  cursor: pointer;
                  text-align: center;
                  transition: all 0.5s;
                  &:hover{
                    background: #333;
                    color: #fff;
                  }
                }
              }

              img{
                width:100%;
                height: 100%;
                padding-bottom: 20px;
                object-fit: cover;
              }
              p{
                /*width: 50%;*/
                padding: 10px 40px 0px;
                color: #333;
              }
              .tt{
                height: 20px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
              }
            }
          }
        }
      }
    }
  }
</style>
<style type="text/less" lang="less">
  .wraps{
    background: #fff;
    .center{
      .market{
        .marckshop{
          .el-carousel__container {
            height: 278px;
            overflow: hidden;
            object-fit: cover;
          }
          .el-carousel__item{
            img{
              height: 278px;
              object-fit: cover;
            }
          }
          .el-carousel__indicator{
            display: none;
          }
          .circular{
            circle{
              background: #ccc!important;
            }
          }
          .el-carousel__arrow--left {
            left: -3px;
          }
          .el-carousel__arrow--right {
            right: -3px;
          }
          .el-carousel__container{
            padding-top: 20px;
          }
        }
      }
    }
    .list{
      .el-icon-arrow-right:before{
        /*color: #c3c3c3!important;*/
      }
      .el-carousel__arrow{
        color: #c3c3c3!important;
        background-color: transparent;
        i{
          font-size: 28px;
        }
      }
    }
  }
</style>
