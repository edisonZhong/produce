import {instance as axios} from '../jslib/HttpRequest'

// 
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

// 获取所有员工
export function getAllEmployee(obj){
	return new Promise((resolve,reject)=>{
		axios({
			url:'employee/getAllEmployeeInMobile',
			method: 'post',
			data:obj
		})
		.then((response)=>{
            resolve(response);
		})
		.catch((error)=>{
			console.log(error);
		})
	})
}
// 根据id获取员工信息详情
export function getEmployeeById(obj){
	return new Promise((resolve,reject)=>{
		axios({
			url:`employeeDetail/findById/${obj}`,
			method: 'get',
		})
		.then((response)=>{
            resolve(response);
		})
		.catch((error)=>{
			console.log(error);
		})
	})
}

// 移动端录入离职员工信息
export function addDepartureEmployee(obj){
	return new Promise((resolve,reject)=>{
		axios({
			url:`employeeDetail/addDepartureEmployee`,
			method: 'post',
			data:obj
		})
		.then((response)=>{
            resolve(response);
		})
		.catch((error)=>{
			console.log(error);
		})
	})
}
