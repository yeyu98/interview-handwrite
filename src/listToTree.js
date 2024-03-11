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

const listToTree = (items, pid = 0) => {
    // 查找父级节点
    const pItems = items.filter(item => item.pid === pid)
    if(!pItems || pItems.length === 0) return
    // 父级节点找到之后，向下递归查找子节点
    pItems.forEach(item => {
        const result = listToTree(items, item.id)
        if(result?.length > 0) {
            item.children = result
        }
    })
    return pItems
}

console.log(listToTree(data))