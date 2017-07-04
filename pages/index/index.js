//index.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
var session = require('../../utils/session.js');
var net = require('../../utils/net.js');
var post_service = require('../../utils/service/post.js');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},

    post_list: []

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 跳转到login页面
  go_to_login_page: function() {
      wx.navigateTo({
          url: '../login/login',
      })
  },
  onLoad: function () {
    // 重新设定offset
    wx.setStorageSync('offset_post_timeline', 0);
    console.log('onLoad')
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },

  onReady: function() {
        // 请求文章数据
        
        var that = this;

        // 如果请求成功的话，将res中的post_list 设置到that上面。
        post_service.get_timeline_post(that, 'post_list');
        console.log('post_list', this.data.post_list);
       
    },

  scrolltolower: function(e) {
      var that = this;

      var is_refreshing = wx.getStorageSync('timeline_bottom_is_refreshing');
      if (!is_refreshing) {
          wx.setStorageSync('timeline_bottom_is_refreshing', true);
          post_service.get_timeline_post(that, 'post_list');
          setTimeout(function() {
              wx.setStorageSync('timeline_bottom_is_refreshing', false);
          }, 1000);
      }
      console.log('post_list', this.data.post_list);
  },

  // 将postid存储下来，然后调到post详情界面
  bindposttap: function(e) {
      console.log("点击事件发生在", e, e.currentTarget.dataset.post_id);
      var post_id = e.currentTarget.dataset.post_id;
      // 存储起来, 然后跳转
      wx.setStorageSync('look_post_id', post_id);
      wx.navigateTo({
          url: '/pages/post/post_view',
      })
  }

})
