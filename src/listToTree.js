/*
 * @Author: xiaohu
 * @Date: 2024-03-11 14:09:24
 * @LastEditors: xiaohu
 * @LastEditTime: 2024-03-11 17:16:35
 * @FilePath: \interview-handwrite\src\listToTree.js
 * @Description: 
 */
const data = [
  { "id": 1, "name": "用户中心", "orderNum": 1, "pid": 0 },
  { "id": 2, "name": "订单中心", "orderNum": 2, "pid": 0 },
  { "id": 3, "name": "系统管理", "orderNum": 3, "pid": 0 },
  { "id": 12, "name": "所有订单", "orderNum": 1, "pid": 2 },
  { "id": 14, "name": "待发货", "orderNum": 1.2, "pid": 2 },
  { "id": 15, "name": "订单导出", "orderNum": 2, "pid": 2 },
  { "id": 18, "name": "菜单设置", "orderNum": 1, "pid": 3 },
  { "id": 19, "name": "权限管理", "orderNum": 2, "pid": 3 },
  { "id": 21, "name": "系统权限", "orderNum": 1, "pid": 19 },
  { "id": 22, "name": "角色设置", "orderNum": 2, "pid": 19 },
];

/**
 * O(n^2)
 * 1.查找父节点
 * 2.父节点找到之后，向下递归查找子节点
*/
const listToTree = (list, pid = 0) => {
    // 查找父节点
    const parentNodeList = list.filter(item => item.pid === pid)
    if(!parentNodeList || parentNodeList.length === 0) return
    parentNodeList.forEach(item => {
        // 向下递归查找下一层的子节点
        const children = listToTree(list, item.id)
        if(children) {
            item.children = children
        }
    })
    return parentNodeList
}

/**
 * O(2n) 空间换时间
 * 1.定义map遍历存储每个节点id对应的父节点映射
 * 2.遍历集合查找父节点在map中是否存在
 *   若存在则push到children中
 *   若不存在则证明这个节点本身就是父节点直接push到tree中
 */

const listToTree2 = (list) => {
    const map = {}
    const tree = []
    // 建立父级映射
    list.forEach(item => (map[item.id] = item))
    // 子节点处理
    list.forEach(item => {
        const parentNode = map[item.pid]
        // 判断父节点是否存在，存在则push到children中
        if(parentNode) {
            parentNode.children ??= []
            parentNode.children.push(item)
        } else {
            tree.push(item)      
        }
    })
    return tree
}

console.log(listToTree2(data))