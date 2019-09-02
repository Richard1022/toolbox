export const validatePhone = (rule, value, callback) => {
    var TEL_REGEXP = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
    if (!TEL_REGEXP.test(value)) {
        callback(new Error('请输入争取手机号'))
    } else {
        callback()
    }
}
