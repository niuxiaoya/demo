<template>
  <div class="People">
    <Top></Top>
    <!-- :num="0" -->
    <Navs ></Navs>
    <div class="mainBox">
      <div class="left">
        <navList :nums="6"></navList>
      </div>
      <div class="right">
        <div class="title">
          地址管理
        </div>
        <div class="maps">
          <ul class="map">
            <li v-for="(item,index) in dataInfo" :class="{'active':default_active==index}" >
              <p>
                <span class="mapName">{{item.receiver}}</span>
                <span class="telNomol">{{item.receiver_tel}}</span>
                <button v-if="default_active==index">默认地址</button>
                <!--<img src="" alt="">-->
              </p>
              <p>{{item.address}}</p>
              <div>
                <span @click="radioShow(item,index)">设为默认</span>
                <span @click.stop="bianji(item)">编辑</span>
                <span @click.stop="delShow(item,index)">
                  删除
                </span>
              </div>
            </li>
          </ul>
          <div class="add"  @click="$router.push('/login/addMap')">
            添加地址
          </div>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>
<script type="javascript">
  export default {
    data(){
      return {
        dataList:'',
        dataInfo:'',
        default_active:0,
      }
    },
    mounted() {
      document.title= '瑞时会-地址管理'
      let self=this;
      self.$http.get(`${process.env.API.USER}/user/address`).then(res=>{
        if(res.data.data.length>0){
          self.dataInfo=res.data.data
        }
      }).catch(()=>{

      })
    },
    methods:{
      bianji(item){
        this.$router.push({name:'AddMap',params:item})

      },
      //改变默认地址
      radioShow(item,index){
        let self = this
        if( self.default_active!=index){
          self.$http.put(`${process.env.API.USER}/user/address`,{id:item.id,is_default:1}).then(res => {
            if(res.data.errcode=='0'){
              self.default_active=index;
            }else{

            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      //删除地址
      delShow(item,index){
        let self = this
        self.$http.delete(`${process.env.API.USER}/user/address`,{
          params: {
            id:item.id
          }
        }).then(res => {
          if(parseInt(res.data.errcode)===0){
            self.default_active=0;
            self.dataInfo.splice(index, 1)
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          }else{
            this.$message({
              message: '删除失败',
              type: 'warning'
            });
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
  }
</script>
<style lang="less" scoped type="text/less">
  .People{
    .mainBox{
      .right{
        .maps{
          border-bottom: 1px solid #e6e6e6;
          .map{
            display: flex;
            flex-wrap: wrap;
            li{
              cursor: pointer;
              position: relative;
              width: 290px;
              margin-right: 30px;
              max-width: 340px;
              height: 134px;
              border: solid 1px #cccccc;
              margin-top: 30px;
              padding: 0 20px;
              box-sizing: border-box;
              transition: all .4s;
              p{
                .mapName{
                  width: 64px;
                  overflow: hidden;
                  display: inline-flex;
                  height: 20px;
                }
                &:nth-child(2){
                  overflow : hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                  height: 40px;

                }
                padding-top: 15px;
                button{
                  width: 64px;
                  height: 17px;
                  background-color: #e9bf76;
                  color: #ffffff;
                  border: none;
                  font-size: 14px;
                  margin-left: 5px;
                }
                span{
                  position: relative;
                  img{
                    position: absolute;
                    display: inline-block;
                    top: 5px;
                  }
                }
                &:first-child{
                  font-weight: bold;
                  .telNomol{
                    font-weight: normal;
                    left: 5px;
                  }
                }
              }
              div{
                bottom:10px;
                position: absolute;
                right: 30px;
                display: none;
                font-size: 14px;
                color: #666;
                z-index: 10;
                span{
                  padding-left: 10px;
                }
              }
              &:hover{
                background: #fafafa;
                div{
                  display: block;
                }
              }
            }
            .active{
              &:after{
                position: absolute;
                content:"";
                left: 0;
                right: 0;
                bottom: 0;
                top: 0;
                /*background: url("../../assets/img/login/border.png") no-repeat;*/
                background-size: 100% 100%;
              }
            }
          }
          .add{
            width: 151px;
            height: 40px;
            border: solid 1px #cccccc;
            margin-top: 28px;
            margin-bottom: 60px;
            text-align: center;
            line-height: 40px;
            box-sizing: border-box;
            cursor: pointer;
            transition: all .4s;
            &:hover{
              background: #333;
              color: #ebebeb;
            }
          }
        }
      }
    }
  }
</style>
<style type="text/less" lang="less">

</style>
