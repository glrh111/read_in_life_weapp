var util = require('../util.js');
var session = require('../session.js');
var net = require('../net.js');




// 获取用户【本人】的信息
// GET /post/  timeline上的全部文章
// key_name: offset_post_timeline
// offset, start 的处理：存储到localstorage里边。
function get_timeline_post(that, field) {
    var url = util.get_api_url('/post');
    var offset = wx.getStorageSync('offset_post_timeline');
    var limit = 20;
    if (!offset) {
        offset = 0;
        wx.setStorageSync('offset_post_timeline', 0);
    }
    wx.request({
        url: url,
        method: "GET",
        data: {
            offset: offset,
            limit: 20  // 一次取出20条数据
        },
        header: {
            'Cookie': session.get_cookie_value()
        },
        success: function (res) {
            var code = res.data.code;
        
            if (code == 1) {
                var obj = {};
                var ever_data = that.data[field];
                if (!ever_data) {
                    ever_data = []
                }
                ever_data = ever_data.concat(res.data.post_list)
                obj[field] = ever_data;
                that.setData(obj);
                console.log('that', that, ever_data);
                // set another
                wx.setStorageSync('offset_post_timeline', offset+limit);
            } else {
                return false
            }
        },
        fail: function (res) {
            net.net_fail();
            return false
        }
    })
}

module.exports = {
    get_timeline_post: get_timeline_post
}