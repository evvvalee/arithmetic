//防抖函数： 一定时间内只执行最后一次
const debounce = (fn, delay) => {
    if (typeof fn !== 'function') {
        throw new TypeError('fn is not a function');
    }
    let lastFn = null;
    return function(...args) {
        clearTimeout(lastFn)
        lastFn = setTimeout(() => {
            lastFn = null;
            fn.call(this, ...args);
        }, delay);
    }
}