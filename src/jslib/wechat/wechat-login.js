import {getToken} from "../../server/report";

function checkLogin(wx) {
    if (!localStorage.getItem('token')) {
        let url = window.location.href;
        if (url.indexOf('code') >= 0) {
            var a = url.split("?")[1];
            var b = a.split('&')[0];
            var aCode = b.split('=')[1];
        } else {
            var aCode = '';
        }

        if (aCode) {
            //获取token操作
          console.log(aCode);
          getToken({
            code:aCode
          }).then(e=>{
             if(e.data.code==200){
               window.localStorage.setItem('token',e.data.data.token)
             }else{
               let thePath = window.location.hash;
               thePath = thePath.split("/")[1];
               let url = wx.redirectUrl + (thePath?thePath:'');
               // http://ywh5.fenganghr.com&response_type=code
               document.location.href= `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wx.appId}&redirect_uri=${url}&response_type=code&scope=snsapi_privateinfo&agentid=1000004&state=STATE#wechat_redirect`;
             }
          })

        } else {
          let thePath = window.location.hash;
          thePath = thePath.split("/")[1];
          let url = wx.redirectUrl + (thePath?thePath:'');
          // http://ywh5.fenganghr.com&response_type=code
          document.location.href= `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wx.appId}&redirect_uri=${url}&response_type=code&scope=snsapi_privateinfo&agentid=1000004&state=STATE#wechat_redirect`;
            //document.location.href= `https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww88ca933444ce3492&redirect_uri=${wx.redirectUrl}&response_type=code&scope=${wx.loginStyle}&state=${wx.param}&agentid=${wx.agentid}#wechat_redirect`;
        }
    }
}
export default checkLogin
