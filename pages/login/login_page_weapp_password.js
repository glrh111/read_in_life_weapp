// login_page_weapp_password.js
var util = require("../../utils/util.js");
var util_ui = require("../../utils/util_ui.js");
var session = require("../../utils/session.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      button_value: "",
      login_ass_stage: "",
      tip: {
          content: '',
          icon_type: 'info_circle'
      },
      password: "",
      next_step_available: false
  },

  bindtap: function(e) {
      // login_ass_code 这个确定是验证密码，还是输入密码新建账号
      var password = this.data.password;
      var username = wx.getStorageSync('login_username');
      var openid = wx.getStorageSync('login_openid');
      var ass_url = util.get_api_url('/account/associate')
      if (3 == this.data.login_ass_stage) {
          // 验证密码. code=1成功验证。其他验证失败
          wx.request({
              url: ass_url,
              data: {
                  'openid': openid,
                  'username': username,
                  'platform': 2,
                  'stage': 3,
                  'password': password
              },
              method: 'POST',
              success: function (res) {
                  var code = res.data.code;

                  if (1 == code) {
                      // 提示验证成功。关联成功。
                      // 执行登录操作
                      ////////////////////////////////////////////////
                      session.login_success(res);
                      // 跳转到index
                      wx.reLaunch({
                          url: '/pages/index/index',
                      })

                  } else {
                      // 提示验证密码失败
                      util_ui.show_ok_message('密码错误', "密码错误");
                  }

              },
              fail: function (res) {
                  // 提示网络错误
                  net.net_fail();
              }
          })

          
      } else if (2 == this.data.login_ass_stage) {
          // 输入新的密码

          // 1. 验证密码的可用性 阿拉伯数字。英文字母。标点符号。
          var check_result = util.check_password_available(password);
          console.log(password);
          if (check_result.success) {
              // 发送请求
              wx.request({
                  url: ass_url,
                  data: {
                      'openid': openid,
                      'username': username,
                      'platform': 2,
                      'stage': 2,
                      'password': password
                  },
                  method: 'POST',
                  success: function (res) {
                      var code = res.data.code;

                      if (1 == code) {
                          // 提示验证成功。关联成功。
                          // 执行登录操作
                          /////////////////////////////////////////
                          console.log('session',session.get_session(res));
                          session.login_success(res);
                          // 跳转到index
                          wx.reLaunch({
                              url: '/pages/index/index',
                          });


                      } else {
                          // 提示密码不可规范.
                          util_ui.show_ok_message('网络出错', "请刷新页面。");
                      }

                  },
                  fail: function (res) {
                      // 提示网络错误
                      net.net_fail();
                  }
              })





          } else {
              // 提示密码不可用。
              util_ui.show_ok_message('密码不可用', check_result.message);


          }



      } else {
          // 不应该跳转到这个页面。暂时不做处理.
      }
  },

  bindinput: function(e) {
      // 检测用户输入
      var value = e.detail.value;
      this.setData({
          password: value
      });
      // password不为空，那么使提交按钮可用
      if (this.data.password) {
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // 如果是验证密码
      
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      var login_ass_stage = wx.getStorageSync(
          'login_ass_stage'
      );
      console.log('login_ass_stage', login_ass_stage);

      var button_value = "";
      var content = "";
      if (2 == login_ass_stage) {
          button_value = "设置密码";
          content = "用户名可用。需要设置密码以完成注册。密码只能包含英文字母，数字和标点符号。且长度不小于3。";
          wx.setNavigationBarTitle({
              title: '设置密码',
          })
      } else {
          button_value = "验证密码";
          content = "已经有人以此用户名注册。如需关联，需要验证密码；使用另一个用户名请点击返回。";
          wx.setNavigationBarTitle({
              title: '验证密码',
          });
      }
      this.setData({
          login_ass_stage: login_ass_stage,
          button_value: button_value,
          tip: {
              content: content,
              icon_type: 'info_circle'
          }
      })
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