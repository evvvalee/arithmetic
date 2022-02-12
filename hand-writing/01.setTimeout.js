//setTimeout定时器函数
//基础用法
//在浏览器中返回一个整数,在其他环境中,可能是其他的东西。表示定时器标识符,可使用该标识符来取消这个定时器
//接受参数： 执行的代码(setTimeout期望得到一个函数的引用), [延迟时间], [要传入被执行函数的参数列表]
const mysetTimeout = setTimeout(() => {
    console.log('mysetTimeout');
}, 1000);
clearTimeout(mysetTimeout);

//手写
let mySetTimeout = (fn, delay, ...args) => {
    //初始时间
    const begin = +new Date();
    let timer, now;
    const loop = () => {
        //window.requestAnimationFrame ,该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
        //返回一个标识符
        timer = window.requestAnimationFrame(loop);
        //再次运行时获取当前时间
        now = +new Date();
        if (now - begin >= delay) {
            fn.apply(this, args);
            window.cancelAnimationFrame(timer);
        }
    }
    window.requestAnimationFrame(loop)
}


//参考：https://github.com/sisterAn/JavaScript-Algorithms/issues/98
