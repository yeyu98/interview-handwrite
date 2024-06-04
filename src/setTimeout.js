// setTimeout由于事件循环的原因终归无法精准
// 思路就是在每一次执行时补偿上一次执行实际时间的超出
const timer = () => {
  const time = 1000
  let start = Date.now()
  const callback = () => {
    const end = Date.now()
    // 实际时间
    const _actual = end - start
    // 重置开始时间
    start = Date.now()
    console.log('🥳🥳🥳 ~~ callback ~~ _actual--->>>', _actual)
    // 下一次执行的时间
    const nextTime = time - (_actual - time)
    console.log(nextTime)
    // count++
    window.setTimeout(callback, nextTime)
  }
  window.setTimeout(callback, time)
}
