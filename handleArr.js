/**
 * 1.(数组去重)
 * @param {array} array 要去重的数组
 */
// 通过 indexOf首次出现的位置, 实现去重
function unique(array) {
    var res = array.filter(function (item, index, array) {
        return array.indexOf(item) === index;
    })
    return res;
}

function unique(array) {
    return Array.from(new Set(array))
}

// ===========================================================================================================================

/**
 * 2.(求数组最大值)
 * @param {array} arr 求最大值数组
 */
Math.max(...arr)

// ===========================================================================================================================

/**
 * 3.(数组扁平化)
 * @param {array} arr 需要扁平化的数组
 * @return {array} 扁平化之后的数组
 */
function flatten(arr) {
    if (!Array.isArray(arr)) {
        throw `arg is not Array`
    }
    let result = []
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(arguments.callee(arr[i]))
        } else {
            result.push(arr[i])
        }
    }
    return result
}
// reduce 扁平化
function flattenByReduce(arr) {
    if (!Array.isArray(arr)) {
      throw new Error('arg is not Array');
    }
    return arr.reduce((prev, next) => prev.concat(Array.isArray(next) ? flattenByReduce(next) : next), []);
  }
// 展开运算符
function flattenByExpand(arr) {
    if (!Array.isArray(arr)) {
        throw `arg is not Array`
    }
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}

// 4. 数组寻找指定索引
arr.findIndex((item, index, self) => {
    return item > 0
})

// 5. 数组随机插入时式乱序
let arr = [1, 2, 3, 4, 5, 6, 7, 8];

function shuffle(arr = required('arr')) {
    if (!Array.isArray(arr)) {
        throw `${arr} is not array`
    }
    for (let i = arr.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
    }
    return arr;
}

// 6. 处理数组中对象指定属性去重
function propUnique(arr = required('arr'), prop = required('prop')) {
    if (!Array.isArray(arr)) {
        throw `${arr} is not Array`;
    }
    if (!typeof prop === 'string' && !prop.length) {
        throw `please checkout ${prop} is legal String`
    }
    let hash = {};
    return arr.reduce((prev, next) => {
        hash[next[prop]] ? '' : hash[next[prop]] = true && prev.push(next);
        return prev;
    }, [])
}

// 7. 数组对象指定属性值排序
let testData = [{
        sign: 1,
        size: {
            size_code: "M",
            size_id: "8672b0f7-1892-4743-8fb9-8a341649de9a",
            size_name: "M",
            order: 10
        },
    },
    {
        sign: 0,
        size: {
            size_code: "S",
            size_id: "8672b0f7-1892-4743-8fb9-8a341649de9a",
            size_name: "S",
            order: 5
        },
    },
    {
        sign: 2,
        size: {
            size_code: "L",
            size_id: "8672b0f7-1892-4743-8fb9-8a341649de9a",
            size_name: "L",
            order: 15
        },
    }
]

let handelData = [...testData];
handelData.forEach((item, index, self) => {
    self[index].order = item.size.order
})

function compare(prop) {
    return function (a, b) {
        let valueA = a[prop];
        let valueB = b[prop];
        return valueA - valueB;
    }
}
handelData.sort((() => (a, b) => a.order - b.order)());
console.log(handelData.sort(compare('order')));