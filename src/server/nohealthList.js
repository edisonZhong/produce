import {instance as axios} from '../jslib/HttpRequest'

// 我的反馈列表
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
