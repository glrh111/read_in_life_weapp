// login_page_weapp_password.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      button_value: "",
      login_ass_stage: "",
      tip: {
          content: '这是你第一次使用微信登录本平台，需要关联已有的账号或者新建账号。用户名不为空，且只包含英文字母和阿拉伯数字。',
          icon_type: 'info_circle'
      },
      password: ""
  },

  bingtap: function(e) {
      // login_ass_code 这个确定是验证密码，还是输入密码新建账号
      var password = this.data.password;
      var username = wx.getStorageSync('login_username');
      var openid = wx.getStorageSync('login_openid');
      if (3 == this.data.login_ass_stage) {
          // 验证密码
          wx.request({
              url: ass_url_3,
              data: {
                  'openid': openid,
                  'username': username,
                  'platform': 1,
                  'stage': 3,
                  'password': password
              },
              method: 'POST',
              success: function (res) {
                  var code = res.data.code;

                  if (2 == code) {
                      // 这个账号虽然存在，但是没有关联，需要进行关联。
                      // 即验证密码
                      wx.navigateTo({
                          url: 'login_page_weapp_password',
                      })
                  } else if (1 == code) {
                      // 提示验证成功。关联成功。

                  } else {
                      net.hide_net_loading();
                      // 这个账号已经与憋得账号关联过了。
                      // 
                      util_ui.show_ok_message('用户名已关联', "本用户名已经与其他微信账号关联，请使用其他用户名。");
                  }

              },
              fail: function (res) {
                  // 提示网络错误
                  net.net_fail();
              }
          })

          
      } else if (2 == this.data.login_ass_stage) {
          // 输入新的密码
      }
  },

  bindinput: function(e) {
      // 检测用户输入
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
          content = "用户名可用。需要设置密码以完成注册。"
      } else {
          button_value = "验证密码";
          content = "已经有人以此用户名注册。如需关联，需要验证密码；使用另一个用户名请点击返回。"
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