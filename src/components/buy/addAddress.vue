<template>
  <div class="Purchase">
    <Navs :num="1"></Navs>
    <div class="mian">
        <div class="title">
          添加地址
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
        <div class="button">
          <button @click="sub">提交</button>
        </div>
      </div>

    </div>
  </div>
</template>
<script type="javascript">
  export default {
    data(){
      return {
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
        isQu:false
      }
    },
    created(){
      let arr=[]
      if(this.$route.params.address!=undefined){
        arr=this.$route.params.city_name.split("/")
        this.infoList.name= this.$route.params.receiver
        this.infoList.tel= this.$route.params.receiver_tel
        this.infoList.she= arr[0]
        this.infoList.city= arr[1]
        this.infoList.qu=arr[2]
        this.infoList.map= this.$route.params.address

        this.city_code=this.$route.params.city_code
        this.dist_code=this.$route.params.dist_code
        this.prov_code=this.$route.params.prov_code
      }
    },
    methods:{
      radioClick(){

      },
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
        if(!self.infoList.she){
          this.$message.error("请填写您的收货地址");
          return false;
        }
        if(self.infoList.she){
          if(self.infoList.she=='香港特别行政区' || self.infoList.she=='澳门特别行政区' || self.infoList.she=='台湾省'){
            self.dist_code=''
            self.city_code=''
          }else if(!self.infoList.city ||!self.infoList.qu){
            this.$message.error("请填写您的收货地址");
            return false;
          }
        }

        if(!self.infoList.map){
          this.$message.error("请填写您的详细地址");
          return false;
        }
        if(this.$route.params.address!=undefined){
          self.$http.put(`${process.env.API.USER}/user/address`,{
            address: self.infoList.map,
            city_code: self.city_code,
            dist_code: self.dist_code,
            prov_code: self.prov_code,
            is_default:1,
            receiver: self.infoList.name,
            receiver_tel: self.infoList.tel,
            id:this.$route.params.id
          }).then(res => {
            if(res.data.errcode=='0'){
              this.$message({
                type: 'success',//success
                message: "提交成功"
              });
              setTimeout(()=>{
                window.history.back(-1);
              },1000)

            }else{
              //self.$messagebox.alert(res.data.errmsg)
            }
          }).catch(err => {
            console.log(err)
          })
        }else{
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
              setTimeout(()=>{
                window.history.back(-1);
              },1000)

            }else{
              //self.$messagebox.alert(res.data.errmsg)
            }
          }).catch(err => {
            console.log(err)
          })
        }

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
    mounted() {
      document.title= '瑞时会-直买'
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
  }
</script>
<style lang="less" scoped type="text/less">
  .Purchase{
    .mian{
      box-sizing:border-box;
      max-width: 1200px;
      min-width: 1000px;
      padding: 60px 10px 95px;
      margin: 0 auto;
      background: #fff;
      .title{
        font-size: 24px;
        color: #333;
        padding-left: 30px;
        padding-right: 30px;
      }
      .titles{
        padding-top:60px;
      }
      .info{
        width: 900px;
        margin-top: 7px;
        padding: 0 30px;
        min-width: 600px;
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
</style>
<style type="text/less" lang="less">
.Purchase{

}
</style>
