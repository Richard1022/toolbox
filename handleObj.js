// 1.对象深拷贝
function clone(obj) {
    if (obj === null) return null
    if (typeof obj !== 'object') return obj;
    if (obj.constructor === Date) return new Date(obj);
    if (obj.constructor === RegExp) return new RegExp(obj);
    var newObj = new obj.constructor();  //保持继承链
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {   //不遍历其原型链上的属性
            var val = obj[key];
            newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; // 使用arguments.callee解除与函数名的耦合
        }
    }
    return newObj;
};


// 2.对象浅复制
function shadowCopy(obj) {
    if (typeof obj !== 'object') return;
    var newObj;
    if (obj.constructor === Array) {
        newObj = [];
    } else {
        newObj = {};
        newObj.constructor = obj.constructor;//保留对象的constructor属性
    }
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            newObj[prop] = obj[prop];
        }
    }
    return newObj;
}


// 3.类型判断
const classType = {};
// 生成一个classType的映射
'Boolean Number String Function Array Date Regexp Object Error Null undefined '.split(' ').map((item) => {
    classType[`[object ${item}]`] = item.toLowerCase();
});

function type(obj) {
    return typeof obj === 'object' || typeof obj === 'function' ?
        classType[Object.prototype.toString.call(obj)] || 'object' :
        typeof obj;
}
// console.log(type(new Date())) // 'date'

// 4.判断是否是空对象 只针对{}, 特殊情况请用type函数过滤
function isEmptyObject(obj) {
    for (let name in obj) {
        return false;
    }
    return true;
}

// 5. 判断是否为window 对象
function isWindow(obj) {
    return obj != null && obj === obj.window;
}

// 6.终极继承
function inherit(child, parent) {
    // 继承父类的原型
    const parentPrototype = Object.create(parent.prototype)
    // 将父类原型和子类原型合并，并赋值给子类的原型
    child.prototype = Object.assign(parentPrototype, child.prototype)
    // 重写被污染的子类的constructor
    parentPrototype.constructor = child
}
// GithubUser, 父类
function GithubUser(username, password) {
    let _password = password
    this.username = username
    GithubUser.prototype.login = function () {
        console.log(this.username + '要登录Github，密码是' + _password)
    }
}
// GithubUser, 子类
function JuejinUser(username, password) {
    GithubUser.call(this, username, password) // 继承属性
    this.articles = 3 // 文章数量
}
// 实现原型上的方法
inherit(JuejinUser, GithubUser)
// 在原型上添加新方法
JuejinUser.prototype.readArticle = function () {
    console.log('Read article')
}
const juejinUser1 = new JuejinUser('ulivz', 'xxx')

