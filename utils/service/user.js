var util = require('../util.js');
var session = require('../session.js');
var net = require('../net.js');



// 获取用户【本人】的信息
// 进入app的时候会请求
function get_my_user_info() {
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
                return res.data.user;
            } else {
                return false
            }
        },
        fail: function(res) {
            net.net_fail();
            return false
        }
    })
}



module.exports = {
    get_my_user_info: get_my_user_info
}