/*
 * @Author: xiaohu
 * @Date: 2024-02-29 17:19:16
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-03-02 22:04:38
 * @FilePath: \interview-handwrite\src\promise.js
 * @Description: 
 */
/**
 * 支持同步回调
 * 支持异步回调：通过成功以及失败的队列收集
 * 支持链式调用&值穿透特性：普通值则成功的返回到下一个then成功的回调中，失败的返回到下一个then失败的回调中，promise则会等待完成再重复上一个步骤，如果是同一个promise引用抛出异常
 * resolve 
 * reject
 * all
 * race
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
  then(onFulfilled, onRejected) {
    /*
      // 同步执行
      if(this.status === FULFILLED && typeof onfulfilled === 'function') {
        onfulfilled(this.value)
      }
      // 同步执行
      if(this.status === REJECTED  && typeof onrejected === 'function') {
        onrejected(this.reason)
      }
      // 异步需要等待执行
      if(this.status = PENDING) {
        // 收集成功以及失败的回调为了异步处理
        this.onResolveCallbacks.push(() => onfulfilled(this.value))
        this.onRejectedCallbacks.push(() => onrejected(this.reason))
      }
    */ 

    /**
     * 普通值和函数则成功的返回到下一个then成功的回调中，失败的返回到下一个then失败的回调中
     * promise则会等待完成再重复上一个步骤，如果是同一个promise引用抛出异常
     * 
    */

    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
    
    const resolvePromise = (newPromise, x, resolve, reject) => {
      if(newPromise === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
      }
      // 对象或函数
      if(typeof x === 'function' || (typeof x === 'object' && x !== null)) {
        try {
          // 是promise
          if(x instanceof _Promise) {
            x.then(res => {
              // 递归解析 promise里可能还有promise
              resolvePromise(newPromise, res, resolve,reject)
            }, err => {
              reject(err)
            })
          } else {
            // 对象或函数
            resolve(x)
          }
        }catch(err) {
          reject(err)
        }
      } else {
        // 普通值
        resolve(x)
      }
    }
    const newPromise = new Promise((resolve, reject) => {
      if(this.status === FULFILLED) {
        queueMicrotask(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(newPromise, x, resolve, reject)
          } catch(err) {
            reject(err)
          }
        })
      }
      if(this.status === REJECTED) {
        queueMicrotask(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(newPromise, x, resolve, reject)
          } catch(err) {
            reject(err)
          }
        })
      }
      if(this.status === PENDING) {
        this.onResolveCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(newPromise, x, resolve, reject)
            } catch(err) {
              reject(err)
            }
          })
        })
        this.onRejectedCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(newPromise, x, resolve, reject)
            } catch(err) {
              reject(err)
            }
          })
        })
      }
    })
    return newPromise
  }
  static resolve(data) {
    return new _Promise((resolve) => {
      resolve(data)
    })
  }
  static reject(err) {
    return new _Promise((resolve, reject) => {
      reject(err)
    })
  }
  static all(values) {
    return new _Promise((resolve, reject) => {
      if(!values || values.length === 0) {
        resolve([])
        return
      }
      const result = []
      let count = 0
      for(let i = 0; i < values.length; i++) {
        const p = values[i]
        p.then(res => {
          result[i] = res
          count++
          if(count === values.length) {
            resolve(result)
          }
        }).catch(err => {
          reject(err)
        })
      }
    })
  }
  static race(values) {
    // 那个最快返回哪个
    return new _Promise((resolve, reject) => {
      if(!values || values.length === 0) {
        resolve('')
        return
      }
      for(let i = 0; i < values.length; i++) {
        const p = values[i]
        p.then(res => {
            resolve(res)
        }).catch(err => {
          reject(err)
        })
      }
    })
  }
}

// let p = new _Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('333')
//   }, 1000);
// }).then(res => {
//   console.log('🥳🥳🥳 第一个--->>>', res)
//   return '11111'
// }).then(res => {
//   console.log('🥳🥳🥳 第二个--->>>', res)
// })
const requests = [];
for (let i = 1; i <= 5; i++) {
  requests.push( fetch(`https://jsonplaceholder.typicode.com/todos/${i}`).then(res => res.json()));
}
_Promise.all(requests).then(res => {
  console.log(res)
})