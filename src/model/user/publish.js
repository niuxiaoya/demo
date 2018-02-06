import Base from '@/model/base'

/** 我的发布 */
class Publish extends Base{
  constructor(data) {
    data = !!data ? data : {}

    super(data)
    this.api_get = `${process.env.API.MARKET}/market/seller/mylist`
    this.current_model = Publish

    this.title = data.title || ''
    this.details = data.details || ''
    this.price = data.price || ''
    this.create_time = data.create_time || ''
    this.cover_pic = data.cover_pic || ''
    this.exchange_stage_name = data.exchange_stage_name || ''
    this.remark = data.remark || ''
    this.gid = data.gid || ''
  }

  /** get 请求参数 */
  setGetParam() {
    return {
      type: 'goods'
    }
  }

  getList(obj) {
    //  to do

    super.getList(obj)
  }
}

export default Publish
