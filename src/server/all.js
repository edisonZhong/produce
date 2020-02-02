import {instance as axios} from '../jslib/HttpRequest'


export function feedBackList(obj){
  return new Promise((resolve,reject)=>{
    axios({
      url:'/feedback/showFeedback',
      method: 'post',
      data:obj,

    })
      .then((response)=>{
        resolve(response)
      })
      .catch((error)=>{
        console.log(error)
        reject(error)
      })
  })
}


//说明
export function getStatisticsExplain(obj){
  return new Promise((resolve,reject)=>{
    axios({
      url:'/sariCheckinRecordSum/getStatisticsExplain',
      method: 'get',
      params:obj,

    })
      .then((response)=>{
        resolve(response)
      })
      .catch((error)=>{
        console.log(error)
        reject(error)
      })
  })
}
//统计
export function getHealthStatistics(obj){
  return new Promise((resolve,reject)=>{
    axios({
      url:'/sariCheckinRecordSum/getHealthStatistics',
      method: 'get',
      params:obj,

    })
      .then((response)=>{
        resolve(response)
      })
      .catch((error)=>{
        console.log(error)
        reject(error)
      })
  })
}
//详情列表
export function getPatientPaging(obj){
  return new Promise((resolve,reject)=>{
    axios({
      url:'/sariCheckinRecordSum/getPatientPaging',
      method: 'post',
      data:obj,

    })
      .then((response)=>{
        resolve(response)
      })
      .catch((error)=>{
        console.log(error)
        reject(error)
      })
  })
}
