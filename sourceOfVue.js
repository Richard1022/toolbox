
function defineReact(obj, prop, value) {
    // 创建一个订阅者对象
    let dep = new Dep();
    Object.defineProperty(obj, prop, {
        enumerable: true,  // 属性的可枚举性 默认为false
        configurable: true, // 属性可修改 删除 默认为false
        get() {
            /* 将Dep.target（即当前的Watcher对象存入dep的subs中） */
            dep.addSub(Dep.target);
            return value;
        },
        set(newVal) {
            if (newVal === value) {
                return
            }
            // console.log(`${value}改变为${newVal},这里可以放响应式操作`);
            /* 在set的时候触发dep的notify来通知所有的Watcher对象更新视图 */
            dep.notify();
        }
    })
}

function observer(obj) {
    if (!obj || typeof obj !== 'object') {
        return;
    }
    Object.keys(obj).forEach((key) => {
        // 添加响应式方法
        defineReact(obj, key, obj[key]);
    })
}

// 订阅者Dep
class Dep {
    constructor() {
        // 用来存放watcher对象的数组
        this.subs = [];
    }
    // 用来在subs中添加一个watcher对象
    addSub(sub) {
        this.subs.push(sub);
    }
    // 通知watcher对象更新视图
    notify() {
        this.subs.forEach((item) => {
            item.update();
        })
    }
}

class Watcher {
    constructor() {
        /* 在new一个Watcher对象时将该对象赋值给Dep.target，在get中会用到 */
        Dep.target = this;
    }

    /* 更新视图的方法 */
    update() {
        console.log("视图更新啦～");
    }
}
class Vue {
    constructor(opt) {
        this._data = opt.data;
        // 遍历data属性，添加响应式方法
        observer(this._data);
        /* 新建一个Watcher观察者对象，这时候Dep.target会指向这个Watcher对象 */
        new Watcher();
        /* 在这里模拟render的过程，为了触发test属性的get函数 */
        console.log('render~', this._data.test);
    }
}

// template => render function 
// parse 将template 通过正则解析成ATS抽象语法树
// optmize 将AST语法树中标记处静态节点
// generate 将抽象语法树变成可执行的 render函数


