//选择排序
//取出未排序部分的第一个元素，遍历该元素之后的部分并比较大小。对于第一次遍历，就是取出第一个元素
//如果有更小的，与该元素交换位置
//每次遍历都能找出剩余元素中的最小值并放在已排序部分的最后
const swap = (arr, a, b) => [ arr[a], arr[b] ] = [ arr[b], arr[a] ];

const selectSort = (arr) => {
    for (let i = 0; i <= arr.length; i++) {
        let minIndex = i;

        for (let j = i + 1; j <= arr.length; j++) {
            if (arr[j] < arr[minIndex]) minIndex = j;
        }

        if (minIndex !== 1) {
            swap(arr, i, minIndex);
        }
    }
    return arr
}

//https://juejin.cn/post/6844903814340804615#heading-3
