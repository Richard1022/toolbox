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
