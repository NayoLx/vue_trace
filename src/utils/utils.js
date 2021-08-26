export function stringify(data) {
    let ret = ''
    for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    ret = ret.substring(0, ret.lastIndexOf('&'))
    return ret
}

export default {
    stringify
}