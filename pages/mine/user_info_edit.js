// user_info_edit.js

var user_service = require('../../utils/service/user.js');
var net = require('../../utils/net.js');
var util_ui = require("../../utils/util_ui.js");
var session = require("../../utils/session.js");;

Page({

  /**
   * 页面的初始数据
   */
  data: {
      user_info: {},

      motto: '',
      penname: '',
      avatar: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      var fail_callback = function() {
          net.net_fail();
      };
      var success_callback = function() {
          // 将请求回来的值传入表单
          that.setData({
              motto: that.data.user_info.motto,
              penname: that.data.user_info.penname,
              avatar: that.data.user_info.avatar
          });
      };
      // 请求信息
      user_service.get_my_user_info(that, 'user_info', success_callback, fail_callback);
  },

  bindinput: function(e) {
      var fieldname = e.currentTarget.dataset.fieldname;
      var obj = {};
      obj[fieldname] = e.detail.value;
      this.setData(obj);
  },

  commit: function(e) {
      // 编辑成功，需要switch to 我的 页面
      var that = this;
      if (!that.data.avatar) {
          util_ui.show_ok_message("缺少信息", "avatar不能为空");
          return 
      }
      var success_callback = function() {
          wx.showToast({
              title: '修改成功',
          });
          setTimeout(function(){
              wx.reLaunch({
                  url: '/pages/mine/mine',
              });
          }, 1000);
      };
      user_service.update_my_user_info(
          2, 
          {
              motto: that.data.motto,
              penname: that.data.penname,
              avatar: that.data.avatar
          }, 
          success_callback
      );
  },

  cancel: function(e) {
      // 提示用户保存内容
      wx.showModal({
          title: '取消编辑',
          content: '请妥善保存编辑内容',
          showCancel: true,
          cancelText: '离开',
          confirmText: '留下',
          success: function (e) {
              if (e.confirm) {
                  // 留下. 什么都不干
              } else {
                  // 离开
                  wx.navigateBack({});
              }

          }
      });
  },

  logout: function() {
      // 退出登录
      console.log('in logout;');
      // 1. 删除session
      session.remove_session();
      // 2. 跳转到index 
      wx.showToast({
          title: '成功退出',
      });
      setTimeout(function () {
          wx.switchTab({
              url: '/pages/index/index',
          });
      }, 1000);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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