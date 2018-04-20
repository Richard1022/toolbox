// 1.数组去重
var array = [1, 2, 1, 1, '1'];
//通过 indexOf首次出现的位置,实现去重
// function unique(array) {
//     var res = array.filter(function (item, index, array) {
//         return array.indexOf(item) === index; 
//     })
//     return res;
// }
function unique(array) {
    return Array.from(new Set(array));
}
console.log(unique(array));

//2.求数组最大值
Math.max(...arr)

//3. 数组扁平化
function flatten(arr) {
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
[1, [2, [3, 4]]].toString() // "1,2,3,4"
// reduce 扁平化
function flattenByReduce(arr) {
    return arr.reduce((prev, next) => {
        return prev.concat(Array.isArray(next) ? flattenByReduce(next) : next)
    }, [])
}
// 展开运算符
function flattenByExpand(arr) {
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
function shuffle(arr) {
    // i 为数组长度 递减 0<= 结束循环
    for (let i = arr.length; i; i--) {
        // 声明一个 数组的随机索引
        let j = Math.floor(Math.random() * i)
        // 通过结构赋值 交换 遍历项和 交换项位置
        [arr[i], arr[j]] = [arr[j], [arr[i]]]
    }
    return arr
}

// 6. 处理数组中对象指定属性去重
function propUnique(arr, prop) {
    // 创建一个哈希索引,若对象中的属性已存在跳过
    var hash = {};
    let ret = arr.reduce(function (item, next) {
        // 字符串作为属性参数一定要用[]包裹
        hash[next[prop]] ? '' : hash[next[prop]] = true && item.push(next);
        return item
    }, [])
    return ret
}

// 7. 数组对象指定属性值排序
let testData = [
    {
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

let handelData = [...testData]
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
console.log(handelData.sort(compare('order')));
