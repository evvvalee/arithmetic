//冒泡排序
// 1.从第一个元素开始，比较每两个相邻元素，如果前者大，就交换位置
// 2.每次遍历结束，能够找到该次遍历过的元素中的最大值
// 3.如果还有没排序过的元素，继续1

const swap = (arr, a, b) => [ arr[a], arr[b] ] = [ arr[b], arr[a] ];
const bubbleSort = (arr) => {
    if (arr.length <= 1) return arr;
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j+1]) {
                swap(arr, j, j + 1)
            }
        }
    }
    return arr
}

//https://juejin.cn/post/6844903814340804615#heading-3