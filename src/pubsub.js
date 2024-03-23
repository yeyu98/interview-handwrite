/*
 * @Author: yeyu98
 * @Date: 2024-03-08 20:53:33
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-03-08 21:16:07
 * @Description: 
 */
// 与观察者的区别在于多了一个可以订阅的主题，观察者里的主题都是一样的，但是发布订阅里我们可以有不同的主题，不同的订阅者可以订阅不同主题的发布者
class Observer {
    clientList = {}
    listen(key, fn) {
        if(!this.clientList[key]) {
            this.clientList[key] = [fn]
        }else {
            this.clientList[key].push(fn)
        }
    }
    trigger(key, ...args) {
        if(!this.clientList[key].length) return
        const fns = this.clientList[key]
        for(let i=0; i<fns.length; i++) {
            const fn = fns[i]
            fn && fn(...args)
        }
    }
    remove(key, fn) {
        if(!this.clientList[key]) return
        for(let i=0; i < this.clientList[key].length; i++) {
            const _fn = this.clientList[key][i]
            if(_fn === fn) {
                this.clientList[key].splice(i, 1)
            }
        }
    }
}

const observer = new Observer()
const fn1 = function(price) {
    console.log(`房价1 -- ${price}`)
}
const fn2 = function(price) {
    console.log(`房价2 -- ${price}`)
}
observer.listen('price', fn1)
observer.listen('price', fn2)
observer.listen('squareMeter',function(squareMeter) {
    console.log(`面积${squareMeter}`)
})
observer.remove('price', fn2)
observer.trigger('price','200万')
observer.trigger('squareMeter', '25平米')