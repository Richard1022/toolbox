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