import axios from 'axios'
import wx from './wechat/wechat-param'
import router from '../router'
import {ToastPlugin } from 'vux'
import Vue from 'vue'
import wxLogin from './wechat/wechat-login'
import wxData from './wechat/wechat-param'
import {Toast} from 'mint-ui';
Vue.prototype.$Toast = Toast;

// Vue.prototype.$vux = ToastPlugin;


let upBaseUrl = '';
if (process.env.NODE_ENV === 'production') {
//线上
    // upBaseUrl = 'https://ywapi.junrunrenli.com/';
    upBaseUrl = 'http://preywapi.fenganghr.com/';


}
if (process.env.NODE_ENV === 'development') {
//测试
    upBaseUrl = 'http://preywapi.fenganghr.com/';
    // upBaseUrl  =  'http://192.168.43.173:9095/';
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
            // "Authorization":'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ6aG9uZ3poaXBpbmciLCJjcmVhdGVkIjoxNTc3OTcxNDc4Mzc2LCJleHAiOjQyMzUxNzc5NzE0Nzh9.yoBtJtph-bKnNy2n6aVRSKE6BIxdLiAMRRM5hiMoy5W6Cx8d2l4sZZC1hO1OxYrGy-MHpHzjc26K6wtjfTrQkQ',
            "backend":'front'
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
instance.interceptors.response.use(function (response) {
  console.log(response,'response0000');
  if(response.data.code==401){
      localStorage.clear();
      setTimeout(()=>{
        let thePath = window.location.hash;
        thePath = thePath.split("/")[1];
        let url = wxData.redirectUrl + (thePath?thePath:'');
        console.log(window.location,'rerul');
        localStorage.setItem('href',window.location.href)
        window.location.href= `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxData.appId}&redirect_uri=${url}&response_type=code&scope=snsapi_privateinfo&agentid=${wxData.agentid}&state=STATE#wechat_redirect`;
      },200)
    }else if (response.data.code==404){
      console.log(response,'response00009')
      Toast('您暂无权限访问，请联系管理员开通');
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
