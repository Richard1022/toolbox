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
