/*
 * @Author: xiaohu
 * @Date: 2024-02-29 16:48:58
 * @LastEditors: xiaohu
 * @LastEditTime: 2024-02-29 17:18:19
 * @FilePath: \interview-handwrite\src\promise-all.js
 * @Description: 
 */
/**
 * 如果给定的 iterable 中所有的 promise 都已兑现。兑现值是一个数组，其元素顺序与传入的 promise 一致，而非按照兑现的时间顺序排列。
 * 如果给定的 iterable 中的任意 promise 被拒绝。拒绝原因是第一个拒绝的 promise 的拒绝原因
 * */ 
const promiseAll = (list) => {
  return new Promise((resolve, reject) => {
    if(!list || list.length === 0) {
      resolve([])
      return
    } 
    const result = []
    let count = 0
    for(let i = 0; i<list.length; i++) {
      const p = list[i]
      p().then(res => {
        result[i] = res
        if(++count === list.length) {
          resolve(result)
        }
      }).catch(err => {
        reject(err)
      })
    }
  })
}
