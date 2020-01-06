import {getToken} from "../../server/report";

function checkLogin(wx) {
  return new Promise((resolve, reject) => {

    if (!localStorage.getItem('token')) {
        let url = window.location.href;

        console.log(url,'url');
        // 微信code
        if (url.indexOf('code') >= 0) {
            var a = url.split("?")[1];
            var b = a.split('&')[0];
            var aCode = b.split('=')[1];
        } else {
            var aCode = '';
        }
        // 手机号码
        // if (url.indexOf('code') >= 0) {
        //     var a = url.split("?")[1];
        //     var b = a.split('&')[0];
        //     var aCode = b.split('=')[1];
        // } else {
        //     var aCode = '';
        // }

        if (aCode) {
            //获取token操作
          console.log(aCode,'code');
          // return false
          // return
          getToken({
            code:aCode
          }).then(e=>{
            console.log(e,'gettoken-');
             if(e.data.code==200){
               window.localStorage.setItem('token',e.data.data.token)
               resolve()
             }else{
               resolve()
               let thePath = window.location.hash;
               thePath = thePath.split("/")[1];
               let url = wx.redirectUrl + (thePath?thePath:'');
               // http://ywh5.fenganghr.com&response_type=code
               console.log(url,'wxxxxxxx');
               document.location.href= `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wx.appId}&redirect_uri=${url}&response_type=code&scope=snsapi_privateinfo&agentid=${wx.agentid}&state=STATE#wechat_redirect`;
             }
          })

        } else {

          resolve()

          let thePath = window.location.hash;
          thePath = thePath.split("/")[1];
          let url = wx.redirectUrl + (thePath?thePath:'');
          console.log(url,'wxxxxxxx1');

          // http://ywh5.fenganghr.com&response_type=code
          document.location.href= `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wx.appId}&redirect_uri=${url}&response_type=code&scope=snsapi_privateinfo&agentid=${wx.agentid}&state=STATE#wechat_redirect`;
            //document.location.href= `https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww88ca933444ce3492&redirect_uri=${wx.redirectUrl}&response_type=code&scope=${wx.loginStyle}&state=${wx.param}&agentid=${wx.agentid}#wechat_redirect`;
        }
    }else{
      console.log('has token test test');
      resolve();
    }
  })
}
export default checkLogin
