var util = require('../util.js');
var session = require('../session.js');
var net = require('../net.js');
var util_ui = require('../util_ui.js');


// 获取用户【本人】的信息
// 进入app的时候会请求
function get_my_user_info(that, field, success_callback, fail_callback) {
    var url = util.get_api_url('/user');
    wx.request({
        url: url,
        method: "GET",
        header: {
            'Cookie': session.get_cookie_value()
        },
        success: function(res) {
            var code = res.data.code;
            if (code==1) {
                var obj = {};
                obj[field] = res.data.user;
                that.setData(obj);
                if (success_callback) {
                    success_callback();
                }
            } else {
                // 需要登录验证
                if (fail_callback) {
                    fail_callback();
                }
            }
        },
        fail: function(res) {
            net.net_fail();
        }
    })
}

// 更新我的用户信息
// PUT /user/
// password: update_type=1
// other_info: update_type=2
function update_my_user_info(update_type, update_data, success_callback) {
    var url = util.get_api_url('/user');
    update_data.update_type = update_type;
    wx.request({
        url: url,
        method: "PUT",
        header: {
            'Cookie': session.get_cookie_value()
        },
        data: update_data,
        success: function (res) {
            var code = res.data.code;
            if (code == 1) {
                if (success_callback) {
                    success_callback();
                }
            } else {
                // 需要登录验证
                util_ui.show_ok_message("更新失败", "请妥善保存输入的内容并重新进入本小程序");
            }
        },
        fail: function (res) {
            net.net_fail();
        }
    })
}



module.exports = {
    get_my_user_info: get_my_user_info,
    update_my_user_info: update_my_user_info
}