// login_page_weapp_ass.js  微信小程序使用微信登录的关联页面
var util = require("../../utils/util.js");
var util_ui = require("../../utils/util_ui.js");
var net = require("../../utils/net.js");
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
      var username = this.data.username;
      // 检查用户名是否合乎规范。
      console.log("username", this.data.username);
      var check_result = util.check_username_available(this.data.username);
      if (check_result.success) {
          // 显示网络加载框框
          net.net_loading();
          // username存入localstorage
          wx.setStorageSync(
              'login_username',
              this.data.username,
          );
          // 从localStorage 里边取得openid
          var openid = wx.getStorageSync('login_openid');
          // 请求接口
          var url = util.get_api_url('/account/associate');
          wx.request({
              url: url,
              data: {
                  'openid': openid,
                  'username': this.data.username,
                  'platform': 1,
                  'stage': 1
              },
              method: "POST",
              success: function(res) {
                  // 隐藏加载框
                  
                  console.log(res);
                  var code = res.data.code;
                  if (1==code) {
                      // 存储 login_ass_stage
                      var stage = res.data.stage;
                      wx.setStorageSync(
                          'login_ass_stage',
                          stage,
                      );
                      
                      if (2==stage) {
                          // stage == 2: username没人使用，需要设置密码，完成关联
                          wx.navigateTo({
                              url: 'login_page_weapp_password',
                          })
                      } else if (3==stage) {

                          // stage == 3: 
                          //     1. 首先发送请求， 验证是否可以关联
                          //     2. 如果可以关联，提示验证密码
                          var ass_url_3 = util.get_api_url('/account/associate')
                          wx.request({
                              url: ass_url_3,
                              data: {
                                  'openid': openid,
                                  'username': username,
                                  'platform': 1,
                                  'stage': 3
                              },
                              method: 'POST',
                              success: function(res) {
                                  var code = res.data.code;
                                  
                                  if (2 == code) {
                                      // 这个账号虽然存在，但是没有关联，需要进行关联。
                                      // 即验证密码
                                      wx.navigateTo({
                                          url: 'login_page_weapp_password',
                                      })
                                  } else if (1 == code) {
                                      // 由于没有传入用户名，不可能关联成功。不做处理。

                                  } else  {
                                      net.hide_net_loading();
                                      // 这个账号已经与憋得账号关联过了。
                                      // 
                                      util_ui.show_ok_message('用户名已关联', "本用户名已经与其他微信账号关联，请使用其他用户名。");
                                  }

                              },
                              fail: function(res) {
                                  // 提示网络错误
                                  net.net_fail();
                              }
                          });



                        

                      }

                  } else {
                      // username不可用。重新输入
                      util_ui.show_ok_message('用户名不可用', "请重新输入");

                  }
              },
              fail: function(res) {
                  // 提示网络失败
                  net.net_fail();
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