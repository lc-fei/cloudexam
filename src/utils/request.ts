import axios, { AxiosResponse } from 'axios'
import { msgError } from './msg'

type Fn = (data: AxiosResponse) => unknown

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
        // 一、根据错误码自定义错误处理
        // 1.抛出错误，让组件自己去trycatch
        // 这里有个问题就是好像api还需要去trycatch一次，把错误抛给组件  (这个不需要，如果有错误，函数会直接抛给调用者。但是不知道为什么组件还是不能catch到)
        // throw new Error(err)
        // 2. 让组件组件自己通过code码去处理
        // console.log('请求出错err', err)
        // resolve(err)
        // 二、统一处理
        console.log('err', err)
        return
        console.log('请求出错err', err)
        let message = '请求出错'
        if (err.data) message = err.data
        else if (err.data.message) message = err.data.message
        console.log('message', message)
        msgError(message)
      })
  })
}

// 请求拦截

// 加上token

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
})

// 响应拦截

instance.interceptors.response.use(
  (response) => {
    console.log('响应', response)
    const { code } = response.data
    if (code === 200) {
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

