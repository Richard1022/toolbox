// required arguments
export const required = (arg) => { throw new Error(`arguments ${arg || ''} is required`) };

// 判断对象是否有iterator接口
export const isIterator = (obj) => {
    return Symbol.iterator in obj
}
// 对象类型判断
export function type(obj) {
    const classType = {};
    // 生成一个classType的映射
    'Boolean Number String Function Array Date Regexp Object Error Null undefined '.split(' ').map((item) => {
        classType[`[object ${item}]`] = item.toLowerCase();
    });
    return typeof obj === 'object' || typeof obj === 'function' ?
        classType[Object.prototype.toString.call(obj)] || 'object' :
        typeof obj;
}

export const toString = Object.prototype.toString
type.call('richard')

// 为了避免1.某些间隔被跳过2.间隔可能比预期的小 这个两个问题
// 你可以使用链式setTimeout()调用
setTimeout(function () {
    TODO();

    setTimeout(arguments.callee, interval);
}, interval)

// 函数节流
function throttle(method, context) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function () {
        method.call(context);
    }, 100)
}
// 测试用例
function resizeDiv() {
    let div = document.getElementById('div');
    div.style.height = div.offsetWidth + "px";
}
// call没有指定运行上下文 默认为全局global
window.onresize = function () {
    throttle(resizeDiv);
}



