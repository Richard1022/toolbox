/**
 * 1.(函数参数必填默认值)
 * @param {string} arg 参数名
 * @return 抛出错误
 */
export const required = (arg) => {
    throw new Error(`arguments ${arg || ''} is required`)
};

//=======================================================================================================================================

/**
 * 2.(对象是否有iterator接口)
 * @param {object} obj 判断的对象
 * @return {boolean} true迭代器对象/false非迭代器对象 
 */
export const isIterator = (obj) => {
    return Symbol.iterator in obj
}

//======================================================================================================================================

/**
 * 3.(对象类型判断)
 * @param {object} obj 要判断类型的对象
 * @return {string} 类型字符串
 * @example  const toString = Object.prototype.toString // toString.call(obj)
 */
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


// ================================================================================================================================================

/**
 * 为了避免1.某些间隔被跳过
 *        2.间隔可能比预期的小 这个两个问题
 * 你可以使用链式setTimeout()调用
 */
setTimeout(function () {
    TODO();
    setTimeout(arguments.callee, interval);
}, interval)

// =====================================================================================================================================

/**
 * 5.函数节流
 * @param { function } method 使用节流的函数
 * @param { context } context 执行上下文
 * @return void
 */

function throttle(method, context) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function () {
        method.call(context);
    }, 100)
}

/**
 * @example call没有指定运行上下文 默认为全局global
 * function resizeDiv() {
 *  let div = document.getElementById('div');
 *   div.style.height = div.offsetWidth + "px";
 *  }
 * window.onresize = function () {
 *   throttle(resizeDiv);
 *}
 */

//======================================================================================================================================