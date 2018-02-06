<script src="../../../../jingdongTest/src/main.js"></script>
<template>
  <div class="Buy">
    <Navs :num="1"></Navs>
    <div class="main" >
      <div class="mins">
        <ul class="nav">
          <li @click="navNum = (navNum != 1)?1:0" :class="{'active':navNum==1}">
            品牌 <span class="n-icon"></span>
          </li>
          <li  @click="navNum = (navNum != 2)?2:0" :class="{'active':navNum==2}">
            成色<span class="n-icon"></span>
          </li>
          <li @click="navNum = (navNum != 3)?3:0"  :class="{'active':navNum==3}">
            价格<span class="n-icon"></span>
          </li>
          <li  @click="navNum = (navNum != 4)?4:0"  :class="{'active':navNum==4}">
            性别<span class="n-icon"></span>
          </li>
          <li  @click="navNum = (navNum != 5)?5:0" :class="{'active':navNum==5}">
            表壳材质<span class="n-icon"></span>
          </li>
          <li @click="navNum = (navNum != 6)?6:0;"  :class="{'active':navNum==6}">
            更多<span class="n-icon"></span>
          </li>
        </ul>
        <div class="isShowBox" v-if="navNum==1">
          <ul class="uls">
            <li v-for="item in brand">
              <p class="tag1" @click="tab1(item)" >{{item.name}}</p>
            </li>
          </ul>
        </div>
        <div class="isShowBox sexBox padd" v-if="navNum==2">
          <div class="sex">
            <p class="tab2" @click="tab1(item)" v-for="item in fineness">{{item.name}}</p>
          </div>
        </div>
        <div class="isShowBox" v-if="navNum==3" style="padding: 0">
          <div class="price">
            <!--<p>价格区间（万元）</p>-->
            <p>价格区间（USD）</p>
            <div style="position: relative">
              <input type="number" v-model="moeny1">
              <input type="number" v-model="moeny2">
              <p class="red" v-if="red">请输入正确的价格区间</p>
              <span></span>
            </div>
          </div>
          <div class="btn">
            <button @click="moeny1='';moeny2='';red=false;">重置</button>
            <button @click="checkPrice()">确认</button>
          </div>
        </div>
        <div class="isShowBox sexBox" v-if="navNum==4">
          <div class="sex">
            <p class="tab2" @click="tab1(item)" v-for="item in sex">{{item.name}}</p>
          </div>
        </div>
        <div class="isShowBox" v-if="navNum==5">
          <ul class="quality">
            <li @click="tab1(item)" v-for="item in material">{{item.name}}</li>
          </ul>
        </div>
        <div class="isShowBox" v-if="navNum==6" style="padding: 0">
          <div class="left">
            <ul class="uls ul">
              <li v-for="item,i in moreList" :key="i" v-if="i==0 || i==2">
                <div @click="change(item, i)">
                  <p>{{item.title}} <img src="../../assets/img/buy/more.png" :class="{'imgShow':item.isSel}"></p>
                </div>
                <div v-if="item.isSel">
                  <el-radio-group v-model="item.model">
                    <el-radio v-for="el,k in item.data" :key="k" :label="el.id">{{ el.name }}</el-radio>
                  </el-radio-group>
                </div>
              </li>
              <li v-for="item,i in moreList" :key="i" v-if="i==4">
                <div @click="change(item, i)">
                  <p>{{item.title}} <img src="../../assets/img/buy/more.png" :class="{'imgShow':item.isSel}"></p>
                </div>
                <div v-if="item.isSel">
                  <div v-if="item.type == 'checkbox'">
                    <el-checkbox-group v-model="item.model">
                      <el-checkbox v-for="el,k in item.data" :key="k" :label="el">{{ el.manage.name }}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="right">
            <ul class="uls ul">
              <!--<li v-for="item,i in moreList" :key="i" v-if="i==1 || i==3 || i==5">-->
              <li v-for="item,i in moreList" :key="i" v-if="i==3 || i==5">
                <div @click="change(item, i)">
                  <p>{{item.title}} <img src="../../assets/img/buy/more.png" :class="{'imgShow':item.isSel}"></p>
                </div>
                <div v-if="item.isSel">
                  <el-radio-group v-model="item.model">
                    <el-radio v-for="el,k in item.data" :key="k" :label="el.id">{{ el.name }}</el-radio>
                  </el-radio-group>
                </div>
              </li>
            </ul>
          </div>

          <div class="btn">
            <button @click="tab6(1)" >重置</button>
            <button @click="tab6(2)" >确认</button>
          </div>
        </div>
      </div>
      <div class="selet">
        <p>
          <span>筛选</span>
        <ul class="priceSel">
          <li @click="navNum = (navNum != 7)?7:0" :class="{'active':navNum==7}">
            {{value6.name || '最新'}}
            <span class="n-icon"></span>
          </li>
        </ul>
        </p>
        <p class="sel">
          <input type="text" v-model="keyword" @keyup.enter="search()" placeholder="请输入关键字">
          <span class="imgs"><img src="../../assets/img/search.png" alt="" @click="search()"></span>
        </p>
        <div class="seNews" v-if="navNum==7">
          <div class="sex">
            <p  @click="tab7(item)" v-for="item in contentNews">{{item.name}}</p>
          </div>
        </div>
      </div>
      <ul class="tab">
        <li v-for="el,k in filter" :key="k" v-if="k !== 6 && el && el.name" @click="clear(el, k, 1)">
          {{ el.name }} <i><img src="../../assets/img/buy/close.png"></i>
        </li>
        <li v-for="el,k in filter[6]" :key="k" v-if="el && el.name && k !== 4&& k !== 1" @click="clear(el, k, 2)">
          {{ el.name }} <i><img src="../../assets/img/buy/close.png"></i>
        </li>

        <li v-for="el,k in filter[6]" :key="k" v-if="el && el.name && k == 1" @click="clear(el, k, 2)">
          {{ json[el.id]}} <i><img src="../../assets/img/buy/close.png"></i>
        </li>
        <li v-for="el,k in filter[6][4]" v-if="el && el.name" @click="clear(el, k, 3)">
          {{ el.name }} <i><img src="../../assets/img/buy/close.png"></i>
        </li>
      </ul>

      <div v-show="content.length<=0&&loading" v-loading="loading" element-loading-text="加载中" style="height: 227px;"></div>
      <div class="content">
        <ul>
          <li v-for="item,i in content" @click="openDetail(item)" :key="i">
            <dl>
              <dt>
                <img :src="item.cover_pic">
                <img src="../../assets/img/360.png" alt="" class="curs" v-if="item.is_360">
              </dt>
              <dd>
                <p>{{item.title}}</p>
                <p>
                  <!--{{item.price}}-->
                  <span>{{item.price}}</span>
                  <span v-if="item.exchange_stage_name!='在售'" class="buy-exchange">{{item.exchange_stage_name}}</span>
                </p>
                <p>
                  <span class="contory-span"><img :src="item.country_flag" v-if="item.country_flag"> <b>{{item.country_short_name}}</b></span>
                  <span class="finess-span" v-if="item.fineness_name">{{item.fineness_name}}</span>
                  <!--<span>{{item.pv}}次浏览量</span>-->
                </p>
              </dd>
            </dl>
          </li>
        </ul>
      </div>
      <div class="page"  v-show="pagecount && pagecount > 1 && !loading">
        <!--<span class="item" @click="handlerPage(1)">首页</span>-->
        <el-pagination
          layout="prev,pager,next"
          :page-count="pagecount"
          @current-change="handlerPage"
          :current-page.sync="p"></el-pagination>
        <!--<span class="item" @click="handlerPage(pagecount)">尾页</span>-->
        <span class="item">页数  <i>{{ p }}</i> / <i>{{pagecount}}</i></span>
      </div>
      <no-more v-if="content.length <= 0 && !loading"></no-more>
    </div>
  </div>
