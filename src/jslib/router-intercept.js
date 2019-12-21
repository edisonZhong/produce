import wxLogin from './wechat/wechat-login'
import router from '../router'
import wxData from './wechat/wechat-param'
import utils from '../jslib/utils'
import wxShare from './wechat/wechat-share'

//判断当前浏览器环境
var ua = navigator.userAgent.toLowerCase();

router.beforeEach((to, from, next) => {
    console.log(to, '触发路由卫士_to');

    //修改标题
    utils.changeTitle(to.meta.title)


    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        console.log('微信浏览器')
        //检查是否授权登录
        wxLogin(wxData);
        //从微信分享进入时去除form参数
        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        }

        //从分享进入时去除form参数
        // if (getQueryString("from") == "timeline") {
        //     var str = window.location.href;
        //     str = str.replace("from=timeline", "");
        //     if (getQueryString("isappinstalled") == "0") {
        //         var str1;
        //         str1 = str.replace("isappinstalled=0", "");
        //         if (str1.indexOf("?#")) {
        //             var redirectUrl = "http://" + location.hostname + '/';
        //             let url2 = redirectUrl + '?#' + to.fullPath;
        //             window.location.href = url2;
        //         } else {
        //             var redirectUrl = "http://" + location.hostname + '/';
        //             let url2 = redirectUrl + '?#' + to.fullPath;
        //             window.location.href = url2;
        //         }
        //     } else {
        //         window.location.href = str;
        //     }
        // } else if (getQueryString("from") == "groupmessage") {
        //     var str = window.location.href;
        //     str = str.replace("from=groupmessage", "");
        //     if (getQueryString("isappinstalled") == "0") {
        //         var str1;
        //         str1 = str.replace("isappinstalled=0", "");
        //         if (str1.indexOf("?#")) {
        //             var redirectUrl = "http://" + location.hostname + '/';
        //             let url2 = redirectUrl + '?#' + to.fullPath;
        //             window.location.href = url2;
        //         } else {
        //             var redirectUrl = "http://" + location.hostname + '/';
        //             let url2 = redirectUrl + '?#' + to.fullPath;
        //             window.location.href = url2;
        //         }
        //     } else {
        //         window.location.href = str;
        //     }
        // } else if (getQueryString("from") == "singlemessage") {
        //     var str = window.location.href;
        //     str = str.replace("from=singlemessage", "");
        //     if (getQueryString("isappinstalled") == "0") {
        //         var str1;
        //         str1 = str.replace("isappinstalled=0", "");
        //         if (str1.indexOf("?#")) {
        //             var redirectUrl = "http://" + location.hostname + '/';
        //             let url2 = redirectUrl + '?#' + to.fullPath;
        //             window.location.href = url2;
        //         } else {
        //             var redirectUrl = "http://" + location.hostname + '/';
        //             let url2 = redirectUrl + '?#' + to.fullPath;
        //             window.location.href = url2;
        //         }
        //     } else {
        //         window.location.href = str;
        //     }
        // }

        //从微信分享进入时去除form参数
        next();
    } else {
        console.log('外置浏览器');
        next();
    }




})
router.afterEach((to, from, next) => {

    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        console.log('微信浏览器')
        wxShare(wxData)
    } else {
        console.log('外置浏览器');
    }

})
