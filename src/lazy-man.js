/*
调用方式：(new LazyLog()).log(1).sleep(1000).log(2)
输出：先输出1，延迟1秒后输出2
*/
class LazyLog {
  queue = [];
  constructor() {
    // 这里使用settimout是为了保证所有的task收集完毕
    // 整体思路使用的是队列 + 宏任务
    setTimeout(() => {
      this.next();
    }, 0);
  }
  log(value) {
    const task = () => {
      console.log(value);
      this.next();
    };
    this.queue.push(task);
    return this;
  }
  sleep(time) {
    const task = () => {
      setTimeout(() => {
        console.log(`sleep ${time / 1000}s`);
        this.next();
      }, time);
    };
    this.queue.push(task);
    return this;
  }
  next() {
    const task = this.queue.shift();
    task && task();
  }
}