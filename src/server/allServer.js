import {instance as axios} from '../jslib/HttpRequest'

// 获取商家详情
function getLogin(obj){
	return new Promise((resolve,reject)=>{
		axios({
			url:'login_validate.html',
			method: 'POST',
			data:obj
			
		})
		.then((response)=>{
            resolve(response)
		})
		.catch((error)=>{
			console.log(error)
		})
	})
} 



export  {
	getLogin,
}


