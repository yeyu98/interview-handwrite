/*
 * @Author: xiaohu
 * @Date: 2024-02-29 17:19:16
 * @LastEditors: xiaohu
 * @LastEditTime: 2024-02-29 18:01:56
 * @FilePath: \interview-handwrite\src\promise.js
 * @Description: 
 */
/**
 * 支持同步回调
 * 支持异步回调：通过成功以及失败的队列收集
 * 支持链式调用
 * */ 
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class _Promise {
  status = PENDING // 初始状态
  value = undefined // 成功的值
  reason = undefined // 失败的值
  onResolveCallbacks = [] // 成功的回调
  onRejectedCallbacks = [] // 失败的回调
  constructor(executor) {
    const resolve = (value) => {
      if(this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        // 依次执行成功回调
        this.onResolveCallbacks.forEach(fn => fn())
      }
    }
    const reject = (reason) => {
      if(this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        // 依次执行失败回调
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch(err) {
      reject(err)
    }
    
  }
  then(onfulfilled, onrejected) {
    // 同步执行
    if(this.status === FULFILLED) {
      onfulfilled(this.value)
    }
    // 同步执行
    if(this.status === REJECTED) {
      onrejected(this.reason)
    }
    // 异步需要等待执行
    if(this.status = PENDING) {
      // 收集成功以及失败的回调为了异步处理
      this.onResolveCallbacks.push(() => onfulfilled(this.value))
      this.onRejectedCallbacks.push(() => onrejected(this.reason))
    }
    return this
  }
}

let p = new _Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('333')
  }, 1000);
}).then(res => {
  console.log('🥳🥳🥳 第一个--->>>', res)
  return '11111'
}).then(res => {
  console.log('🥳🥳🥳 第二个--->>>', res)
})