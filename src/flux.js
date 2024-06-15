/*
 * @Author: yeyu98
 * @Date: 2024-06-15 14:21:37
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-06-15 15:13:14
 * @FilePath: \interview-handwrite\src\flux.js
 * @Description: 
 */
/*
  Dispatcher：胶水角色粘合action和store，派发action
  view 与 store绑定
    辅助函数：如果换一个类似于flux的库就得重新写继承的类；
    mixins：如果mixins使用的多无法得知数据来源，极大可能导致数据流混乱；
    context：和mixins有类似的问题无法获知数据来源；
    高阶组件

*/ 

class Dispatcher {
  _stores = []
  register(store) {
    if(!store || !store.update) {
      throw new Error('You should provide a store that has an `update` method.');
    }
    const consumers = []
    // 这里的consumer作用是啥？
    const subscribe = (consumer, noInit) => {
      consumers.push(consumer)
      // 传递初始值
      !noInit ? consumer(store) : null
    }

    const change = () => {
      consumers.forEach(consumer => consumer(store))
    }
    
    this._stores.push({store, change})
    return subscribe
  }
  dispatch(action) {
    // 如何派发视图的更新呢？
    if(this._stores.length === 0) return
    this._stores.forEach(entry => {
      // update触发更新
      entry.store.update(action, entry.change)
    })
  }
}


/*

Action = {
  type: "USER_LOGIN_INFO",
  payload: {
    username: '',
    password: ''
  }
}

*/ 

modules.exports = {
  create() {
    const dispatcher = new Dispatcher()
    return {
      createAction(type) {
        if(!type) {
          throw new Error('Please, provide action\'s type.');
        }
        return function(payload) {
          return dispatcher.dispatch({
            type,
            payload
          })
        }
      },
      createSubscriber(store) {
        return dispatcher.register(store)
      }
    }
  }
}