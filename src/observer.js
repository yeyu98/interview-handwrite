/*
 * @Author: yeyu98
 * @Date: 2024-03-08 20:53:33
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-03-08 21:15:13
 * @Description: 
 */
class Observer {
    clientList = []
    listen(fn) {
        this.clientList.push(fn)
    }
    trigger(...args) {
        if(!this.clientList.length) return
        for(let i=0; i<this.clientList.length; i++) {
            const fn = this.clientList[i]
            fn && fn(...args)
        }
    }
    remove(fn) {
        if(!this.clientList.length) return
        for(let i=0; i < this.clientList.length; i++) {
            const _fn = this.clientList[i]
            if(_fn === fn) {
                this.clientList.splice(i, 1)
            }
        }
    }
}

const observer = new Observer()
observer.listen(function(price, squareMeter) {
    console.log(`房价${price}`)
    console.log(`面积${squareMeter}`)
})
observer.trigger('200万', '50平米')
observer.trigger('100万', '25平米')