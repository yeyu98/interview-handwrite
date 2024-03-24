/*
 * @Author: yeyu98
 * @Date: 2024-03-23 14:58:05
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-03-24 21:47:24
 * @Description: 
 */
// 数组实现 [0，4， 1， 10， 8， 6, 5]
// 堆与二叉树相似
class MinHeap {
    heap = []
    shiftDown(node, index) {
        while(true) {
            const leftIndex = (index + 1) * 2 - 1
            const leftNode = this.heap[leftIndex]
            const rightIndex = (index + 1) * 2
            const rightNode = this.heap[rightIndex]
            // 左大于根节点 无需交换位置
            // 左小于根节点 交换位置
            // 右大于根节点 无需交换位置
            // 右小于根节点 交换位置
            // if(leftNode && leftNode > node) {
            //      if(rightNode && rightNode < node) {

            //      }
            // }


        }
    }
    shiftUp(node, index) {
        while(true) {
            const parentIndex = (index - 1) >>> 1
            const parent = this.heap[parentIndex]
            if(parent && parent > node) {
                this.heap[index] = this.heap[parentIndex]
                this.heap[parentIndex] = node 
                index = parentIndex
            } else {
                return
            }
        }
    }
    push(node) {
        // 入堆：入堆会从数组最后一个位置进入，不断的与其父级节点比较若父级节点大于则交换两者的位置
        // 需要计算父节点位置 Math.floor(index - 1 / 2) === index - 1 >>> 1
        const first = this.peek()
        if(!first) {
            this.heap.push(node)
            return
        }
        this.heap.push(node)
        const currentIndex = this.heap.length - 1 // 当前位置
        this.shiftUp(node, currentIndex)
    }
    pop() {
        // 出堆：出堆之后需要把最后一个节点移到堆顶，之后至上而下的与每个左右子节点比较大小，与最小的节点交换二者位置直到叶子节点
        // 需要考虑 只有一个子节点时
        // 没有子节点时
        // 左节点位置 (index + 1) * 2 - 1  右节点位置 (index + 1) * 2
        const first = this.heap[0]
        if(!first) {
            return
        }
        if(this.heap.length === 1) {
            const last = this.heap.pop()
            return last
        }
        const last = this.heap.pop()
        this.shiftDown(last, 0)
        return first
    }
    peek() {
        const fist = this.heap[0]
        return fist ? fist : null
    }
}

