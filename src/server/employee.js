import {instance as axios} from '../jslib/HttpRequest'

// 员工列表
export function listData(obj) {
  return new Promise((resolve, reject) => {
    axios({
      url: 'employee/getAllEmployeeInMobile',
      method: 'post',
      data: obj
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        console.log(error)
      })
  })
}

//保存入职
export function addData(obj) {
  return new Promise((resolve, reject) => {
    axios({
      url: 'employeeDetail/addEmployeeSimpleDate',
      method: 'post',
      data: obj
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        console.log(error)
      })
  })
}

//选择所属业务区
export function selectService(obj) {
  return new Promise((resolve, reject) => {
    axios({
      url: 'organizationalTree/pagingQueryOrganizationl',
      method: 'post',
      data: obj
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        console.log(error)
      })
  })
}

//劳动合同牌照
export function selectCart(obj) {
  return new Promise((resolve, reject) => {
    axios({
      url: 'legalCompany/queryLegalTree',
      method: 'get',
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        console.log(error)
      })
  })
}

//选择客户
export function selectType(obj) {
  return new Promise((resolve, reject) => {
    axios({
      url: '/customer/paging',
      method: 'post',
      data: obj
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        console.log(error)
      })
  })
}

// selectType

export function positionType(obj) {
  return new Promise((resolve, reject) => {
    axios({
      url: `/dictionaryValues/list`,
      method: 'get',
      params: obj,
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        console.log(error)
      })
  })
}

// 获取所有员工
export function getAllEmployee(obj) {
  return new Promise((resolve, reject) => {
    axios({
      url: 'employee/getAllEmployeeInMobile',
      method: 'post',
      data: obj,
    }).then((response) => {
      resolve(response);
    })
      .catch((error) => {
        console.log(error);
      })
  })
}

// 根据id获取员工信息详情
export function getEmployeeById(obj) {
  return new Promise((resolve, reject) => {
    axios({
      url: `employeeDetail/findById/${obj}`,
      method: 'get',
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
      })
  })
}

// 移动端录入离职员工信息
export function addDepartureEmployee(obj) {
  return new Promise((resolve, reject) => {
    axios({
      url: `employeeDetail/addDepartureEmployee`,
      method: 'post',
      data: obj
    }).then((response) => {
      resolve(response);
    })
      .catch((error) => {
        console.log(error)
      })
  })
}
