//setInterval:每间隔给定周期将代码推到消息队列
//参数：执行函数, [间隔时间], [执行函数的参数列表]
//手写:
const mysetInterval = (fn, delay,...args) => {
    let begin = +new Date();
    const config = {
        shouldStop: false
    };
    let now;
    const loop = () => {
        if (!config.shouldStop) {
            now = +new Date();
            if (now - begin > delay) {
                fn.apply(this, args);
                begin = +new Date();
            }
            //非阻塞方案(在消息队列添加待执行的任务，而不阻塞主线程)
            //在浏览器环境中可使用requestAnimationFrame()，在nodejs环境中可使用setImmediate()
            if (typeof window === 'undefined') {
                setImmediate(loop);
            } else {
                window.requestAnimationFrame(loop);
            }
        }
    }
    loop();
    return config;
}
//清除定时器
const myClearInterval = config => { config.shouldStop = true; };

