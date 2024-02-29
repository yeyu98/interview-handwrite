/*
 * @Author: xiaohu
 * @Date: 2024-02-29 16:48:58
 * @LastEditors: xiaohu
 * @LastEditTime: 2024-02-29 16:57:48
 * @FilePath: \interview-handwrite\src\promise-all.js
 * @Description: 
 */
/**
 * 所有的promise都执行完了，返回数组结果
 * 有一个错误就返回错误
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
