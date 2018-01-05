<template>
  <div class="Weathpage">
    <div class="wrapShow" v-show="iswrapShow"></div>
    <div class="wrapShowshang" v-show="iswrapShow">
      <div class="head">
        <span><img src="../../assets/img/buy/closeh.png" @click="iswrapShow=!iswrapShow"></span>
      </div>
      <div>
        <img src="../../assets/img/buy/liucheng.png">
      </div>
    </div>
    <Top></Top>
    <Navs :num="2"></Navs>
    <div class="mian">
      <div class="title">
          <div class="left">
            直售
          </div>
          <div class="right" @click="iswrapShow=!iswrapShow">
            <img src="../../assets/img/weth/liu.png" >
            腕表发布流程
          </div>
        </div>
      <div class="info">
        <div class="fileBuy" v-if="ifFile">
          <span class="reds">失败原因：</span>{{remark}}
        </div>
        <div class="inlin">
          <div class="input inputPos">
            <span>腕表品牌 </span>
            <div class="selInputs">
              <input type="text" v-model="infoList.brand" placeholder="选择一个品牌"@click="isBrand=!isBrand" readonly>
            </div>
            <div class="select" v-if="isBrand">
              <p v-for="item in brand" @click="brandClick(item)">
                {{item.name}}
              </p>
            </div>
          </div>

        </div>
        <div class="input">
          <span>标题 </span>
          <input type="text" v-model="postData.title" placeholder="请输入标题、品牌、型号(必填，30字以内)">
        </div>
        <div class="input">
          <span>描述 </span>
          <textarea name="text" id="" cols="30" rows="10" placeholder="请输入标题、品牌、型号(必填，500字以内)" v-model="postData.details"></textarea>
        </div>
        <div class="tit">
          <!--<div class="titPost">-->
            <!--支付方式 <span>(最多可上传10张)</span>-->
          <!--</div>-->
          <div class="payList">
            <ul>
              <li>
                <el-upload
                  class="avatar-uploader"
                  :headers="head"
                  :action="upload"
                  :show-file-list="false"
                  :on-success="successImg1"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="img[0].img" :src="img[0].img" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <span v-if="imgData[0]!='-1'&&imgData[0]!=''" @click.stop="removeImg(1)"><img
                    src="../../assets/img/closes.png"></span>
                </el-upload>
              </li>
              <li>
                <el-upload
                  class="avatar-uploader"
                  :headers="head"
                  :action="upload"
                  :show-file-list="false"
                  :on-success="successImg2"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="img[1].img" :src="img[1].img" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <span v-if="imgData[1]!='-1'&&imgData[1]!=''" @click.stop="removeImg(2)"><img
                    src="../../assets/img/closes.png"></span>
                </el-upload>
              </li>
              <li>
                <el-upload
                  class="avatar-uploader"
                  :headers="head"
                  :action="upload"
                  :show-file-list="false"
                  :on-success="successImg3"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="img[2].img" :src="img[2].img" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <span v-if="imgData[2]!='-1'&&imgData[2]!=''" @click.stop="removeImg(3)"><img
                    src="../../assets/img/closes.png"></span>
                </el-upload>
              </li>
              <li>
                <el-upload
                  class="avatar-uploader"
                  :headers="head"
                  :action="upload"
                  :show-file-list="false"
                  :on-success="successImg4"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="img[3].img" :src="img[3].img" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <span v-if="imgData[3]!='-1'&&imgData[3]!=''" @click.stop="removeImg(4)"><img
                    src="../../assets/img/closes.png"></span>
                </el-upload>
              </li>
              <li>
                <el-upload
                  class="avatar-uploader"
                  :headers="head"
                  :action="upload"
                  :show-file-list="false"
                  :on-success="successImg5"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="img[4].img" :src="img[4].img" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <span v-if="imgData[4]!='-1'&&imgData[4]!=''" @click.stop="removeImg(5)"><img
                    src="../../assets/img/closes.png"></span>
                </el-upload>
              </li>
              <li>
                <el-upload
                  class="avatar-uploader"
                  :headers="head"
                  :action="upload"
                  :show-file-list="false"
                  :on-success="successImg6"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="img[5].img" :src="img[5].img" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <span v-if="imgData[5]!='-1'&&imgData[5]!=''" @click.stop="removeImg(6)"><img
                    src="../../assets/img/closes.png"></span>
                </el-upload>
              </li>
              <li>
                <el-upload
                  class="avatar-uploader"
                  :headers="head"
                  :action="upload"
                  :show-file-list="false"
                  :on-success="successImg7"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="img[6].img" :src="img[6].img" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <span v-if="imgData[6]!='-1'&&imgData[6]!=''" @click.stop="removeImg(7)"><img
                    src="../../assets/img/closes.png"></span>
                </el-upload>
              </li>
              <li>
                <el-upload
                  class="avatar-uploader"
                  :headers="head"
                  :action="upload"
                  :show-file-list="false"
                  :on-success="successImg8"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="img[7].img" :src="img[7].img" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <span v-if="imgData[7]!='-1'&&imgData[7]!=''" @click.stop="removeImg(8)"><img
                    src="../../assets/img/closes.png"></span>
                </el-upload>
              </li>
              <li>
                <el-upload
                  class="avatar-uploader"
                  :headers="head"
                  :action="upload"
                  :show-file-list="false"
                  :on-success="successImg9"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="img[8].img" :src="img[8].img" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <span v-if="imgData[8]!='-1'&&imgData[8]!=''" @click.stop="removeImg(9)"><img
                    src="../../assets/img/closes.png"></span>
                </el-upload>
              </li>
            </ul>
          </div>
        </div>
        <div class="input">
          <span> </span>
          <div class="hui"> 一定要上传前面3张图片，并按要求上传</div>
        </div>
        <div class="input">
          <span></span>
          <input type="checkbox" name="" v-model="isCheck" class="nones">
          <div class=" hui">阅读并同意</div>
          <b style="font-weight: normal;cursor: pointer"  @click="open5">《在线寄售协议》</b>
        </div>
        <div class="input">
          <span>性别 </span>
          <ul class="tab">
            <li v-for="(item,index) in sex" :class="{'active':(index+1) == postData.gender}" @click="genderClick(index)">{{item.name}}</li>
          </ul>
        </div>
        <div class="input">
          <span>机芯类型 </span>
          <ul class="tab" style="height: auto">
            <li v-for="(item,index) in movement"  :class="{'active':postData.movement_id==item.id}" @click="watchCaseClick(item,index,1)">{{item.name}}</li>
          </ul>
        </div> <div class="input">
        <span>表壳材质 </span>
        <ul class="tab" style="height: auto">
          <li v-for="(item,index) in material"  :class="{'active':postData.material_id==item.id}" @click="watchCaseClick(item,index,2)">{{item.name}}</li>
        </ul>
      </div>
        <div class="input">
          <span>表盘形状 </span>
          <ul class="tab" style="height: auto">
            <li v-for="(item,index) in shape"  :class="{'active':postData.shape_id==item.id}" @click="watchCaseClick(item,index,3)">{{item.name}}</li>
          </ul>
        </div>
        <div class="input">
          <span>复杂功能 </span>
          <span class="checkboxMore">(多选)</span>
          <ul class="tab" style="height: auto">
            <li v-for="(item,index) in functionss"  :class="{'active':postData.function_id.indexOf(item.manage.id.toString())>-1}"
                @click="complexClick(item,index)">{{item.manage.name}}
            </li>
          </ul>
        </div>
        <div class="input">
          <span>所在地</span>
          <ul>
            <li>
              <input type="text" v-model="infoList.she" placeholder="省/直辖市" @click="isSelClick">
              <div class="select" v-if="isSel">
                <p v-for="item in infoCity" @click="sel(item)">
                  {{item.name}}
                </p>
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <input type="text" v-model="infoList.city" placeholder="城市" @click="isCityClick">
              <div class="select" v-if="isCity">
                <p v-for="item in cityData" @click="cityClick(item)">{{item.name}}</p>
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <input type="text" v-model="infoList.qu" placeholder="区/县" @click="isQuClick">
              <div class="select" v-if="isQu">
                <p v-for="item in qu" @click="quClick(item)">{{item.name}}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="inlin">
          <div class="input inputPos">
            <span>成色 </span>
            <div class="selInputs">
              <input type="text" class="zinx" placeholder="请选择" v-model="infoList.fineness_id" @click="isfinenessClick" readonly>
            </div>
            <div class="select" v-if="isfineness">
              <p v-for="item in fineness" @click="finenessClick(item)">
                {{item.name}}
              </p>
            </div>
          </div>
        </div>
        <div class="inlin">
          <div class="input inputPos">
            <span>银行卡 </span>
            <div class="selInputs">
              <input type="text" v-model="infoList.card" placeholder="请选择"@click="isCardClick" readonly>
            </div>
            <div class="select" v-if="isCard">
              <p v-for="item in yhCard" @click="cardClick(item)">
                {{item.bank_name}}({{item.cardnum}})
              </p>
            </div>
          </div>
        </div>
        <div class="inlin">
          <div class="input">
            <span>表盘直径 </span>
            <input type="number" v-model="postData.diameter" placeholder="0"> MM
          </div>
        </div>
        <div class="inlin">
          <div class="input">
            <span>原价 </span>
            <input type="number" v-model="postData.original_price" placeholder="0">
            万
          </div>
        </div>
        <div class="inlin">
          <div class="input">
            <span>售价 </span>
            <input type="number" v-model="postData.price" placeholder="不能低于0.1">
            万
          </div>
        </div>
        <div class="button">
          <button @click="sub">确认发布</button>
        </div>
      </div>
      <div class="mark">
        <div class="title">
          <p>{{contentList.title}}</p>
          <span>修改时间{{contentList.publish_time}}</span>
        </div>
        <p><span class="close" @click="close">
           <img src="../../assets/img/buy/closeh.png" alt="">
         </span></p>
        <div class="cont">
          <p v-html="contentList.content">

          </p>
        </div>
      </div>
      <div class="marks">

      </div>
    </div>
    <Foot></Foot>
  </div>