</template>
<script type="javascript">
  export default {
    data(){

      let filter = sessionStorage.getItem('buy-filter')
      filter = !!filter ? JSON.parse(filter) : {1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: new Array(6),7:{p:1}}

      return {
        loading: true,
        function_name:'',
        navNum:"",
        isSel:false,
        radio1:1,
        macket:[],//所有
        brand:[],// 品牌
        material:[],// 表壳材质
        fineness:[],// 成色
        moeny1: '',//最小值
        moeny2:'',//最大值
        sex:[
          {
            pid:1,
            name: '男性',
          },
          {
            pid:2,
            name: '女性',
          },
          {
            pid:3,
            name: '中性',
          },
        ],//性别
        functionss:[],// 复杂功能
        movement:[],// 机芯类型
        shape:[],// 表盘形状
        contentNews:[
          {
            name:"最新",
            id:"create_time"
          },
          {
            name:"人气",
            id:"pv"
          },
          {
            name:"价格升序",
            id:"price_l"
          },
          {
            name:"价格降序",
            id:"price_h"
          },
        ],
        currentPage1: 5,
        p: 1,  // 当前页码
        currentPage:0, //默认页码
        value6: '',
        exchange_status:'',//已售
        content:[],
        pagecount:0,
        keyword: '', //  关键字
        moreList: [],
        red:false,
        json: {0:'',1:'全部是360','-1':'非360'},

        // 新家
        filter: filter    //  筛选
      }

    },
    created () {
      this.p=this.filter[7].p
    },
    methods: {
      /**
       * 点击页码获取数据
       * */
      handlerPage(val) {
        if(val > 0 && val <= this.pagecount) {
          this.p = val
          this.filter[7] = {p: this.p}
          sessionStorage.setItem('buy-filter', JSON.stringify(this.filter))
          this.getList()
//          this.$router.push(`/buy/?p=${this.p}`)
//          this.$router.push(`/buy`)
          this.content=[]
        }
        window.scrollTo(0,0)
      },
      getList() {
        let self=this
        self.loading=true
        this.content = []

        let fun_id = []
        if(self.filter[6] && self.filter[6][4]) {
          for(let k in self.filter[6][4]) {
            fun_id.push(self.filter[6][4][k].id)
          }
        }
        fun_id = fun_id.join(',')

        let postData={
          price_l:self.filter[3] ? self.filter[3].moeny1 : 0,
          price_h:self.filter[3] ? self.filter[3].moeny2 :  -1,
          p:self.p || 1,
          rows:30,
          title:self.keyword,
          brand_id: self.filter[1] ? self.filter[1].id : '',
          fineness_id: self.filter[2] ? self.filter[2].pid : '',
          gender: self.filter[4] ? self.filter[4].pid : '',
          material_id: self.filter[5] ? self.filter[5].pid : '',
          order:self.value6.id ||'create_time',
          exchange_status: self.filter[6][0] ? self.filter[6][0].id : '',
          movement_id: self.filter[6][3] ? self.filter[6][3].id : '',
          shape_id: self.filter[6][2] ? self.filter[6][2].id : '',
          diameter_l: self.filter[6][5] ? self.filter[6][5].id.diameter_l : '',
          diameter_h: self.filter[6][5] ? self.filter[6][5].id.diameter_h : '',
          function_id: fun_id,
          is_360:self.filter[6][1] ? self.filter[6][1].id : '',
        }
        this.$http.get(`${process.env.API.MARKET}/v2/market/buyer/goodsList`,{
          params: postData
        }).then(res=>{
          if(parseInt(res.data.errcode) === 0) {
            this.pagecount = res.data.page.total_pages  //  总共多少页
//            for(let i in res.data.data){
//              if(res.data.data[i].fineness_name!=8){
                this.content = res.data.data
//              }
//            }
          }else {
            this.pagecount = 0
            this.content = []
          }
          self.loading=false
        }).catch(() => {
          this.content = []
          this.p = 1
          this.pagecount=0
          self.loading=false
        })
      },
      /** type: 1   filter前五个 */
      clear(item,k, type){
        this.p = 1
        if(type == 1 && k == 3) {
          this.moeny1=""
          this.moeny2=""
        }
        if(type == 1) {
          this.filter[k] =  {id: '', name: ''}
        }else if(type == 2) {
          this.filter[6][k] =  {id: '', name: ''}
          this.moreList[k].model = ''
        }else if(type == 3) {
          let id = this.filter[6][4][k].id
          this.filter[6][4][k] = {id: '', name: ''}
          let d = this.moreList[4].model
          for(let i=0,len=d.length; i<len; i++){
            if(d[i].manage.id === id) {
              this.moreList[4].model.splice(i, 1)
              break;
            }
          }
        }
        sessionStorage.setItem('buy-filter', JSON.stringify(this.filter))
        this.getList()
      },
      tab1(item) {
        this.filter[this.navNum] = item
        sessionStorage.setItem('buy-filter', JSON.stringify(this.filter))
        this.navNum = ''
        this.p = 1
        this.getList()
      },
      checkPrice(){
        if(this.moeny1<=0 || this.money2<=0){
          this.red=true
          return false
        }
        let v3 = ''
        if(this.moeny1<this.moeny2){
          v3='$'+this.moeny1+" - $"+this.moeny2;
        }
        if(this.moeny1>this.moeny2){
          v3='$'+this.moeny1+" - $"+this.moeny2;
        }
        if(!this.moeny1&&this.moeny2){
          v3='$'+this.moeny2+"以下"
        }
        if(!this.moeny2&&this.moeny1){
          v3='$'+this.moeny1+"以上"
        }
        if(this.moeny2==this.moeny1){
          v3='$'+this.moeny1
        }
        this.value3 = v3

        this.filter[this.navNum] = {moeny2: this.moeny2, moeny1: this.moeny1, name: v3 }
        sessionStorage.setItem('buy-filter', JSON.stringify(this.filter))

        this.p = 1
        this.getList()
        this.navNum=""
        this.red=false
      },
      tab6(index) {
        let listValue=[];
        switch (index){
          case 1:
            for(let i=0;i<this.moreList.length;i++){
              this.moreList[i].model=this.moreList[i].type === 'checkbox' ? [] : ''
            }
            this.filter[6]=[{id: '', name: ''},{id: '', name: ''},{id: '', name: ''},{id: '', name: ''},[]]
            break;
          case  2:
            sessionStorage.removeItem('buy-filter')
            for(let i=0;i<this.moreList.length;i++){
              let model = this.moreList[i].model
              let data = this.moreList[i].data
              if(this.moreList[i].type === 'checkbox') {
                let val = []
                for(let q=0,len=data.length; q<len;q++) {
                  for(let k in model) {
                    if(model[k].manage.id === data[q].manage.id) {
                      val.push({
                        id: model[k].manage.id,
                        name: data[q].manage.name,
                      })
                      break;
                    }
                  }
                }
                this.filter[6].splice(i, 1, val)
              }else {
                for(let k=0,len=data.length; k<len;k++) {
                  if(model === data[k].id) {
                    this.filter[6].splice(i, 1, {
                      id: model,
                      name: data[k].name
                    })
                    break;
                  }
                }
              }
            }
            this.navNum=""
            break;
        }

        sessionStorage.setItem('buy-filter', JSON.stringify(this.filter))
        this.p = 1
        this.getList()
      },
      tab7(index) {
        switch (index){
          case index:
            this.value6=index;
            this.navNum=""
            break;
        }
        this.p = 1
        this.getList()
      },
      /**
       * 关键词搜索
       * */
      search () {
        this.p = 1
        this.getList()
      },
      /**
       * 更多
       */
      change(item, index){
        switch (index){
          case index:
            this.isSel=!this.isSel
            break;
        }
        item.isSel=!item.isSel
      },
      /**
       * 跳转详情页
       */
      openDetail(item) {
        this.$router.push(`/buy/detail?id=${item.gid}&fineness_id=${item.fineness_id}`)
      },
    },
    mounted() {
      window.scrollTo(0,0)
      let self = this
      document.title= '瑞时会-直买'
      let title = ['售卖状态', '360°看图', '表盘形状','机芯类型', '复杂功能', '表盘直径']
      for (let i = 0; i < 6; i++) {
        this.moreList.push({
          isSel: false,
          title: title[i],
          model: i === 4 ? [] : '',
          type: i === 4 ? 'checkbox' : 'radio',
          data: i === 0 ? [{id: "sale", name: '在售'}, {id: "sold" , name:'已售' }] : [] &&
          i === 1 ? [{id:0, name: '全部'}, {id: 1 , name:'是' },{id: -1 , name:'否' }] : [] &&
          i === 5 ? [
            {id: {diameter_l:0, diameter_h:36}, name: '36mm以下'},
            {id: {diameter_l:36, diameter_h:39}, name: '36-39mm'},
            {id: {diameter_l:39, diameter_h:42}, name: '39-42mm'},
            {id: {diameter_l:42, diameter_h:45}, name: '42-45mm'},
            {id: {diameter_l:45, diameter_h:-1}, name: '45mm以上'}] : [],
        })
      }
//      if(this.filter[6]) {
//        let f = this.filter[6]
//        this.moreList[0].model = f[0] && f[0].id ? f[0].id : ''
//        this.moreList[1].model = f[1] && f[1].id ? f[1].id : ''
//        this.moreList[2].model = f[2] && f[2].id ? f[2].id : ''
//        this.moreList[3].model = f[3] && f[3].id ? f[3].id : ''
//        this.moreList[5].model = f[5] && f[5].id ? f[5].id : ''
//        for (let i in f[4]){
//          console.log(f[4])
//          console.log(f[1])
//          console.log(this.moreList)
//          this.moreList[4].model.push({
//            manage: {
//              id: f[4][i].id,
//              name: f[4][i].name
//            }
//          })
//          this.moreList[4].model[i].manage.id== f[4] && f[4][i].id ? f[4][i].id : ''
//        }

//      }
      //  this.p = this.currentPage

      this.getList()
      // 成色
      self.$http.get(`${process.env.API.DICT}/dict/fineness`).then(res => {
        if(res.data.errcode=='0'){
          for(let i in res.data.data){
            if(res.data.data[i].pid!=8){
              self.fineness.push(res.data.data[i])
            }
          }
        }
      }).catch(err => {
        console.log(err)
      })
      // 品牌
      self.$http.get(`${process.env.API.DICT}/dict/brand`).then(res=>{
        self.brand = res.data.data
      }).catch(err=>{
        console.log(err)
      })
      //表壳材质
      self.$http.get(`${process.env.API.DICT}/dict/material`).then(res=>{
        self.material = res.data.data
      }).catch(err=>{
        console.log(err)
      })

      //复杂功能
      self.$http.get(`${process.env.API.DICT}/dict/function`).then(res=>{
        self.functionss = res.data.data
      }).catch(err=>{
        console.log(err)
      })
    },
    watch: {
      navNum (val) {
        let that = this
        if(val === 6) {
          let getData = (obj) => {
            if(obj.list && obj.list.data.length <= 0) {
              obj.list.data = []
              that.$http.get(obj.url).then(res=>{
                if(parseInt(res.data.errcode) === 0) {
                  ///  to do result
                  // let data = []
                  obj.list.data = res.data.data
                }else {
                  obj.data = []
                }
              }).catch(err=>{
                console.log(err)
              })
            }
          }

          /**
           * 机芯类型
           */
          getData({
            list: that.moreList[3],
            url: `${process.env.API.DICT}/dict/movement`
          })
          /**
           * 表盘形状
           */
          getData({
            list: that.moreList[2],
            url: `${process.env.API.DICT}/dict/shape`
          })
          /**
           * 复杂功能
           */
          getData({
            list: that.moreList[4],
            url: `${process.env.API.DICT}/dict/function`
          })
        }
      },
      '$route'(val) {
        window.scrollTo(0,0)
        // this.currentPage=parseInt(val.query.p)
        this.p = parseInt(val.query.p)
        this.getList()
      }
    }
  }
