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