</template>
<script type="javascript">
  export default {
    data(){
      return {
        remark:'',
        ifFile:false,
        uploadUrl:`${process.env.API.USER}/user/upload`,
        imageUrl:require('../../assets/img/zhuanz.png'),
        imgHead:`${process.env.API.USER}/user/upload`,
        head: {
          AccessToken: localStorage.getItem('AccessToken'),
          Authorization: localStorage.getItem('Authorization')
        },
        imgData: [
          '', '', '', '', '', '', '', '', ''
        ],
        upload: `${process.env.API.USER}/user/upload`,
        img: [
          {img: require('@/assets/img/weth/img1.png')},
          {img: require('@/assets/img/weth/img2.png')},
          {img: require('@/assets/img/weth/img3.png')},
          {img: require('@/assets/img/weth/img4.png')},
          {img: require('@/assets/img/weth/img5.png')},
          {img: require('@/assets/img/weth/img6.png')},
          {img: require('@/assets/img/weth/img7.png')},
          {img: require('@/assets/img/weth/img8.png')},
          {img: require('@/assets/img/weth/img9.png')},
        ],
        infoList:{
          city:'',
          she:'',
          qu:'',
          tel:'',
          brand:'',
          fineness_id:'',
          card:'',
        },
        postData: {
          brand:'',
          detail:'',
          gender:'',
          diameter: '',
          title: '',
          brand_id: '',
          material_id: '',
          shape_id: '',
          original_price: '',
          price: '',
          details: '',
          file_id: [],
          cover: '',
          function_id: [],
          location: '',
          prov_code: '',
          city_code: '',
          dist_code: '',
          fineness_id: '',
          movement_id: '',
          bankcard_id: '',
        },
        brand:'',//品牌
        sex:[
          {
            id:1,
            name: '男性',
          },
          {
            id:2,
            name: '女性',
          },
          {
            id:3,
            name: '中性',
          },
        ],//性别
        movement:'',//机芯类型
        material:'',//表壳材质
        shape:'',//表盘形状
        functionss:'',//复杂功能
        yhCard:'',//银行卡
        fineness:'',//成色
        infoCity:'',
        city:'',
        cityData:'',
        qu:'',
        city_code:'',
        dist_code:'',
        prov_code:'',
        isSel:false,
        isCity:false,
        isQu:false,
        isBrand:false,
        isCard:false,
        isfineness:false,
        isCheck:true,
        iswrapShow:false,
        imgList:[
        ],
        contentList:'',
        httpUrl:{
          movementUrl:`${process.env.API.DICT}/dict/movement`, //机芯类型
          materialUrl:`${process.env.API.DICT}/dict/material`, //表壳材质
          shapeUrl:`${process.env.API.DICT}/dict/shape`, //表盘形状
          functionUrl:`${process.env.API.DICT}/dict/function`, //复杂功能
          finenessUrl:`${process.env.API.DICT}/dict/fineness`, //成色
          infoCityUrl:`${process.env.API.DICT}/dict/area?kind=${'all'}&nonce=${0.9064637705159901}`, //地址
          brandUrl:`${process.env.API.DICT}/dict/brand?is_pc=1`, //品牌
          bankcardUrl:`${process.env.API.USER}/user/bankcard`, //银行卡
          EXCHANGEUrl:`${process.env.API.NEWS}/news/agreement?name=${'EXCHANGE'}`, //在售协议
        }
      }
    },
    created(){
     setTimeout(()=>{
       if(this.$route.query.gid!=undefined){
         this.ifFile=true
       }else{
         this.ifFile=false
       }
       let self =this;
       self.postData.file_id=""
       self.$http.get(`${process.env.API.MARKET}/market/seller/republishinfo?gid=${this.$route.query.gid}`).then(res => {
         if (res.data.errcode == '0') {
           self.infoList.brand = res.data.data.brand_name //品牌名字

           self.postData.brand_id = res.data.data.brand_id //品牌名字
           self.postData.function_id = res.data.data.function_id.replace(/^,*|,*$/g, '').split(',') //品牌名字
           self.postData.details = res.data.data.details//详情
           self.postData.title = res.data.data.title//标题
           self.postData.gender = res.data.data.gender //性别
           self.postData.material_id = res.data.data.material_id //材质
           self.postData.original_price = res.data.data.original_price.split("￥")[1]/10000//原价
           self.postData.price = res.data.data.price.split("￥")[1]/10000//售价
           self.postData.cover = res.data.data.cover_fid//售价
           self.postData.movement_id = res.data.data.movement_id //机芯
           self.postData.fineness_id = res.data.data.fineness_id//成色id
           self.postData.bankcard_id = res.data.data.user_bankcard_id//银行卡id
           for (let b = 0; b < self.infoList.length; b++) {
             if (self.infoList[b].id == self.postData.bankcard_id) {
               self.bank = `${self.infoList[b].bank_name}(${self.infoList[b].cardnum})`
             }
           }
           self.infoList.fineness_id = res.data.data.fineness_name //成色展示
           self.infoList.she = res.data.data.area.split("/")[0] //省市区展示

           let file_pic = res.data.data.file_pic.split(',')//图片

           for (let i = 0; i < 9; i++) {
             if (file_pic[i] && file_pic[i] != -1) {
               self.img[i].img = file_pic[i]
             }
           }
           self.postData.file_id = res.data.data.file_fid.split(',')//图片id
           self.imgData = self.postData.file_id//图片id
           self.postData.diameter = res.data.data.diameter//直径
           self.prov_code = res.data.data.prov_code
           self.city_code = res.data.data.city_code
           self.dist_code = res.data.data.dist_code
           self.infoList.city = res.data.data.area.split("/")[1] //省市区展示
           self.infoList.qu = res.data.data.area.split("/")[2] //省市区展示
           for (let b = 0; b < self.yhCard.length; b++) {
             if (self.yhCard[b].id == self.postData.bankcard_id) {
               self.infoList.card = `${self.yhCard[b].bank_name}(${self.yhCard[b].cardnum})`
             }
           }

           self.remark = res.data.data.remark
           self.postData.shape_id = res.data.data.shape_id//形状
         }
       }).catch(err => {
         console.log(err)
       })
     })
    },
    methods: {
      /**
       *
       * 性别
       */
      genderClick(index) {
        let self = this
        if ((index + 1) == self.postData.gender) {
          self.postData.gender = 0
        } else {
          self.postData.gender = index + 1
        }
      },
      /**
       *
       * 机芯类型  形状  材质
       */
      watchCaseClick(item, index,i) {
        let self = this
        switch (i){
          case 1:
            if (item.id == self.postData.movement_id) {
              self.postData.movement_id = ''
            } else {
              self.postData.movement_id = item.id
            }
            break;
          case 2:
            if (item.id == self.postData.material_id) {
              self.postData.material_id = ''
            } else {
              self.postData.material_id = item.id
            }
            break;
          case 3:
            if (item.id == self.postData.shape_id) {
              self.postData.shape_id = ''
            } else {
              self.postData.shape_id = item.id
            }
            break;
        }
      },
      /**
       *
       * 复杂功能
       */
      complexClick(item, index) {
        let self = this
        for (let i = 0; i < self.postData.function_id.length; i++) {
          if (self.postData.function_id[i] == item.manage.id) {
            self.postData.function_id.splice(i, 1)
            return false
          }
        }
        self.postData.function_id.push(item.manage.id.toString())
      },
      brandClick(item){
        this.infoList.brand=item.name;
        this.postData.brand_id=item.pid;
        this.isBrand=!this.isBrand;
      },
      finenessClick(item){
        this.infoList.fineness_id=item.name;
        this.postData.fineness_id=item.pid;
        this.isfineness=!this.isfineness;
      },
      cardClick(item){
        this.infoList.card=item.bank_name+"("+item.cardnum+")";
        this.postData.bankcard_id=item.id;
        this.isCard=!this.isCard;
      },
      sel(item){
        this.infoList.she=item.name;
        this.cityData=item.city;
        this.prov_code=item.code;
        this.isSel=!this.isSel;
        this.infoList.city=""
        this.infoList.qu=""

        this.isfineness=false;
        this.isCard=false;
      },
      isSelClick(){
       this.isSel=!this.isSel;
       this.isCity=false;
       this.isQu=false;
       this.isBrand=false;
        this.isCard=false;
        this.isfineness=false;
      },
      isCityClick(){
        this.isCity=!this.isCity;
        this.isSel=false;
        this.isQu=false;
        this.isBrand=false;
        this.isCard=false;
        this.isfineness=false;
      },
      isQuClick(){
        this.isCity=false;
        this.isSel=false;
        this.isQu=!this.isQu;
        this.isBrand=false;
        this.isCard=false;
        this.isfineness=false;
      },
      isCardClick(){
        this.isCity=false;
        this.isSel=false;
        this.isQu=false;
        this.isBrand=false;
        this.isCard=!this.isCard;
        this.isfineness=false;
      },
      isfinenessClick(){
        this.isCity=false;
        this.isSel=false;
        this.isQu=false;
        this.isBrand=false;
        this.isCard=false;
        this.isfineness=!this.isfineness;
      },
      cityClick(item){
        this.infoList.city=item.name;
        this.qu=item.dist;
        this.city_code=item.code;
        this.isCity=!this.isCity;
        this.infoList.qu=""

        this.isfineness=false;
        this.isCard=false;
      },
      quClick(item){
        this.infoList.qu=item.name;
        this.dist_code=item.code;
        this.isQu=!this.isQu;

        this.isfineness=false;
        this.isCard=false;
      },
      removeImg(index) {
        let key = index - 1
        this.imgData[key] = ''
        switch (index) {
          case 1:
            this.img[key].img = require('@/assets/img/weth/img1.png')
            break;
          case 2:
            this.img[key].img = require('@/assets/img/weth/img2.png')
            break;
          case 3:
            this.img[key].img = require('@/assets/img/weth/img3.png')
            break;
          case 4:
            this.img[key].img = require('@/assets/img/weth/img4.png')
            break;
          case 5:
            this.img[key].img = require('@/assets/img/weth/img5.png')
            break;
          case 6:
            this.img[key].img = require('@/assets/img/weth/img6.png')
            break;
          case 7:
            this.img[key].img = require('@/assets/img/weth/img7.png')
            break;
          case 8:
            this.img[key].img = require('@/assets/img/weth/img8.png')
            break;
          case 9:
            this.img[key].img = require('@/assets/img/weth/img9.png')
            break;
        }
      },
      successImg(res,file,type){
        if (res.errcode == '0') {
          this.img[type].img = URL.createObjectURL(file.raw);
          this.postData.cover = res.fileinfo.fid
          this.imgData[type] = res.fileinfo.fid
        } else {
          this.$message.error(res.errmsg);
        }
      },
      successImg1(res, file) {
       this.successImg(res, file,0)
      },
      successImg2(res, file) {
        this.successImg(res, file,1)
      },
      successImg3(res, file) {
        this.successImg(res, file,2)
      },
      successImg4(res, file) {
        this.successImg(res, file,3)
      },
      successImg5(res, file) {
        this.successImg(res, file,4)
      },
      successImg6(res, file) {
        this.successImg(res, file,5)
      },
      successImg7(res, file) {
        this.successImg(res, file,6)
      },
      successImg8(res, file) {
        this.successImg(res, file,7)
      },
      successImg9(res, file) {
        this.successImg(res, file,8)
      },
      beforeAvatarUpload(file) {
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (file.type == 'image/jpeg' || file.type == 'image/jpg' || file.type == 'image/png' || file.type == 'image/bmp')        {

        }
      },
      imgDel(index){
        this.postData.file_id.splice(index,1)
        this.imgList.splice(index,1)
      },
      open5() {
        if($(".mark").hide()){
          $(".mark").show()
          $(".marks").show()
        }
      },
      close(){
        $(".mark").hide()
        $(".marks").hide()
      },
      sub(){
        let self=this;
        self.postData.file_id=''
        if(!self.infoList.brand){
          this.$message.error("请填写您的腕表品牌");
          return false;
        }
        if(!self.postData.title){
          this.$message.error("请填写您的标题");
          return false;
        }
        if(!self.postData.details){
          this.$message.error("请填写您的描述");
          return false;
        }
        if (!self.imgData[0] || !self.imgData[1] || !self.imgData[2]) {
          this.$message.error("一定要上传前三张照片");
           return false;
        }
        if(!self.isCheck){
          this.$message.error("阅读并同意《在线寄售协议》");
          return false;
        }
        if(!self.infoList.she ||!self.infoList.city ||!self.infoList.qu){
          this.$message.error("请填写您的收货地址");
          return false;
        }

        if(!self.infoList.fineness_id){
          this.$message.error("请选择成色");
          return false;
        } if(!self.infoList.card){
          this.$message.error("请选择银行卡");
          return false;
        }
        if(self.postData.diameter<1){
          this.$message.error("请正确填写表盘直径");
          return false;
        }
        if(!self.postData.diameter){
          this.$message.error("请填写表盘直径");
          return false;
        }
        if(self.postData.original_price<=0){
          this.$message.error("请正确填写原价");
          return false;
        }
        if(!self.postData.original_price){
          this.$message.error("请填写原价");
          return false;
        }
        if(self.postData.price<=0){
          this.$message.error("请正确填写售价");
          return false;
        }
        if(!self.postData.price){
          this.$message.error("请填写售价");
          return false;
        }
        self.imgData=self.imgData
        let postDatas;
        postDatas={
          bankcard_id:self.postData.bankcard_id,
          brand_id:self.postData.brand_id,
          city_code:self.city_code,
          cover:self.postData.cover,
          details:self.postData.details,
          diameter:self.postData.diameter,
          dist_code:self.dist_code,
          file_id:self.imgData,
          fineness_id:self.postData.fineness_id,
          function_id: self.postData.function_id,
          gender:self.postData.gender,
          location:self.infoList.she,
          material_id:self.postData.material_id,
          movement_id:self.postData.movement_id,
          original_price:self.postData.original_price*10000,
          price:self.postData.price*10000,
          prov_code:self.prov_code,
          shape_id:self.postData.shape_id,
          title:self.postData.title,
          gid:self.$route.query.gid || '',
        }
        if(self.$route.query.gid!=undefined){
          self.$http.put(`${process.env.API.MARKET}/market/seller/publish`,postDatas).then(res => {
            if(res.data.errcode=='0'){
              this.$message({
                type: 'success',//success
                message: "提交成功"
              });
              self.$router.push("/login/public")

            }else{
              this.$message.error("发布失败");
            }
          }).catch(err => {
            console.log(err)
          })
          return false
        }
        if(self.$route.query.gid==undefined){
          self.$http.post(`${process.env.API.MARKET}/market/seller/publish`,postDatas).then(res => {
            if(res.data.errcode=='0'){
              this.$message({
                type: 'success',//success
                message: "提交成功"
              });
              self.$router.push("/login/public")
            }else{
              this.$message.error(res.data.errmsg);
            }
          }).catch(err => {
            console.log(err)
          })
          return false
        }
      },
      /**
       *http请求
       */
      httpFn(httpUrl,callbackFn){
        let self=this
        self.$http.get(httpUrl).then(
          callbackFn
        ).catch(err=>{
          console.log(err)
        })
      },
    },
    mounted() {
      window.scrollTo(0,0)
      document.title= '瑞时会-直售'
      let self=this;
      self.httpFn(self.httpUrl.movementUrl,res=>{
        if(res.data.errcode == '0'){
          self.movement=res.data.data
        }
      })
      self.httpFn(self.httpUrl.materialUrl,res=>{
        if(res.data.errcode == '0'){
          self.material=res.data.data
        }
      })
      self.httpFn(self.httpUrl.shapeUrl,res=>{
        self.shape=res.data.data
      })
      self.httpFn(self.httpUrl.functionUrl,res=>{
        self.functionss=res.data.data
      })
      self.httpFn(self.httpUrl.finenessUrl,res=>{
        self.fineness=res.data.data
      })
      self.httpFn(self.httpUrl.infoCityUrl,res=>{
        self.infoCity=res.data
      })
      self.httpFn(self.httpUrl.brandUrl,res=>{
        self.brand = res.data.data
        let arr = []
        for (let value in self.brand) {
          arr[value]={
            name:self.brand[value].name,
            pid:self.brand[value].id
          }
          arr = arr.concat(self.brand[value].name)
        }
        self.brand = arr
      })
      self.httpFn(self.httpUrl.bankcardUrl,res=>{
        if(res.data.errcode=="0"){
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].cardnum = res.data.data[i].cardnum.substring(res.data.data[i].cardnum.length - 4)
          }
          self.yhCard=res.data.data;
        }
      })
      self.httpFn(self.httpUrl.EXCHANGEUrl,res=>{
        if(res.data.errcode=="0") {
          self.contentList=res.data.data
          res.data.data.publish_time = new Date(res.data.data.publish_time * 1000).toLocaleString('zh-cn').replace(/\//g, '-')
        }
      })
    },
  }
