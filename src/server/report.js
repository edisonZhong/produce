import {instance as axios} from '../jslib/HttpRequest'

// 获取商家详情
export function reportData(obj){

	return new Promise((resolve,reject)=>{
		axios({
			url:'/exportReport',
			method: 'get',
		})
		.then((response)=>{
            resolve(response)
		})
		.catch((error)=>{
			console.log(error)
		})
	})
} 


