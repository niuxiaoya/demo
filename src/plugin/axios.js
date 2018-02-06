import axios from 'axios'
import SHA1 from '@/plugin/sha1'

let service = axios.create({
  headers: {
    // withCredentials: true
  }
})
service.defaults.timeout=10000;
const AppId = 'swisstimevip';
const AppSecret = '469d8b353e271ea4750793fb656cc331d8fd6bc1';
let ClientType = 3;
let ClientId;
let AppDigest;
let TokenHeaders;
AppDigest = SHA1(AppId + AppSecret);
ClientId = SHA1(new Date().getTime() + Math.floor(Math.random() * 9999));

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers['Accept-Language']="zh-cn"
  if (localStorage.getItem('Authorization')) {
    config.headers['Authorization'] = localStorage.getItem('Authorization')
  } else {
    config.headers['RequestToken'] = AppDigest
    config.headers['ClientId'] = ClientId
  }
  config.headers['ClientType'] = 5
 // config.headers['is_pc'] = 1
  // if(config.url.indexOf('?')==-1){
  //   config.url=config.url+`?is_pc=1`
  // }else if(config.url.indexOf('?')){
  //   config.url=config.url+`&is_pc=1`
  // }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// axios.interceptors.request.use(function (config) {    // 这里的config包含每次请求的内容
//   if (store.getters.getToken) {
//     config.headers.is_pc = 1;
//   }
//   return config;
// }, function (err) {
//   return Promise.reject(err);
// })


// 添加响应拦截器
service.interceptors.response.use(function (response) {
  if (response.data.errcode == '40004' || response.data.errcode == '40023') {
  localStorage.removeItem('Authorization')
   window.location.href = `${process.env.URL.USER}/#/login`
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default service
