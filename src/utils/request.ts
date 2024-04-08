import { notification } from 'antd'
import axios, { AxiosResponse } from 'axios'

type Fn = (data: AxiosResponse) => unknown

const msgError = (msg: string) => {
  notification.error({
    message: msg,
    placement: 'topLeft',
    duration: 0.8
  })
}
const msgSuccess = (msg: string) => {
  notification.success({
    message: msg,
    placement: 'topLeft',
    duration: 0.8
  })
}


// 响应数据类型
interface FcResponse<T> {
  code: number
  message: string
  data: T
}

// interface IAnyObj {
//   [index: string]: unknown
// }

const instance = axios.create({
  baseURL: 'https://api2.may1145.xyz/',
  timeout: 1000,
  headers: {}
})
//  针对所有接口的处理
// new Promise
// 先调用内部的代码，然后暂存then中的两个回调，等到改变状态（调用resolve => 改变状态 => 执行resolve内部的回调）     =》 利用核心也就是三个状态
const request = <T>(url: string, params: unknown, clearFn?: Fn): Promise<FcResponse<T> | undefined> => {     //  这里promise的类型都是指的是res的类型

  // newPromise中使用resolve 那么返回的Promise状态就是根据resolve中的Promise的状态
  // 链式调用 根据return的值来的     如果没有return那么就是undifined 
  let isFormData = false;

  // 这个语句运用到了原型链的知识，还是要学一下
  if (params instanceof FormData) {
    isFormData = true;
  }
  return new Promise((resolve) => {
    instance
      .post(url, params, {
        headers: {
          'Content-Type': isFormData ? 'multipart/form-data' : 'application/json'
        }
      })
      .then((result: AxiosResponse) => {
        let res
        if (clearFn !== undefined) {
          res = clearFn(result)
        } else {
          res = result
        }
        resolve(res as FcResponse<T>)
      })
      .catch((err) => {
        console.log('err', err)
        let message = ''
        if (err) message = err.data.message
        else message = err
        console.log('message', message)
        msgError(message)
      })
  })
}

// 请求拦截

// 加上token

instance.interceptors.request.use((config) => {
  config.headers['token'] = localStorage.getItem('token') || ''
  return config
})

// 响应拦截

instance.interceptors.response.use(
  (response) => {
    console.log('响应', response)
    const { code, message } = response.data
    if (code === 200) {
      msgSuccess(message)
      return response.data    // 这里其实就是返回了一个带有data的resolvePromise
    }
    else {
      return Promise.reject(response)
    }
  },
  (error) => {
    return Promise.reject(error.response)
  }
)

export default request

