<template>
  <div class="addMap">
    <Top></Top>
    <!-- :num="0" -->
    <Navs ></Navs>
    <div class="mian">
      <div class="left">
        <navList :nums="6"></navList>
      </div>
      <div class="right">
        <div class="title">
          地址管理
        </div>
        <div class="info">
          <div class="inlin">
            <div class="input">
              <span>收货人 </span>
              <input type="name" v-model="infoList.name" placeholder="您的姓名">
            </div>
            <div class="input">
              <span>手机号 </span>
              <input type="name" v-model="infoList.tel" placeholder="您的电话">
            </div>
          </div>
          <div class="input">
            <span>收货地址</span>
            <ul>
              <li>
                <input type="text" v-model="infoList.she" placeholder="省/直辖市" @click="isSel=!isSel">
                <div class="select" v-if="isSel">
                  <p v-for="item in infoCity" @click="sel(item)">
                    {{item.name}}
                  </p>
                </div>
              </li>
            </ul>
            <ul>
              <li>
                <input type="text" v-model="infoList.city" placeholder="城市" @click="isCity=!isCity">
                <div class="select" v-if="isCity">
                  <p v-for="item in cityData" @click="cityClick(item)">{{item.name}}</p>
                </div>
              </li>
            </ul>
            <ul>
              <li>
                <input type="text" v-model="infoList.qu" placeholder="区/县" @click="isQu=!isQu">
                <div class="select" v-if="isQu">
                  <p v-for="item in qu" @click="quClick(item)">{{item.name}}</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="input">
            <span>详细地址 </span>
            <input type="name" v-model="infoList.map" placeholder="请输入详细的地址信息（街道、楼牌号等）">
          </div>
          <div class="checks">
            <input type="checkbox" name="" id="" v-model="isCheck">设为默认
            <!-- <el-button type="text">点击打开 Message Box</el-button> -->
          </div>
          <div class="button">
            <button @click="sub">提交</button>
          </div>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>
<script type="javascript">
  import Top from '@/components/top'
  import Navs from '@/components/nav'
  import navList from '@/components/navList'
  import Foot from '@/components/foot'
  export default {
    data(){
      return {
        dataList:"",
        dataInfos:'',
        infoList:{
          city:'',
          she:'',
          qu:'',
          name:'',
          tel:'',
          map:'',
        },
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
        isCheck:true,
      }
    },
    mounted() {
      let self=this;
      self.$http.get(`${process.env.API.DICT}/dict/area`,{params:{
        kind:'all',
        nonce:0.9064637705159901
      }}).then(res=>{
        if(res.data.length!=0) {
          self.infoCity=res.data

        }
      }).catch(() => {

      })

    },
    methods:{
      sub(){
        let reg = /^1(3|4|5|7|8)\d{9}$/
        let self=this;
        if(!self.infoList.name){
          this.$message.error('请填写您的姓名');
          return false;
        }
        if(!self.infoList.tel){
          this.$message.error("请填写您的电话");
          return false;
        }
        if (!reg.test(self.infoList.tel)) {
          this.$message.error("请正确填写您的电话");
          return false
        }
        if(!self.infoList.she ||!self.infoList.city ||!self.infoList.qu){
          this.$message.error("请填写您的收货地址");
          return false;
        }
        if(!self.infoList.map){
          this.$message.error("请填写您的详细地址");
          return false;
        }
//        if(!self.isCheck){
//          this.$message.error("请设为默认");
//          return false;
//        }
        self.$http.post(`${process.env.API.USER}/user/address`,{
          address: self.infoList.map,
          city_code: self.city_code,
          dist_code: self.dist_code,
          prov_code: self.prov_code,
          is_default:1,
          receiver: self.infoList.name,
          receiver_tel: self.infoList.tel
        }).then(res => {
          if(res.data.errcode=='0'){
            this.$message({
              type: 'success',//success
              message: "提交成功"
            });
            window.history.back(-1);

          }else{
            this.$message({
              message: '提交失败',
              type: 'warning'
            });
          }
        }).catch(err => {
          console.log(err)
        })
      },
      sel(item){
        this.infoList.she=item.name;
        this.cityData=item.city;
        this.prov_code=item.code;
        this.isSel=!this.isSel;
        this.infoList.city=""
        this.infoList.qu=""
      },
      cityClick(item){
        this.infoList.city=item.name;
        this.qu=item.dist;
        this.city_code=item.code;
        this.isCity=!this.isCity;
        this.infoList.qu=""
      },
      quClick(item){
        this.infoList.qu=item.name;
        this.dist_code=item.code;
        this.isQu=!this.isQu;
      }
    },
    created(){
      let arr=[]
      if(this.$route.params.city_name){
        arr=this.$route.params.city_name.split("/")
        this.infoList.name= this.$route.params.receiver
        this.infoList.tel= this.$route.params.receiver_tel
        this.infoList.she= arr[0]
        this.infoList.city= arr[1]
        this.infoList.qu=arr[2]
        this.infoList.map= this.$route.params.address
      }
    },
    components: {
      Top,  //头部
      Navs, //导航
      navList,
      Foot  //公共底部
    },
  }
</script>
<style lang="less" scoped type="text/less">
  .addMap{
    .mian{
      box-sizing:border-box;
      max-width: 1200px;
      min-width: 1000px;
      padding: 0 10px;
      margin: 0 auto;
      box-sizing: border-box;
      background: #fff;
      min-height: 690px;
      display: flex;
      .left{
        width: 200px;
        padding-top: 55px;
        border-right: 1px solid #f5f5f5;
      }
      .right{
        padding: 60px;
        box-sizing:border-box;
        .title{
          color: #333;
          font-size: 24px;
        }
        .info{
          margin-top: 7px;
          padding: 0 30px;
          .inlin{
            display: flex;
            .input{
              flex: 1;
              &:first-child{
                margin-right: 50px;
              }
            }
          }
          .input{
            padding-top: 25px;
            line-height: 40px;
            display: flex;
            span{
              width: 80px!important;
              font-size: 14px;
              display: inline-block;
            }
            input{
              width: calc(~'100% - 80px');
              height: 40px;
              display: block;
              box-sizing: border-box;
              border:1px solid #ccc;
              padding: 0 10px;
              /*color: #ccc;*/
            }
            textarea{
              width: 340px;
              height: 160px;
              border-color: #ccc;
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
                  background-color: #f5f5f5;
                  box-sizing: border-box;
                  max-height: 300px;
                  overflow-y: auto;
                  top: 39px;
                  p{
                    line-height: 28px;
                    color: #333;
                    font-size: 14px;
                    padding: 0 10px;
                    cursor: pointer;
                    transition: all .4s;
                    &:hover{
                      background-color: #333;
                      font-size: 16px;
                      color: #ebebeb;
                    }
                  }
                }
              }
            }
          }
          .checks{
            margin-top: 33px;
            font-size: 12px;
            color: #999;
            padding-left: 75px;
            span{
              color: #333;
              cursor: pointer;
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
        }
      }
    }
  }
</style>
<style type="text/less" lang="less">

</style>
