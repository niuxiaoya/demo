import XHR from '@/model/api/xhr'

/** 基类  */
class Base {
  constructor (data) {
    data = !!data ? data : {}

    this.api_get = data.api_get || ''     //  获取列表接口地址
    this.datalists = {
      data: [],        ///  get  获取到的数据列表
      page: 1,         //   列表总页数
      current: 1,      //   当前第几页
      totals: 0,        //   列表总条数
      loading: false    //  加载数据提示
    }

    this.current_model = data.current_model || ''     // 当前类

    this.httpXHR = XHR
  }


  /**
   * 发出get请求时要传的字段
   * */
  setGetParam() {
    return {}
  }

  /**
   * 获取列表方法
   * */
  getList (obj) {
    obj = !!obj ? obj : {}
    let that = this
    let xhr = new XHR()

    that.datalists.data = []
    that.datalists.loading = true

    xhr.request.method = 'get'
    xhr.request.url = this.api_get || ''
    xhr.request.params = this.setGetParam()

    let current = obj.p || xhr.request.params.p || that.datalists.current || 1
    let rows = obj.rows || xhr.request.params.rows || 10
    xhr.request.params.p = current
    xhr.request.params.rows = rows

    /**  请求成功  */
    xhr.httpSuccess = res => {
      console.log(res)
      let res_data = res.data.data
      let totals = res.data && res.data.page && res.data.page.total_count ? res.data.page.total_count : 0  //  总条数
      let page = Math.ceil(totals / rows)    //  总共多少页
      let list = []
      for(let k in res_data) {
        list.push(new that.current_model(res_data[k]))   //  将获取到的每条数据实例化为一个对象
      }

      if(obj.callback) {
        obj.callback({
          data: list,
          totals: totals,
          page: page
        })
      }else {   //  不需要回调，默认处理方式
        that.datalists.data = list
        that.datalists.page = page
        that.datalists.current = current
        that.datalists.totals = totals
      }

      that.datalists.loading = false
    }

    /**  请求失败  */
    xhr.httpError = res => {
      that.datalists.data = []
      that.datalists.page = 0
      that.datalists.current = 1
      that.datalists.totals = 0

      that.datalists.loading = false
    }

    xhr.httpRequest()
  }
}

export default Base
