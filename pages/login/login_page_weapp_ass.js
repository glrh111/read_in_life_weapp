// login_page_weapp_ass.js  微信小程序使用微信登录的关联页面
var util = require("../../utils/util.js");
var util_ui = require("../../utils/util_ui.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tip: {
          content: '这是你第一次使用微信登录本平台，需要关联已有的账号或者新建账号。用户名不为空，且只包含英文字母和阿拉伯数字。',
          icon_type: 'info_circle'
      },
      username: "",
      next_step_available: false
  },

  // 监听输入，更新username和password
  bindinput: function (e) {
      var value = e.detail.value;
      this.setData({
          username: value
      });
      // 如果username 和 password 均不为空，那么使提交按钮可用
      if (this.data.username) {
          // 使按钮可用
          this.setData({
              next_step_available: true
          });
      } else {
          // 是按钮不可用
          this.setData({
              next_step_available: false
          });
      }

  },
  // 绑定下一步按钮
  bindtap: function(e) {
      // 检查用户名是否合乎规范。
      console.log("username", this.data.username);
      var check_result = util.check_username_available(this.data.username);
      if (check_result.success) {
          // username存入localstorage
          // 从localStorage 里边取得openid
          // 请求接口
          console.log(check_result.message);

          var url = util.get_api_url('/account/associate');

          wx.request({
              url: url,
              data: {

              },
              method: "POST",
              success: function(res) {
                  console.log(res);
              }
          })


      } else {
          // 提示信息
          util_ui.show_ok_message('用户名不可用', check_result.message)
      }

  },







  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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