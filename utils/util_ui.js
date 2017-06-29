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


module.exports = {
    show_ok_message: show_ok_message
}