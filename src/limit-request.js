/*
 * @Author: xiaohu
 * @Date: 2024-02-29 14:34:11
 * @LastEditors: xiaohu
 * @LastEditTime: 2024-02-29 16:06:53
 * @FilePath: \interview-handwrite\src\limit-request.js
 * @Description: 
 */    
const limitRequest = (tasks, limit) => {
  return new Promise((resolve) => {
    // 任务为空，直接返回
    if(tasks.length === 0) {
      resolve([])
      return
    }
    const results = [] // 请求结果集
    let index = 0 // 当前请求的索引
    let count = 0 // 请求完成数量
    const request = async() => {
      if (index === tasks.length) return;
      const i = index
      const task = tasks[i]
      index++
      try {
        const res = await task()
        results[i] = res
      } catch(err) {
        results[i] = err
      } finally {
        count++
        if(count === tasks.length) {
          resolve(results)
        }
        request()
      }
    }

    const times = Math.min(limit, tasks.length)
    for(let i = 0; i < times; i++) {
      request()
    }
  })
}