// 记录Promise的三种状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

/**
 * 运行一个微队列函数
 * @param {Function} callback 原始函数
 */
function runMicroTask(callback) {
  if (process) {
    // Node环境
    return process.nextTick(callback);
  } else if (document && MutationObserver) {
    // 浏览器环境
    const div = document.createElement("div");
    const observer = new MutationObserver(callback);
    observer.observer(div, {
      childList: true,
    });
    div.innerHTML = "1";
  } else {
    setTimeout(callback, 0);
  }
}

/**
 * 判断一个对象是不是Promise对象
 * A+规范：1. 是一个对象；2. 必须包含一个then方法
 * @param {any} obj
 * @return {boolean}
 */
function isPromiseLike(obj) {
  return !!obj && typeof obj === "object" && typeof obj.then === "function";
}

class MyPromise {
  /**
   * 创建一个Promise
   * @param {Function} executor 任务执行器，立即执行
   */
  constructor(executor) {
    this._state = PENDING; // 状态
    this._value = undefined; // 数据
    this._handlers = []; // 执行函数形成的队列
    // runMicroTask(() => {
    try {
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (error) {
      this._reject(error);
    }
    // });
  }

  /**
   * 改变状态和数据
   * @param {any} newState 新的状态
   * @param {any} value 新的数据
   */
  _changeState(newState, value) {
    if (this._state !== PENDING) return;
    this._state = newState;
    this._value = value;
  }

  /**
   * 标记当前任务完成
   * @param {any} data 任务完成的相关参数
   */
  _resolve(data) {
    this._changeState(FULFILLED, data);
    this._runHandlers();
  }

  /**
   * 标记当前任务失败
   * @param {any} reason 任务失败的相关数据
   */
  _reject(reason) {
    this._changeState(REJECTED, reason);
    this._runHandlers();
  }

  /**
   * 向处理队列添加处理函数
   * @param {Function} executor 处理函数
   * @param {any} state 该函数什么时候执行
   * @param {Function} resolve 让then函数返回的Promise成功
   * @param {Function} reject 让then函数返回的Promise失败
   */
  _pushHandlers(executor, state, resolve, reject) {
    this._handlers.push({
      executor,
      state,
      resolve,
      reject,
    });
  }

  /**
   * 调用then的处理函数
   */
  _runHandlers() {
    // 目前任务仍在挂起
    if (this._state === PENDING) return;
    while (this._handlers[0]) {
      this._runOneHandler(this._handlers[0]);
      this._handlers.shift();
    }
  }

  /**
   * 执行单个处理函数
   * @param {Object} handler
   */
  _runOneHandler({ executor, state, resolve, reject }) {
    runMicroTask(() => {
      if (state !== this._state) {
        // 处理器的状态和当前不一致
        return;
      }
      if (typeof executor !== "function") {
        // 处理器不是一个函数，让then返回的promise和当前的状态保持一致
        this._state === FULFILLED ? resolve(this._value) : reject(this._value);
      }
      try {
        const result = executor(this._value);
        if (isPromiseLike(result)) {
          result.then(resolve, reject);
        } else {
          resolve(result);
        }
      } catch (error) {
        handler.reject(error);
      }
    });
  }

  /**
   * Promise A+规范的then函数
   * @param {Function} onFulfilled 成功回调
   * @param {Function} onRejected 失败回调
   * @return {Promise} 返回新的Promise对象
   */
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this._pushHandlers(onFulfilled, FULFILLED, resolve, reject);
      this._pushHandlers(onRejected, REJECTED, resolve, reject);
      this._runHandlers(); // 执行队列
    });
  }

  /**
   * ES6 Promise的catch方法
   */
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  /**
   * ES6 Promise的resolve方法
   * @param {any} 传入的值
   */
  resolve(value) {
    if (value instanceof Promise) {
      return value;
    } else if (isPromiseLike(value)) {
      return new MyPromise((resolve, reject) => {
        value.then(resolve, reject);
      });
    } else {
      return new Promise((resolve) => resolve(value));
    }
  }

  /**
   * ES6 Promise的reject方法
   * @param {reason} 传入的值
   */
  reject(reason) {
    return new Promise((resolve, reject) => reject(reason));
  }

  /**
   * ES6 Promise的finally方法
   */
  finally(onFinally) {
    return this.then(
      (value) => MyPromise.resolve(onFinally()).then(() => value),
      (err) =>
        MyPromise.resolve(onFinally()).then(() => {
          throw err;
        })
    );
  }
}

// const prom = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(123);
//   }, 1000);
// });

// prom
//   .then(
//     function A(data) {
//       console.log(1);
//       let prom2 = new MyPromise((resolve, reject) => {
//         setTimeout(() => {
//           resolve(2);
//         }, 2000);
//       });
//       return prom2;
//     },
//     function B(reason) {
//       console.log("失败", reason);
//     }
//   )
//   .then((e) => {
//     console.log("3", e);
//   });

// setTimeout(() => {
//   prom.then(function D(d) {
//     console.log("d", d);
//   });
// }, 2000);

module.exports = MyPromise;
