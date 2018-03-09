// (取出空格函数) type 1-所有空格，2-前后空格，3-前空格，4-后空格
function trim(str, type) {
    switch (type) {
        case 1: return str.replace(/\s+/g, "");
        case 2: return str.replace(/(^\s*)|(\s*$)/g, "");
        case 3: return str.replace(/(^\s*)/g, "");
        case 4: return str.replace(/(\s*$)/g, "");
        default: return str;
    }
}

// (大小写转换)type：1:首字母大写2：首页母小写3：大小写转换4：全部大写5：全部小写
let str = "sdfwwerasfddffddeerAasdgFegqer";
function changeCase(str, type) {
    //下面主要根据传入的type值来匹配各个场景
    switch (type) {
        //当匹配
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