</script>
<style lang="less" scoped type="text/less">
  .Buy{
    .main{
      box-sizing:border-box;
      max-width: 1200px;
      min-width: 1000px;
      min-height: 500px;
      padding: 40px 10px 60px;
      margin: 0 auto;
      .nav{
        text-align: center;
        border: 1px solid #ccc;
        height: 45px;
        display: flex;
        margin-bottom: 20px;
        position: relative;
        li{
          cursor: pointer;
          flex: 1;
          height: 45px;
          line-height: 45px;
          border-right: none;
          text-align: center;
          color: #666;
          font-size: 16px;
          background: #f1f1f1;
          transition: all .4s;
          position: relative;
          &:before{
            content: '';
            width: 1px;
            height: 45px;
            background: #ccc;
            position: absolute;
            right: 0;
            top: 0;
          }
          &:last-child{
            &:before{
              content: '';
              width: 0;
              height: 0;
            }
          }
        }
        .navActive{
          background: #333;
          color: #fff;
        }
      }
      .mins{
        position: relative;
        .isShowBox{
          position: absolute;
          left: 0;
          right: 0;
          top: 47px;
          background: #fff;
          border: 2px solid #ccc;
          box-sizing: border-box;
          padding: 0 40px;
          padding-right: 0;
          z-index: 100;
          height: auto;
          border-top: none;
          &:first-child{
            padding-bottom: 46px;
          }
          .uls{
            display: flex;
            flex-wrap: wrap;
            padding-bottom: 10px;
            .tag1{
              cursor: pointer;
            }
            li{
              width: 20%;
              padding-right: 40px;
              box-sizing: border-box;
              p{
                cursor: pointer;
                padding-left: 20px;
                border-bottom: 1px solid #e6e6e6;
                line-height: 50px;
                &:hover{
                  background: #fafafa;
                  font-weight: bold;
                }
              }
            }
          }
          .left{
            float: left;
            width: 50%;
            .uls{
              div{
                &:last-child{
                  max-height: 200px;
                  overflow-y: auto;
                  width:100%;
                }
              }
            }
          }
          .right{
            float: right;
            width: 50%;
            .uls{
              div{
                &:last-child{
                  max-height: 200px;
                  overflow-y: auto;
                  width:100%;
                }
              }
            }
          }
          .ul{
            display: block;
            padding: 0 40px;
            padding-bottom: 10px;
            li{
              width: 100%;
              height: auto;
              border-bottom: 1px solid #ccc;
              padding-left: 20px;
              padding-right: 0;
              &:nth-child(2n-1){
                margin-right: 40px;
              }
              p{
                border: none!important;
                transition: all .4s;
                padding-left: 0;
                img{
                  float: right;
                  margin-top: 20px;
                  &.imgShow{
                    transform: rotate(135deg);
                  }
                }
              }
            }
          }
          .price{
            padding-top: 40px;
            width: 512px;
            margin: 0 auto;
            p{
              font-size: 16px;
              color: #666;

            }
            div{
              padding-top: 20px;
              display: flex;
              justify-content: space-between;
              position: relative;
              width: 512px;
              height: 52px;
              input{
                border: 1px solid #ccc;
                width: 160px;
                height: 52px;
                padding:  0 10px;
                box-sizing: border-box;
              }
              .red{
                position: absolute;
                top:80px;
                left: 0;
                font-size: 14px;
                color: #c11c23;
              }
              span{
                position: absolute;
                display: block;
                left: 180px;
                top: 40px;
                width: 150px;
                height: 1px;
                color: #ccc;
                border-bottom: 1px solid #ccc;
              }
            }

          }
          .btn{
            clear: both;
            text-align: right;
            border-top: 1px solid #ccc;
            margin-top: 40px;
            padding-top: 20px;
            padding-bottom: 15px;
            button{
              cursor: pointer;
              box-sizing: border-box;
              display: inline-block;
              width: 160px;
              height: 46px;
              border: 1px solid #ccc;
              color: #999;
              font-size: 16px;
              background: none;
              transition: all .4s;
              &:first-child{
                margin-right: 20px;
              }
              &:last-child{
                margin-right: 40px;
              }
              &:hover{
                background: #333;
                color: #ebebeb;
              }
            }
          }
          .quality{
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            padding-bottom: 10px;
            li{
              cursor: pointer;
              width: 15.7%;
              height: 48px;
              line-height: 48px;
              padding-left: 20px;
              border-bottom: 1px solid #ccc;
              margin-right: 40px;
              box-sizing: border-box;
              color: #666;
              font-size: 16px;
              &:hover{
                background: #fafafa;
                color: #333;
                font-weight: bold;
              }
            }
          }
        }
        .sexBox{
          width: 16.7%;
          height: auto;
          left:50%;
          padding-left: 0;
          .sex{
            display: flex;
            flex-direction: column;
            p{
              height: 50px;
              border-bottom: 1px solid #e6e6e6;
              text-align: center;
              line-height: 50px;
              box-sizing: border-box;
              color: #666;
              cursor: pointer;
              &:last-child{
                border-bottom: none;
              }
              &:hover{
                color: #000;
                font-weight: bold;
              }
            }
          }
        }
        .padd{
          left:16.7%
        }

        .nav li {
          .n-icon {
            margin-left: 3px;
            display: inline-block;
            width: 12px;
            height: 12px;
            vertical-align: middle;
            background: url('../../assets/img/buy/xjt.png') no-repeat;
          }
          &.active {
            background: #333;
            color: #fff;
            .n-icon {
              background: url('../../assets/img/buy/close.png') no-repeat;
            }
          }
        }
      }
      .selet{
        position: relative;
        padding-bottom: 20px;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        justify-content: space-between;
        z-index: 50;
        .seNews{
          width:145px;
          transition: all .4s;
          position: absolute;
          top: 30px;
          left: 42px;
          background:#fff;
          border: 2px solid #ccc;
          box-sizing: border-box;
          border-top:none;
          p{
            cursor: pointer;
            line-height: 28px;
            padding-left:10px;
            box-sizing: border-box;
            color: #666;
            width:143px;
            &:hover{
              background: #333;
              color: #ebebeb;
            }
          }
        }
        p{
          cursor: pointer;
          display: flex;
          .priceSel{
            width:145px;
            height: 30px;
            border: #ccc solid 1px;
            background: #f1f1f1;
            color: #666;
            line-height: 30px;
            display: flex;
            box-sizing: border-box;
            li{
              width:145px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0 10px;
              transition: all .4s;
              .n-icon {
                margin-top: 3px;
                margin-left: 3px;
                display: inline-block;
                width: 12px;
                height: 12px;
                vertical-align: middle;
                background: url('../../assets/img/buy/xjt.png') no-repeat;
              }
              &.active {
                background: #333;
                color: #fff;
                .n-icon {
                  background: url('../../assets/img/buy/close.png') no-repeat;
                }
              }
            }

          }
          span{
            font-size: 16px;
            color: #666;
            padding-right: 10px;
          }
        }
        .sel{
          position: relative;
          input{
            width: 227px;
            height: 37px;
            border: #ccc solid 1px;
            padding: 0 30px 0 10px;
            box-sizing: border-box;
          }
          .imgs{
            position: absolute;
            right: 5px;
            top: 10px;
          }
        }
      }
      .tab{
        padding-top: 20px;
        padding-bottom: 20px;
        display: flex;
        flex-wrap: wrap;
        li{
          cursor: pointer;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          height: 30px;
          background: #999;
          color: #ebebeb;
          font-size: 16px;
          line-height: 30px;
          box-sizing: border-box;
          padding: 0 10px;
          margin-right: 20px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          i{
            padding-left: 10px;
          }
        }
      }
      .content{
        padding-bottom: 40px;
        /*border-bottom: 1px solid #e9e9e9;*/
        ul{
          display: flex;
          flex-wrap: wrap;
          li{
            width: 31.8%;
            max-width: 386px;
            max-height: 533px;
            background: #fff;
            margin-right: 20px;
            box-sizing: border-box;
            margin-bottom: 20px;
            padding: 10px 10px 20px;
            cursor: pointer;
            &:nth-child(3n){
              margin-right: 0;
            }
            &:hover{
              /*border: 2px solid #ccc;*/
            }
            dl{
              dt{
                position: relative;
                width: 100%;
                height: 376px;
                text-align: center;
                padding-bottom: 10px;
                box-sizing: border-box;
                border-bottom: 1px solid #e6e6e6;
                img{
                  width: 100%;
                  height: 100%;
                  object-fit: cover
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
                p{
                  color: #333;
                  padding-top: 10px;
                  font-size: 14px;
                  &:nth-child(1){
                    font-weight: bold;
                    height: 16px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                  }
                  &:nth-child(2){
                    font-size: 18px;
                    height: 20px;
                    font-weight: normal;
                  }
                  &:nth-child(3){
                    color: #999;
                    margin-top: 5px;
                    display: flex;
                    justify-content: center;
                  }
                  &:nth-child(2),&:nth-child(3){
                    display: flex;
                    justify-content: space-between;
                    span{

                    }
                    .buy-exchange{
                      background: #ecf0f4;
                      padding:  3px 5px;
                      margin-top: -3px;
                      font-size: 12px;
                      display: block;
                      color: #333;
                    }
                    .contory-span{
                      display: flex;
                      align-items: center;
                      img{
                        width: 22px;
                        height: 24px;
                        display: inline-block;
                        object-fit: cover;
                        margin-right: 5px;
                        margin-top: -3px;
                      }
                      b{
                        font-weight: normal;
                      }
                      color: #333;
                    }
                    .finess-span{
                      color: #333;
                      border:1px solid #ccc;
                      padding: 3px 10px;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .page{
        display: flex;
        border-bottom: 1px solid #e9e9e9;
        padding: 20px 0;
        justify-content: flex-end;
      }
    }
  }
</style>
<style type="text/less" lang="less">
  .Buy{
    .el-radio-group{
      width: 100%;
    }
    .el-radio{
      width: 48%;
      padding-bottom: 18px;
      margin-left: 0;
      .is-checked{
        .el-radio__inner{
          background: none;
          border: 1px solid #000;
          &:after{
            background: #000!important;
          }
        }
      }
    }
    .el-checkbox{
      width: 49%;
      margin-left: 0;
      padding-bottom: 18px;
      .el-checkbox__inner{
        background: #fff;
        &:after{
          border-color: #333;
        }
      }
    }

    .number{
      background: none;
    }
  }
</style>
