//promise.resolve()，将返回一个以给定值解析后的promise对象
//1.如果这个值是一个promise,将返回这个promise
//2.如果这个值是一个thenable对象(即带有‘then‘方法)，返回的promise会跟随这个对象，采用它的最终状态；否则返回的promise将以此值完成；
Promise.myResolve = function (value) {
    if (value && typeof value === 'object' && value instanceof Promise) {
        return value
    }
    //否则其他情况下一律再通过Promise包装一下
    return new Promise((resolve) => {
        resolve(value)
    })
}
//promise.reject(),返回带有拒绝原因的Promise 对象
Promise.myReject = function (value) {
    //只要返回一个新的promise，并且将结果状态设置为拒绝就可以
    return new Promise((_, reject) => {
        reject(value)
    })
}

//Promise.all()
//const p = Promise.all([p1, p2, p3])
//1.用于将多个promise实例，包装成一个新的Promise实例；
//2.传入的promise状态都变成fulfilled,p的状态才会变成fulfilled，此时传入参数的返回值组成一个数组，传递给p的回调函数
//3.有一个被rejected,p的状态就会变成rejected，此时第一个被reject的返回值，会传递给p的回调函数

Promise.myAll = (promise) => {
    return new Promise((rs, rj) => {
        //计数器
        let count = 0;
        //存放结果
        let result = [];
        const len = promise.length;
        if (len === 0) {
            return rs([])
        }

        promise.forEach((p, i) => {
            //有的数组项可能不是promise，需要手动转化一下
            Promise.resolve(p).then((res) => {
                count += 1;
                result[i] = res;
                if (count === len) {
                    rs(result)
                }
                //只要有一个失败，那么我们自己返回的promise也会失败
            }).catch(rj)
        })
    })
}

//promise.race()，同样是将多个promise实例，包装成一个新的promise实例
//只要参数中有一个promise实例率先改变状态，p的状态就跟着改变。那个率先改变的promise实例的返回值，就传递给p的回调函数
Promise.myRace = (promise) => {
    return new Promise((rs, rj) => {
        promise.forEach(p => {
            //对p进行一次包装，防止非promise对象
            //对其进行监听，将我们自己返回的Promise的resolve，reject传递给p，哪个先改变状态，我们返回的promise也将会是哪个状态
            Promise.resolve(p).then(rs).catch(rj)
        })
    })
}

//参考：https://mp.weixin.qq.com/s/-YlCc-AsQ19sTHtsMyG-3g