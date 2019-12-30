import axios from 'axios'
import wx from './wechat/wechat-param'
import router from '../router'
import {ToastPlugin } from 'vux'
import Vue from 'vue'
import wxLogin from './wechat/wechat-login'
import wxData from './wechat/wechat-param'


Vue.prototype.$vux = ToastPlugin;


let upBaseUrl = '';
if (process.env.NODE_ENV === 'production') {
//线上
    // upBaseUrl = 'http://wbapi.fenganghr.com/';
    upBaseUrl = 'http://preywapi.fenganghr.com/';

}
if (process.env.NODE_ENV === 'development') {
//测试
    upBaseUrl = 'http://preywapi.fenganghr.com/';
    // upBaseUrl  =  'http://192.168.0.16:9095/';
    // upBaseUrl = 'http://wbapi.fenganghr.com/';

}
const instance = axios.create({
    // 测试环境
    baseURL: upBaseUrl,
     // 开发环境
    // baseURL: '',
    timeout: 20000,
    headers:{
      // "Content-Type":'application/x-www-form-urlencoded; charset=utf-8',
      "Content-Type":'application/json',
    },

})
instance.interceptors.request.use(

    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token
        config.headers = {
            "Authorization":localStorage.getItem('token')||'',
            // "Authorization":'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ6aG9uZ3poaXBpbmciLCJjcmVhdGVkIjoxNTc3Njk5NTQ2Mjg4LCJleHAiOjQyMzUxNzc2OTk1NDZ9.27qQJ2LpJFTe7JjLUGmQvMNjMltxtI3G91Qy5kSZ5PSJSou-lPHP6pHE1Bf0M1Gq5FY2SspNMpxcE-2g0oqG9w',
            "backend":'front'
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
// http://ywh5.fenganghr.com?pathName=indexnew&gettime=12
);
instance.interceptors.response.use(function (response) {
  // console.log(response,'response0000');
  if(response.data.code==401){
      console.log(response.data.code,wxData,'if401');
      localStorage.clear();
      setTimeout(()=>{
        // window.location.reload();
        // wxLogin(wxData);

        let thePath = window.location.hash;
        thePath = thePath.split("/")[1];
        let url = wxData.redirectUrl + (thePath?thePath:'');
        // http://ywh5.fenganghr.com&response_type=code
        console.log(url,'wxxxxxxx');
        window.location.href= `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxData.appId}&redirect_uri=${url}&response_type=code&scope=snsapi_privateinfo&agentid=1000004&state=STATE#wechat_redirect`;
        // router.go(0)

      },200)
      //账号密码登陆
      // router.replace({
      //     path: '/signin',
      //     query: {redirect: router.currentRoute.fullPath}
      // })
      //微信的授权登陆
      // document.location.href= `https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww88ca933444ce3492&redirect_uri=http://ywh5.fenganghr.com&response_type=code&scope=snsapi_privateinfo&agentid=1000004&state=STATE#wechat_redirect`;
  }else if (response.data.code==404){
      console.log(error.response.message)
      Vue.$vux.toast.show({
          text: error.response.message,
          type:'text'
      })
      return Promise.reject(error.response.message)

  }else{
    return response

  }
}, function (error) {
    // Do something with response error
    console.log(error,'000000000000009')



	// return Promise.reject(error)

})

export  {
    instance,
    upBaseUrl
}
