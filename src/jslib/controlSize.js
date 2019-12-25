
	function getRootFontSize(){
		var root = document.documentElement;
		var clientWidth = root.clientWidth;
		root.style.fontSize = clientWidth*100/750+'px';
		localStorage.setItem('font',clientWidth*100/750);
	}
	window.addEventListener('orientationchange', getRootFontSize);//用户水平或者垂直翻转设备（即方向发生变化）时触发的事件
	window.addEventListener('resize', getRootFontSize);
	getRootFontSize();
