import { Message } from "element-ui";
// const { ipcRenderer } = require("electron");

export function stringify(data) {
    let ret = ''
    for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    ret = ret.substring(0, ret.lastIndexOf('&'))
    return ret
}

export function ShowToast({ msg, isBack }) {
    Message({
        type: "error",
        message: msg,
    });
    if (isBack == true) {
        setTimeout(function () {
            // ipcRenderer.send("resize-window", 300, 480);
            location.replace("/"); //返回登录
        }, 1000);
    }
}

export function getData() {
    var json = require('../../data.json');
    return json;
}

export default {
    stringify,
    ShowToast,
    getData,
}