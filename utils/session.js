// 每次加载小程序的时候，获取登录状态
// 如果获取不到，“我的”页面会显示不同。

// 用户主动登录，或者触发需要登录的操作 save_path and login
// login 成功：login_success
// 进入app：检查session，请求用户信息。如果session失效，remove_session


var util = require('util.js');

// 从服务器返回值里边取得session值
function parse_session (res) {

    var cookie_str = res.header['Set-Cookie'];

    if (cookie_str) {
        return cookie_str.split(';')[0].split('=')[1]
    } else {
        return ''
    }
}

// weapp或者用户名登录成功的时候，会存储session到本地。
function save_session(res) {

    var session = parse_session(res);

    console.log('get session: ', session);

    wx.setStorageSync('session', session);
    
}

// 
function get_session() {
    return wx.getStorageSync('session') || '';
}

function get_cookie_value() {
    return 'session=' + get_session() + ';'
}


// 手动退出的时候使用。
function remove_session() {
    wx.removeStorageSync('session');
    return true
}


function login_before() {
    util.save_before_login_path();
    return true;
}

function login_success(res) {


    save_session(res);

    wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1500,
        complete: function() {
            // 跳转
            util.skip_to_before_login_path();
        }
    });
    
}

module.exports = {
    get_session: get_session,
    save_session: save_session,
    remove_session: remove_session, 
    login_success: login_success,
    get_cookie_value: get_cookie_value
}