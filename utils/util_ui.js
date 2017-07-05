// 每次加载小程序的时候，获取登录状态
// 如果获取不到，“我的”页面会显示不同。
function show_ok_message(title,message) {
    wx.showModal({
        title: title,
        content: message,
        showCancel: false,
        confirmText: '明白'
    })
}

// 提示成功. 不好用。直接使用这个wx
function show_success_message(title, success_callback, duration) {
    if (!title) {
        title = '操作成功';
    }
    if (!duration) {
        duration = 1000;
    }
    if (!success_callback) {
        success_callback = function(){};
    }
    wx.showToast({
        title: title,
        duration: duration,
        success: success_callback()
    });
}


module.exports = {
    show_ok_message: show_ok_message
}