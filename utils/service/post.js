var util = require('../util.js');
var util_ui = require('../util_ui.js');
var session = require('../session.js');
var net = require('../net.js');




// 获取用户【本人】的信息
// GET /post/  timeline上的全部文章
// key_name: offset_post_timeline
// offset, start 的处理：存储到localstorage里边。
function get_timeline_post(that, field) {
    net.net_loading();
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

                var new_post_list = res.data.post_list;


                ever_data = ever_data.concat(new_post_list);
                obj[field] = ever_data;
                that.setData(obj);
                console.log('that', that, ever_data);
                // set another
                wx.setStorageSync('offset_post_timeline', offset + new_post_list.length);
            } else {
                return false
            }
        },
        fail: function (res) {
            net.net_fail();
            return false
        },
        complete: function(res) {
            net.hide_net_loading();
        }
    })
}

// 获取一篇文章的详情
// GET /post/<post_id>  获取一篇post的详情信息
function get_a_post(that, field, post_id, callback) {
    var url = util.get_api_url('/post/'+post_id);
    wx.request({
        url: url,
        method: "GET",
        header: {
            'Cookie': session.get_cookie_value()
        },
        success: function (res) {
            var code = res.data.code;

            if (code == 1) {
                var obj = {};
                obj[field] = res.data.post;
                that.setData(obj);
                if (callback) {
                    callback()
                }
                // set another
            } else {
                // 提示文章已经被删除
                util_ui.show_ok_message("文章已被删除", "文章已被删除");
            }
        },
        fail: function (res) {
            net.net_fail();
            
        },
        complete: function (res) {
            net.hide_net_loading();
        }
    })
}


// 更新一篇文章的详情
// GET /post/<post_id>  更新一篇post的详情信息
function update_a_post(post_id, update_type, update_data, success_callback) {
    var url = util.get_api_url('/post/' + post_id);
    data.update_type = 1;
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
                    success_callback()
                }
                // set another
            } else {
                // 提示文章更新失败，提示保存内容.
                util_ui.show_ok_message("更新失败", "请妥善保存输入的内容并重新进入本小程序");
            }
        },
        fail: function (res) {
            net.net_fail();

        },
        complete: function (res) {
            net.hide_net_loading();
        }
    })
}


module.exports = {
    get_timeline_post: get_timeline_post, 
    get_a_post: get_a_post,
    update_a_post: update_a_post
}