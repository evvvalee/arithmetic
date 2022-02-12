//使用setTimeout来实现setInterval

//定时器的定时，不是表示定时执行，而是到达间隔时间之后将执行代码推到消息队列
// 可以这么理解：每个 setTimeout 产生的任务会直接 push 到任务队列中；而 setInterval 在每次把任务 push 到任务队列前，都要进行一下判断(看上次的任务是否仍在队列中，如果有则不添加，没有则添加)。
// 因此setInterval的缺点也很明显
// 1.使用 setInterval 时，某些间隔会被跳过；
// 2.可能多个定时器会连续执行；
// 因而我们一般用 setTimeout 模拟 setInterval，来规避掉上面的缺点。

const toSetInterval = (fn, delay) => {
    let timer;
    const interval = () => {
        timer = setTimeout(() => {
            fn();
            interval()
        }, delay)
    };
    interval();
    return () => clearTimeout(timer)
};

const mysetInterval = toSetInterval(() => {
    console.log(1)
  }, 300)

//参考：https://github.com/qianlongo/fe-handwriting/blob/master/4.setTimeout-interval.js
//     https://juejin.cn/post/6914201197620494350