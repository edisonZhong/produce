import axios from 'axios'
import wx from './wechat/wechat-param'
import router from '../router'
import {ToastPlugin } from 'vux'
import Vue from 'vue'


Vue.prototype.$vux = ToastPlugin;


let upBaseUrl = '';
if (process.env.NODE_ENV === 'production') {
//线上
    upBaseUrl = 'http://park.yipage.cn/api/v2/';
}
if (process.env.NODE_ENV === 'development') {
//测试
    upBaseUrl = 'http://192.168.43.173:9095/ClientMember/';
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
            "authorization":localStorage.getItem('park_token')||''
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
instance.interceptors.response.use(function (response) {
	return response
}, function (error) {
    // Do something with response error
    // console.log(error.response.status)
    if(error.response.status==401){
        localStorage.clear();
        //账号密码登陆
        // router.replace({
        //     path: '/signin',
        //     query: {redirect: router.currentRoute.fullPath}
        // })
        //微信的授权登陆
        document.location.href= `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wx.appId}&redirect_uri=${wx.redirectUrl}&response_type=code&scope=${wx.loginStyle}&state=${wx.param}#wechat_redirect`;
    }

    if(error.response.status==404){
        console.log(error.response.data.error)
        Vue.$vux.toast.show({
            text: error.response.data.error,
            type:'text'
        })
        return Promise.reject(error.response.data.error)

    }
	return Promise.reject(error)
})

export  {
    instance,
    upBaseUrl
}
