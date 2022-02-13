//节流函数：在规定时间里，只执行一次。
//1.用settimeout
 const throttle = (fn, delay) => {
     let flag = false;
    return (...args) => {
        if (!flag) {
            flag = true;
            setTimeout(() => {
                flag = false;
                fn.call(this, ...args);
            }, delay)
        }
    }
 }

 //2.基于时间戳
 function thrittle2(fn, delay) {
     let startime = Date.now();
     return function(...args) {
        let nowTime = Date.now();
        if (nowTime - startime > delay) {
            fn.apply(this, args)
            startime = Date.now();
        }
     }
 }