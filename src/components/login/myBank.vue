<template>
  <div class="myBank">
    <Top></Top>
    <!-- :num="0" -->
    <Navs ></Navs>
    <div class="mian">
      <div class="left">
        <navList :nums="5"></navList>
      </div>
      <div class="right">
        <div class="title">
          我的银行卡
        </div>
        <ul class="card">
          <li v-for="item,index in dataInfo">
            <p>{{item.bank_name}}</p>
            <p>{{item.cardnum}}</p>
            <div><span>{{item.cardholder}}</span><span class="show"><b @click="bianji(item)">编辑</b>
              <b @click="delet(item,index)">
                删除
              </b>
            </span></div>
          </li>
          <li class="last" @click="$router.push('/login/addBank')">
            <span>
              <img src="../../assets/img/addBank.png" alt="">
            </span>
          </li>
        </ul>
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
        dataInfo:''
      }
    },
    mounted() {
      let self =this;
      self.$http.get(`${process.env.API.USER}/user/bankcard`).then(res=>{
        if(res.data.data.length>0){
          self.dataInfo=res.data.data;
//          console.log(self.dataInfo)
        }
      }).catch(()=>{

      })
    },
    methods:{
      bianji(item){
        this.$router.push({name:'AddBank',params:item})
      },
      /**
       * 删除银行卡
       */
      delet(item,index) {
        let self = this;
        self.$http.delete(`${process.env.API.USER}/user/bankcard?id=${item.id}`).then(res=>{
          if(res.data.errcode=='0') {
            this.$message({
              type: 'success',//success
              message: "提交成功"
            });
            self.dataInfo.splice(index, 1)
          }
        }).catch(err=>{
          this.$message.error("删除失败");
        })
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
  .myBank{
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
        box-sizing: border-box;
      }
      .right{
        padding: 60px;
        box-sizing:border-box;
        width: 100%;
        .title{
          color: #333;
          font-size: 24px;
        }
        .card{
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          font-size: 14px;
          width: 100%;
          margin-top: 30px;
          li{
            cursor: pointer;
            height: 124px;
            width: calc(~'25% - 30px');
            min-width: 180px;
            margin: 0 15px;
            border:1px solid #e6e6e6;
            border-radius: 5px;
            padding:0 10px;
            box-sizing: border-box;
            margin-bottom: 30px;
            p{
              line-height: 34px;
              color: #333333;
              &:last-child{
                line-height: 50px;
              }
            }
            div{
              padding-top: 20px;
              display: flex;
              justify-content: space-between;
             span{
                b{
                  font-weight: normal;
                  padding-left: 10px;
                  cursor: pointer;
                }
             }
              .show{
                display: none;
              }
            }
            &:hover{
              background: #f1f1f1;
              .show{
                display: block;
              }
            }
          }
          .last{
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background-size: cover;
            border: none;
            display: block;
            &:hover{
              background: none;
            }
            img{
              width: 100%;
              height:100%;
            }
          }
        }
      }
    }
  }
</style>
<style type="text/less" lang="less">

</style>
