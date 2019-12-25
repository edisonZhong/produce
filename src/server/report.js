import {instance as axios} from '../jslib/HttpRequest'

// 
export function reportData(obj){
	return new Promise((resolve,reject)=>{
		axios({
			url:'/exportReport/selectBusinessDistrictAreaEmployeeStatisticsChart',
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
//员工岗位属性统计图
export function reportLine(obj){
	return new Promise((resolve,reject)=>{
		axios({
			url:'/exportReport/selectBusinessAreaEmployeePositionTypeStatisticsChart',
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
//员工入职数统计图
export function reportEnter(obj){
	return new Promise((resolve,reject)=>{
		axios({
			url:'/exportReport/selectBusinessDistrictAreaEntryEmployeeStatisticsChart',
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
//离职
export function reportLive(obj){
	return new Promise((resolve,reject)=>{
		axios({
			url:'/exportReport/exportReport/selectBusinessDistrictAreaResignationEmployeeStatisticsChart',
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
// 获取token
export function getToken(obj){
	return new Promise((resolve,reject)=>{
		axios({
			url:'/pushApplicationMsg/getUserChatInfo',
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


