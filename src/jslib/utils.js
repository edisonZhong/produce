
export default{
	//添加cookie /修改cookie
	setCookie(name, value){
		var Days = 14;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	},
	 getCookie(name){
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	},
	//删除cookie
	 removeCookie(name){
		var d = new Date("2000-02-02");
		document.cookie =  unescape(name) + "=;expires=" + d;
		return escape(document.cookie);
	},
	//修改标题
	changeTitle(t) {
    document.title = t;
    let i = document.createElement('iframe');
    i.style.display = 'none';
    i.onload = function () {
      setTimeout(function () {
        i.remove();
      }, 9)
    };
    document.body.appendChild(i);
  },
	//字段的验证，支持是否为空、手机、邮箱的判断
    testVal(value, type) {
        var value = $.trim(value); 
        //非空验证
        if ('require' === type) {
            return !!value;
        }
        //手机号验证
        if ('phone' === type) {
            return /^1(3|4|5|7|8)\d{9}$/.test(value);
		}
		//邮箱验证
        if ('email' === type) {
            return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value);
		}
		//名字检测
		if('name' === type){
			return /^[\u4e00-\u9fa50-9a-zA-Z]{1,20}$/.test(value)
		}
		//验证密码
		if('pwd'===type){
			return /^([a-zA-Z0-9\.\@\!\#\$\%\^\&\*\(\)]){6,16}$/.test(value)
		}
		//身份证验证15和18位
		if('idCard'===type){
			return /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/
		}
	},
	  // 获取url中的参数（url中没有#）
	  getUrlParams(name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
		  return unescape(r[2]);
		}
		return null;
	  },
	  //时间戳转时间
	  date(inputTime, type) {
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        if (type == '1') {
            return y + '-' + m + '-' + d;
        } else if (type == '2') {
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
        } else if (type == '3') {
            return y + '/' + m + '/' + d + ' ' + h + ':' + minute+ ':' + second;
        } else if (type == '4'){
            return y + ''+m +''+  d;
        }
        else {
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
        }
	},
	  //时间戳转时间
	  date(inputTime, type) {
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        if (type == '1') {
            return y + '-' + m + '-' + d;
        } else if (type == '2') {
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
        } else if (type == '3') {
            return y + '/' + m + '/' + d + ' ' + h + ':' + minute+ ':' + second;
        } else if (type == '4'){
            return y + ''+m +''+  d;
        }
        else {
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
        }
    },
	  //		获取url中的参数（url中有#）
	  getHashUrlParams(eNumber) {
		var after = window.location.hash.split("?")[1];
		if (after) {
		  var reg = new RegExp("(^|&)" + eNumber + "=([^&]*)(&|$)");
		  var r = after.match(reg);
		  if (r != null) {
			return decodeURIComponent(r[2]);
		  } else {
			return null;
		  }
		}
	  },
}









