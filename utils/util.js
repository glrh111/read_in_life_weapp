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

function get_api_url(path) {
    return getApp().globalData.api_host + path
}

module.exports = {
  formatTime: formatTime,
  check_username_available: check_username_available,
  get_api_url: get_api_url
}
