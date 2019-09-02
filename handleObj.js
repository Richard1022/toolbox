/**
 * 1.(对象深拷贝)
 * @param {object} obj copy的对象
 * @return {object} 深拷贝返回对象
 */
export function deepCloneJson(obj) {
    if (obj === null) return null;
    if (typeof obj !== 'object') return obj;
    if (obj.constructor === Date) return new Date(obj);
    if (obj.constructor === RegExp) return new RegExp(obj);
    const newObj = new obj.constructor(); // 保持继承链
    for (const key of Object.keys(obj)) {
      if (obj.hasOwnProperty(key)) { // 不遍历其原型链上的属性
        const val = obj[key];
        newObj[key] = typeof val === 'object' ? deepCloneJson(val) : val; // 使用arguments.callee解除与函数名的耦合
      }
    }
    return newObj;
  }


/**
 * 2.(对象浅拷贝)
 * @param {object} obj copy的对象
 * @return {object} 浅拷贝返回对象
 */
export function shadowCopy(obj) {
    if (typeof obj !== 'object') return;
    var newObj;
    if (obj.constructor === Array) {
        newObj = [];
    } else {
        newObj = {};
        newObj.constructor = obj.constructor; //保留对象的constructor属性
    }
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            newObj[prop] = obj[prop];
        }
    }
    return newObj;
}


/**
 * 3.(是否是空对象) 只针对{}, 特殊情况请用type函数过滤
 * @param {object} obj 判断的对象
 * @return {boolean} true空对象/false非空对象 
 */
export function isEmptyObject(obj) {
    for (let name in obj) {
        return false;
    }
    return true;
}


/**
 * 4.(判断是否为window 对象)
 * @param {object} obj 判断的对象
 * @return {boolean} true window对象/false 非window对象 
 */
export function isWindow(obj) {
    return obj != null && obj === obj.window;
}


/**
 * 
 * ES5 继承
 */
function Person(name) {
    this.name = name;
}
Person.prototype.sayName = function () {
    console.log(this.name);
}

function Richard(name) {
    Person.call(this, name);
    this.hobby = 'money';
}
Richard.prototype = Object.create(Person.prototype, {
    constructor: {
        value: Richard,
        enumerable: true,
        configurable: true,
        writable: true
    }
});


/**
 * 删除对象空值属性
 * @param {object} obj 要删除空值的对象
 */
export function dealElement(obj) {
    var param = {}
    if (obj === null || obj === undefined || obj === '') return param
    for (var key in obj) {
      if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
        param[key] = obj[key]
      }
    }
    return param
  }

  /**
 * 10.判断对象属性是否有空值
 * @param {object} obj 需要判断的对象
 * @returns {boolean} 是否有空值
 */
export function propHasEmpty(obj) {
    return Object.values(obj).some(item => (item === ''))
  }