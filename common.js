/**
 * 1.(函数参数必填默认值)
 * @param {string} arg 参数名
 * @return 抛出错误
 */
export const required = (arg) => {
    throw new Error(`arguments ${arg || ''} is required`)
};


/**
 * 2.(对象是否有iterator接口)
 * @param {object} obj 判断的对象
 * @return {boolean} true迭代器对象/false非迭代器对象 
 */
export const isIterator = (obj) => {
    return Symbol.iterator in obj
}


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


/**
 * 5.函数节流
 * @param { function } method 使用节流的函数
 * @param { context } context 执行上下文
 * @return void
 */

export function throttle(method, context) {
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


/**
*6.(创建guid)
* @returns GUID是一种由算法生成的二进制长度为128位的数字标识符
*/
export function createGuid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (`${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`);
}


/**
 * 7.(手机号正则验证)
 * @param {string} str 测试的手机号字符串
 */
export function isPhoneAvailable(str) {
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!reg.test(str)) {
        return false;
    } else {
        return true;
    }
}


/**
* 8.(get请求参数拼接)
* @param {string} url 借口基础url
* @param {object} payload query 对象参数
* @returns {string} 拼接参数之后的queryurl
*/
export function joinQueryStr(url = required(), payload) {
    if (type(url) !== 'string') {
        throw new Error(`url params must be stringtype ${url} is ${type(url)}`);
    }
    let retQueryStr = `${url}?`;
    for (const prop of Object.keys(payload)) {
        payload[prop] !== '' ? retQueryStr += `${prop}=${payload[prop]}&` : '';
    }
    return retQueryStr;
}


/**
* 9.(自定义格式化时间)
* @param {日期参数} time 需要格式化的时间戳
* @param {string} format yyyy/MM/dd hh:mm:ss 需要format的格式
* @returns {string} 格式化之后的时间字符串
*/
export function formatTime(time, format) {
    const dateTime = new Date(time);
    const o = {
        'M+': dateTime.getMonth() + 1, // month
        'd+': dateTime.getDate(), // day
        'h+': dateTime.getHours(), // hour
        'm+': dateTime.getMinutes(), // minute
        's+': dateTime.getSeconds(), // second
        'q+': Math.floor((dateTime.getMonth() + 3) / 3), // quarter
        S: dateTime.getMilliseconds(), // millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1,
            (`${dateTime.getFullYear()}`).substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
        if (new RegExp(`(${k})`).test(format)) {
            format = format.replace(RegExp.$1,
                RegExp.$1.length === 1 ? o[k] :
                    (`00${o[k]}`).substr((`${o[k]}`).length));
        }
    }
    return format;
}


/**
 * 10.判断对象属性是否有空值
 * @param {object} obj 需要判断的对象
 * @returns {boolean} 是否有空值
 */
export function propIsEmpty(obj) {
    return Object.values(obj).some(item => (item === ''));
}


/**
 * 11. 根据属性值获取选中项
 * @param {array} arr 寻找的数据源
 * @param {string} prop 属性名字符串
 * @param {值类型} value 属性值
 */
export function getItemWithSelect(arr, prop, value) {
    const copyArr = deepCloneJson(arr);
    return copyArr.find(i => i[prop] === value);
  }


  /**
 * 12. 根据对象数组属性的值来分割数组
 * @param {array} arr  需要分割的数组
 * @param {string} prop  分割的属性值
 * @return {object} 分割数组对象 key 为 去重后的属性值  值为当前chunk数组
 */
export function cutArrWithSameProps(arr = required(), prop = required()) {
    return arr.reduce((init, next) => {
      init[next[prop]] ? init[next[prop]].push(next) : init[next[prop]] = [next];
      return init;
    }, {});
  }