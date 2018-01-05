<script src="../../../../vue-wanba/src/store/store.js"></script>
<template>
  <div class="myBank">
    <Top></Top>
    <!-- :num="0" -->
    <Navs ></Navs>
    <div class="mainBox">
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
            <p>{{item.cardnum |filterFn }}</p>
            <!--| filterFn-->
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
  export default {
    data(){
      return {
        dataList:"",
        dataInfo:'',
      }
    },
    mounted() {
      document.title= '瑞时会-银行管理'
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
    filters:{
      filterFn(val){
        return  val=val.substring(0,3)+" "+val.substring(3,6) +"******"+val.substr(-3)
//
      }
    },
  }
</script>
<style lang="less" type="text/less" scoped>
  .myBank{
    .mainBox{
      .right{
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
