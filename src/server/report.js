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

// 获取大区列表
export function getDistrictList(obj){
	return new Promise((resolve,reject)=>{
		axios({
			url:'/exportReport/selectBusinessDistrict',
			method: 'get',
			params:obj
		})
		.then((response)=>{
            resolve(response)
		})
		.catch((error)=>{
			console.log(error)
		})
	})
}

// 根据选择的大区获取对应的图表数据
export function getChartsData(obj){
	return new Promise((resolve,reject)=>{
		axios({
			url:'/exportReport/selectStatisticsChartByBusinessDistrict',
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

// 根据选择的大区获取对应的图表数据(新数据)
export function getNewChartsData(obj){
	return new Promise((resolve,reject)=>{
		axios({
			url:'/exportReport/selectStatisticsDaily',
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

// 根据选择的日，周，月切换数字(新数据)
export function getDetailDate(obj){
	return new Promise((resolve,reject)=>{
		axios({
			url:'/exportReport/selectDateByDWM',
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
