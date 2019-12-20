import {instance as axios} from '../jslib/HttpRequest'

// 获取商家详情
export function listData(obj){
	return new Promise((resolve,reject)=>{
		axios({
			url:'employee/paging',
			method: 'post',
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

export function addData(obj){
	return new Promise((resolve,reject)=>{
		axios({
			url:'employeeDetail/addEmployeeSimpleDate',
			method: 'post',
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

