//基于promiseA+规范
//使用queueMicritask()微任务

//定义三个状态常量
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

//定义一个类，执行这个类的时候会传入一个执行器，这个执行器会立即执行
class MyPromise {
    constructor(exe){
        try{
            exe(this.resolve, this.reject)
        } catch(error) {
            this.reject(error)
        }
    }
    status = PENDING;

    value = null;
    reason = null;
    //储存成功失败回调
    onFulfilledCallbacks = [];
    onRejectedCallbacks = [];
    //使用箭头函数是为了让this指向当前实例对象
    resolve = (value) => {
        if (this.status = PENDING) {
            this.status = FULFILLED;
            this.value = value;
            //将所有成功的回调拿出来执行
            if (this.onFulfilledCallbacks.length) {
                this.onFulfilledCallbacks.shift()(value);
            }
        }
    };
    reject = (reason) => {
        if (this.status = PENDING) {
            this.status = REJECTED;
            this.reason = reason
            if (this.onRejectedCallbacks.length) {
                this.onRejectedCallbacks.shift()(reason);
            }
        }
    };
    then (onFulfilled, onRejected) {
        //处理函数可选择传或不传
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};
        const onFulfilledMiscrotask = () => {
            queueMicrotask(() => {
                try {
                    const x = onFulfilled(this.value);
                    resolvePromise(mypromise, x, resolve, reject);
                } catch (error) {
                    reject(error)
                }
            })
        }
        const onRejectMiscrotask = () => {
            queueMicrotask(() => {
                try {
                    const x = onRejected(this.reason);
                    resolvePromise(mypromise, x, resolve, reject);
                } catch (error) {
                    this.reject(error);
                }
            })
        }
        //为了链式调用这里直接返回一个mypromise
        const mypromise = new MyPromise((resolve, reject) => {
            if (this.status === FULFILLED) {
                onFulfilledMiscrotask();
            } else if (this.status === REJECTED) {
                onRejectMiscrotask();
            } else if (this.status === PENDING) {
                //将成功失败回调存储起来，等待后续调用
            this.onFulfilledCallbacks.push(onFulfilledMiscrotask);
            this.onRejectedCallbacks.push(onRejectMiscrotask);
            }
        })
        return mypromise;
    }
    //resolve 静态方法
    static resolve (param) {
        if (param instanceof MyPromise){
            return param;
        }
        return new MyPromise(resolve => {
            resolve(param)
        });
    }
    static reject (param) {
        return new MyPromise((resolve, reject) => {
            reject(reason);
        })
    }
}

//TODO: x 是否为 object 或者 function，满足则接着判断 x.then 是否存在，这里可以理解为判断 x 是否为 promise. 这些手写版暂时没有实现
function resolvePromise (mypromise, x, resolve, reject) {
    if (mypromise === x) {
        //说明return 的是自己，抛出类型错误并返回
        return reject(new TypeError('Chaining cycle detected for promise #<promise>'))
    }
    if (x instanceof MyPromise) {
        x.then(resolve, reject)
    } else{
        resolve(x)
    }
}

