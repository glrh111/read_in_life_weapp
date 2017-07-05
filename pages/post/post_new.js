// post_new.js
var post_service = require("../../utils/service/post.js");
var net = require('../../utils/net.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
      net.net_loading();
      var success_callback = function (post_id) {
          if (post_id) {
              wx.setStorageSync('look_post_id', post_id);
          }
          wx.redirectTo({
              url: '/pages/post/post_edit',
          });
      };
      var fail_callback = function() {
          net.hide_net_loading();
          wx.showModal({
              title: '未登录',
              content: '发表新文章需要登录',
              showCancel: true,
              cancelText: '首页',
              confirmText: '登录',
              success: function (e) {
                  if (e.confirm) {
                      // 登录
                      wx.redirectTo({
                          url: '/pages/login/login',
                      });
                  } else {
                      // 首页
                      wx.switchTab({
                          url: '/pages/index/index',
                      });
                  }

              }
          });
      }; // fail_callback

      // 请求接口
      post_service.new_a_post(success_callback, fail_callback);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})