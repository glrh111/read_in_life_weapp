function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 格式化timestamp。末尾为毫秒
function format_timestamp(timestamp) {
    if (!timestamp) {
        return ''
    } else {
        var new_date = new Date();
        new_date.setTime(timestamp);
        return formatTime(new_date)
    }

}

// 检查用户输入的用户名是否是有效的
// 1. 不为空
// 2. 只包含英文字母和阿拉伯数字
function check_username_available(username) {
    if (!username) {
        return {
            success: false,
            message: '用户名不能为空'
        }
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        return {
            success: false,
            message: '用户名只能包含英文字母和数字'
        }
    }
    return {
        success: true,
        message: '用户名合规'
    }
}


// 检查用户输入的用户名是否是有效的
// 1. 不为空
// 2. 只包含英文字母，数字和标点符号。
// 3. 长度至少为3
function check_password_available(password) {
    if (!password) {
        return {
            success: false,
            message: '密码不能为空'
        }
    }
    if (!/^[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/.test(password)) {
        return {
            success: false,
            message: '密码只能包含英文字母，数字和标点符号。'
        }
    }
    if (password.length<3) {
        return {
            success: false,
            message: '密码长度不小于3。'
        }
    }
    return {
        success: true,
        message: '密码合规'
    }
}



function get_api_url(path) {
    return getApp().globalData.api_host + path
}


// 储存当前页面位置
function save_before_login_path(path) {
    
    if (!path) {
        var i = getCurrentPages();
        path = '/'+i[i.length - 1].__route__;
    }
    console.log('save path', path);
    wx.setStorageSync('before_login_path', path);
}

// 跳转到存储的页面位置
function skip_to_before_login_path() {
    // 重加载到特定页面。全部页面出栈。
    var before_login_path = wx.getStorageSync('before_login_path');
    console.log('get path', before_login_path);
    var index_url = '/pages/index/index';
    if (before_login_path) {
        wx.reLaunch({
            url: before_login_path,
            fail: function(e) {
                console.log(e);
                save_before_login_path(index_url);
            }
        })
    } else {
        // 调到我的页面
        wx.redirectTo({
            url: index_url,
        })
    }
}

module.exports = {
  formatTime: formatTime,

  format_timestamp: format_timestamp,

  check_username_available: check_username_available,
  check_password_available: check_password_available,
  get_api_url: get_api_url,

  save_before_login_path: save_before_login_path,
  skip_to_before_login_path: skip_to_before_login_path
}
