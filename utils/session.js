// 每次加载小程序的时候，获取登录状态
// 如果获取不到，“我的”页面会显示不同。
function get_session () {
    return false
}

// weapp或者用户名登录成功的时候，会存储session到本地。
function save_session(session_value) {
    return
}

// 手动退出的时候使用。
function remove_session() {
    return false
}

module.exports = {
    get_session: get_session,
    save_session: save_session,
    remove_session: remove_session
}