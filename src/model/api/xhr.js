import axios from '@/plugin/axios'
import Vue from 'vue'
/**
 * 请求类
 * */
class xhr {
  constructor (data) { //属性
    data = !!data ? data : {}
    data.request = data.request || {}
    this.request = {
      headers: data.request.headers || {},
      data: data.request.data || {},
      params: data.request.params || {},
      method: data.request.method || 'get',
      url: data.request.url || ''
    }

    this.errorcode = {
      0: 'success',
      40023: '账号在其他地方登陆',
      40021: '对不起，您没有权限进行此操作'
    }
  }


  /**
   * 请求
   * 方法
   * */
  httpRequest() {
    let that = this
     axios({
       methods: that.request.method,
       url: that.request.url,
       data: that.request.data,
       params: that.request.params
     }).then(res => {
       if(parseInt(res.data.errcode) === 0) {
         that.httpSuccess(res)
       }else {
         /**  检查错误返回码 */
         that.checkErrorCode(parseInt(res.data.errcode))
         /** 错误提示*/
         that.httpError({
           msg: that.errcode[parseInt(res.data.errcode)] || '请求失败'
         })
       }
     }).catch(res => {
       that.httpError({
         msg: '网络错误'
       })
     })
  }

  /**
   * 请求成功
   * */
  httpSuccess(){}

  /**
   * 请求失败
   * */
  httpError(res) {
    new Vue().$message.error(res.msg || '请求失败')
  }


  /**  检查错误返回码 */
  checkErrorCode(code) {
    switch(code) {
      case 40004:
      case 40023:   //  账号在其他地方登录
    //    localStorage.removeItem('Authorization')
    //    window.location.href = `${process.env.URL.USER}/#/login`
        break
      case 40021:   //  对不起，您没有权限进行此操作
        new Vue().$message.error(this.errcode[code])
        break
      default: break
    }
  }
}

export default xhr
