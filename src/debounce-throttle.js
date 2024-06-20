/*
 * @Author: yeyu98
 * @Date: 2024-06-20 10:33:01
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-06-20 10:46:19
 * @FilePath: \interview-handwrite\src\debounce-throttle.js
 * @Description: 
 */
// 防抖：频繁触发n次函数只会在函数触发停止时才执行，只关心最终执行的结果；
// 节流：无论函数频繁触发多少次在一定时间内函数只会执行一次，降低函数执行频率；
const debounce = (fn, time) => {
  let timer = null
  return function(...args) {
    if(timer) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, time)
    }
  }
}
const throttle = (fn, time) => {
  let startTime = Date.now()
  return function(...args) {
    const nextStartTime = Date.now()
    if(nextStartTime - startTime > time) {
      fn.apply(this, args)
      startTime = Date.now() 
    }
  }
}