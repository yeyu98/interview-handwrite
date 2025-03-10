
let activeEffect = null
      
const effect = (fn) => {
    activeEffect = fn
    fn()
    activeEffect = null
}
class Reactive {
  triggerMap = new WeakMap()
  constructor(value) {
      return this.init(value)
  }
  init (target) {
      const that = this
      return new Proxy(target, {
          get(target, key, receiver) {
            that.track(target, key)
              return Reflect.get(target, key, receiver)
          },
          set(target, key, value, receiver) {
            const result = Reflect.set(target, key, value,receiver)
            that.trigger(target, key)
            return result
          }
      })
  }
  trigger(target, key) {
      const depsMap = this.triggerMap.get(target)
      if(!depsMap) return
      const effects = depsMap.get(key)
      if(effects) {
          effects.forEach(fn => fn())
      }
  }
  track(target, key) {
      if(activeEffect) {
          let depsMap = this.triggerMap.get(target)
          if(!depsMap) {
              depsMap = new Map()
              this.triggerMap.set(target, depsMap)
          }
          let deps = depsMap.get(key)
          if(!deps) {
              deps = new Set()
              depsMap.set(key, deps)
          }
          deps.add(activeEffect)
      }
  }
}

const state = new Reactive({count: 1})
effect(() => {
  console.log(`count 更新：${state.count}`);
})

state.count = 2
state.count++