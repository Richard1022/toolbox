/**
 * 1.(取出空格函数) 
 * type 1-所有空格
 *      2-前后空格
 *      3-前空格
 *      4-后空格
 * @param {string} str 处理的字符串
 * @param {number} type 处理方式
 * @return {string} 去除空格后的字符串
 */
export function trim(str, type) {
    switch (type) {
        case 1:
            return str.replace(/\s+/g, "");
        case 2:
            return str.replace(/(^\s*)|(\s*$)/g, "");
        case 3:
            return str.replace(/(^\s*)/g, "");
        case 4:
            return str.replace(/(\s*$)/g, "");
        default:
            return str;
    }
}


/**
 * 2.(大小写转换)
 * type：1:首字母大写
 *       2：首页母小写
 *       3：大小写转换
 *       4：全部大写    
 *       5：全部小写
 * @param {string} str 处理的字符串
 * @param {number} type 处理方式
 * @return {string} 处理完成的字符串
 */
export function changeCase(str, type) {
    switch (type) {
        case 1:
            return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
                //v=验证本身  v1=s ; v2=dfwwerasfddffddeerAasdgFegqer
                return v1.toUpperCase() + v2.toLowerCase();
            });
        case 2:
            return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
                //v=验证本身  v1=s ; v2=dfwwerasfddffddeerAasdgFegqer
                return v1.toLowerCase() + v2.toUpperCase();
            });
        case 3:
            return ToggleCase(str);
        case 4:
            return str.toUpperCase();
        case 5:
            return str.toLowerCase();
        default:
            return str;
    }
}

/**
 * 3. code指定长度末尾截取，否则补零
 * @param {number} code 需要处理的字符串活数字
 * @param {number} len 长度控制
 * @return {string} 处理之后的字符串
 */
export function handleCode(code, len) {
    let ret = String(code);
    if (ret.length > len) {
      ret = ret.slice(-len);
    } else if (ret.length < len) {
      while (ret.length < len) {
        ret = `0${ret}`;
      }
    }
    return ret;
  }