</script>
<style lang="less" scoped type="text/less">
  .mark{
    width: 880px;
    max-height: 700px;
    overflow-y: auto;
    padding:30px;
    position: fixed;
    z-index: 9999;
    background: #fff;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin:auto;
    transition:all .4s;
    display: none;
    .close{
      cursor: pointer;
      position: absolute;
      right: 30px;
      top:20px;
    }
    .title{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom: 30px;
      border-bottom: 1px solid #ebebeb;
      p{
        font-size: 18px;
        padding-bottom: 10px;
      }
      span{
        font-size: 14px;
        color: #999;
      }
    }
    .cont{
      font-size: 14px;
      line-height: 36px;
      p{
        padding-bottom: 50px;
      }
    }
  }
  .marks{
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    background: #000;
    opacity: .7;
    position: absolute;
    display: none;
    box-sizing: border-box;
  }
  .Weathpage{
    position: relative;
    background: #fff;
    .wrapShow{
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      margin: auto;
      background: #000;
      opacity: .6;
      z-index: 9999;
    }
    .wrapShowshang{
      position: fixed;
      width: 780px;
      height: 540px;
      top: 50%;
      left: 50%;
      margin-left: -390px;
      margin-top: -270px;
      z-index: 99999;
      padding: 50px 20px 60px 30px;
      box-sizing: border-box;
      background: #fff;
      .head{
        display: flex;
        justify-content: flex-end;
        cursor: pointer;
      }
    }
    .mian{
      box-sizing:border-box;
      max-width: 1200px;
      min-width: 1000px;
      min-height: 500px;
      padding: 50px 40px 60px;
      margin: 0 auto;
      font-size: 14px;
      .title{
        display: flex;
        justify-content: space-between;
        .left{
          font-size: 24px;
          color: #333;
          padding-left: 30px;
        }
        .right{
          cursor: pointer;
          color: #999;
          display: flex;
          justify-content: center;
          align-items: center;
          img{
            padding-right: 5px;
            display: block;
          }
        }
      }
      .info{
        width: 900px;
        margin-top: 7px;
        padding: 0 30px;
        min-width: 600px;
        .inlin{
          display: flex;
          .input{
            flex: .5;
            &:first-child{
              margin-right: 50px;
            }
            .selInputs{
              position: relative;
              &::before{
                content:'';
                position: absolute;
                width: 0;
                height: 0;
                right: 4px;
                bottom: 0;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-bottom: 10px solid #666;
                transform:rotate(135deg);
                z-index: 1;
              }
            }
            input{
              position: relative;
            }
            .selInput{
              input{
                position: relative;
                &::after{
                  content:'';
                  position: absolute;
                  width: 0;
                  height: 0;
                  right: -6px;
                  bottom: -2px;
                  border-left: 10px solid transparent;
                  border-right: 10px solid transparent;
                  border-bottom: 10px solid #666;
                  transform:rotate(135deg);
                  z-index: 100!important;
                }
              }
            }

          }
        }
        .input{
          position: relative;
          padding-top: 25px;
          line-height: 40px;
          display: flex;
          .nones{
            width:15px;
            height: 15px;
            display: block;
            margin-top: 10px;
          }
          .hui{
            color: #999;
          }
          .tab{
            border: none;
            display: flex;
            margin-top: 8px;
            flex-wrap: wrap;
            li{
              cursor: pointer;
              border:1px solid #ccc;
              padding: 0 10px;
              height: 24px;
              line-height: 24px;
              margin-right: 20px;
              margin-bottom: 8px;
              &::after{
                border: none;
              }
            }
            .active{
              color: #eaeaea;
              background: #000;
            }
          }
          textarea{
            width: 100%;
            margin-left: 5px;
          }
          span{
            width: 80px!important;
            font-size: 14px;
            display: inline-block;
          }
          input{
            /*width: calc(~'100% - 80px');*/
            width: 341px;
            margin-right: 10px;
            height: 40px;
            display: block;
            box-sizing: border-box;
            border:1px solid #ccc;
            padding: 0 10px;
          }
          ul{
            flex: 1;
            height: 40px;
            box-sizing: border-box;
            border:1px solid #ccc;
            margin-right: 25px;
            &:last-child{
              margin-right: 0;
            }
            li{
              transition: all .4s;
              padding: 0 10px;
              position: relative;
              &::after{
                content:'';
                position: absolute;
                width: 0;
                height: 0;
                right: -6px;
                bottom: -2px;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-bottom: 10px solid #666;
                transform:rotate(135deg);
              }
              input{
                border: none;
                height: 38px;
                width: 100%;
                padding-right: 10px;
                box-sizing: border-box;
                cursor: pointer;
              }
              .select{
                position: absolute;
                min-height: 10px;
                border: 1px solid #ccc;
                border-top: none;
                left: -1px;
                right: -1px;
                box-sizing: border-box;
                max-height: 300px;
                overflow-y: auto;
                top: 39px;
                z-index: 9;
                p{
                  transition: all .4s;
                  line-height: 28px;
                  color: #333;
                  font-size: 14px;
                  padding: 0 10px;
                  cursor: pointer;
                  background: #f5f5f5;
                  &:hover{
                    background-color: #333;
                    font-size: 16px;
                    color: #ebebeb;
                  }
                }
              }
            }
          }
          .checkboxMore{
            position: absolute;
            left: 5px;
            top:42px;
            color: #999;
          }
        }
        .inputPos{
          position: relative;
          cursor: pointer;
          .zinx{
           &:after{
             z-index: 100;
           }
          }
          .select{
            position: absolute;
            left: 80px!important;
            top: 64px;
            right: 10px;
            max-height: 300px;
            overflow-y: auto;
            z-index: 100;
            background: #fff;
            border: 1px solid #ccc;
            p{
              background-color: #f5f5f5;
              transition: all .4s;
              line-height: 28px;
              color: #333;
              font-size: 14px;
              padding: 0 10px;
              cursor: pointer;
              &:hover{
                background-color: #333;
                font-size: 16px;
                color: #ebebeb;
              }
            }
          }
        }
        .button{
          padding: 60px 0 0 85px;
          button{
            background: #333;
            width: 220px;
            height: 40px;
            color: #fafafa;
            font-size: 14px;
            border:none;
            cursor: pointer;
          }
        }
        .titPost{
          span{
            font-size: 16px;
            color: #ccc;
          }
        }
        .payList{
          margin-left: 80px;
          ul{
            display: flex;
            flex-wrap: wrap;
            li{
              width: 160px;
              height: 160px;
              position: relative;
              margin-top: 30px;
              margin-right: 30px;
              .avatar-uploader{
                width: 100%;
                height: 100%;

                img{
                  width: 160px;
                  height: 160px;
                }
              }
              img{
                width: 100%;
                height: 160px!important;
                object-fit: cover;
              }
              span{
                position: absolute;
                right: -7px;
                top: -7px;
                border-radius: 50%;
                img{
                  width: 26px!important;
                  height: 26px!important;
                }
              }
            }
          }
        }
        .fileBuy{
          height: 50px;
          background: #ffefef;
          line-height: 50px;
          padding: 0 10px;
          color: #695f5e;
          overflow: hidden;
          span{
            color: #c8162e;
          }
        }
      }
    }
  }
</style>
