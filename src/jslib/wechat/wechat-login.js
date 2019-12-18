function checkLogin(wx) {
    if (!localStorage.getItem('token')) {
        let url = window.location.href;

        if (url.indexOf('code') >= 0) {
            var a = url.split("?")[1];
            var b = a.split('&')[0];
            var aCode = b.split('=')[1];
        } else {
            var aCode = 0;
        }

        if (aCode) {
            //获取token操作

        } else {
            // document.location.href= `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wx.appId}&redirect_uri=${wx.redirectUrl}&response_type=code&scope=${wx.loginStyle}&state=${wx.param}#wechat_redirect`;
        }
    }
}
export default checkLogin