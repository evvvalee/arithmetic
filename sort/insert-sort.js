//插入排序
// 记住你是怎么打牌的就知道插入排序怎么实现了
//1. 首先有一个有序的序列，可以认为第一个元素就是已排序的序列
//2. 从未排序序列中取一个元素出来，往有序序列中找到合适的位置，如果该位置比元素大，则后移动, 否则继续往前找

const insertSort = (arr) => {
    for (let i = 1; i < arr.length; i++) {
        const curValue = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > curValue) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = curValue
    }

    return arr;
}