import { type } from './common';

// 1. 柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。
function curry(fn, args) {
    var length = fn.length;
    args = args || [];
    return function () {
        var _args = args.slice(0),
            arg, i;
        for (i = 0; i < arguments.length; i++) {
            arg = arguments[i];
            _args.push(arg);
        }
        if (_args.length < length) {
            return curry.call(this, fn, _args);
        }
        else {
            return fn.apply(this, _args);
        }
    }
}
var fn = curry(function (a, b, c) {
    console.log([a, b, c]);
});
fn("a", "b", "c") // ["a", "b", "c"]
fn("a", "b")("c") // ["a", "b", "c"]
fn("a")("b")("c") // ["a", "b", "c"]
fn("a")("b", "c") // ["a", "b", "c"]

// function square(i) {
//     return i * i;
// }
// function dubble(i) {
//     return i *= 2;
// }
// function map(handeler, list) {
//     return list.map(handeler);
// }
// var mapSQ = curry(map, square);
// mapSQ([1, 2, 3, 4, 5]);
// mapSQ([6, 7, 8, 9, 10]);
// mapSQ([10, 20, 30, 40, 50]);
// var mapDB = curry(map, dubble);
// mapDB([1, 2, 3, 4, 5]);
// mapDB([6, 7, 8, 9, 10]);
// mapDB([10, 20, 30, 40, 50]);

// 2. 组合函数
function compose() {
    // 获取要compose的 函数名数组
    var args = arguments;
    // 从右往左执行 获取参数的起始值
    var start = args.length - 1;
    // 匿名函数this指向
    return function () {
        var i = start;
        // apply 参数为数组
        // result 为 右侧第一个函数执行结果
        var result = args[start].apply(this, arguments);
        while (i--) {
            result = args[i].call(this, result)
        }
        return result;
    };
};
function hello(x) {
    return `hello ${x}`
};
function toBig(x) {
    return x.toUpperCase();
}
let composeFun = compose(hello, toBig)

// 3. 函数记忆
// description: 把上次计算的结果缓存起来,当下次调用时,如果遇到相同参数,就直接返回缓存中的数据
function memory(func) {
    if (!type(func) === 'function') {
        throw 'arg is not function'
    }
    // 声明一个闭包缓存函数执行结果
    let cache = {};
    return function () {
        // arguments 为对象 长度一样 则需要重写key 规则
        let key = arguments.length + Array.prototype.join.call(arguments, ',')
        if (cache[key]) {
            return cache[key];
        } else {
            return cache[key] = func.apply(this, arguments);
        }
    }
}
// 参数为对象版
// var memoize = function (func, hasher) {
//     var memoize = function (key) {
//         var cache = memoize.cache;
//         var address = '' + (hasher ? hasher.apply(this, arguments) : key);
//         if (!cache[address]) {
//             cache[address] = func.apply(this, arguments);
//         }
//         return cache[address];
//     };
//     memoize.cache = {};
//     return memoize;
// };