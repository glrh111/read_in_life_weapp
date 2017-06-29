// 每次加载小程序的时候，获取登录状态
// 如果获取不到，“我的”页面会显示不同。
var util_ui = require("util_ui.js");

function net_fail(message) {
    if (!message) {
        message = '网路错误，请稍后再试'
    }
    util_ui.show_ok_message('网络错误', message);
}

function net_loading() {
    wx.showLoading({
        title: '正在加载'
    });
}

module.exports = {
    net_fail: net_fail,
    net_loading: net_loading
}