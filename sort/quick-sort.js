//快速排序
//1.在数据集之中，选择一个元素作为"基准"（pivot）。
//2.所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。
//3.对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。

const quickSort = (arr) => {
    if (arr.length <= 1) return arr;
    //选择一个基准
    const pivotIndex = Math.floor(arr.length / 2);
    const pivotValue = arr.splice(pivotIndex, 1)[0];
    let leftArr = [];
    let rightArr = [];
    for (let i = 0;i <= arr.length; i++) {
        if (arr[i] > pivotValue) {
            leftArr.push(arr[i]);
        } else {
            rightArr.push(arr[i]);
        }
    }
    //递归使用
    return quickSort(leftArr).concat([ pivotValue ],quickSort(rightArr))

}

//https://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html