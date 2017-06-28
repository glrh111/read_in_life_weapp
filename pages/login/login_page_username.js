// pages/login/login_page_username.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      username: "卧槽",
      password: "",
      submit_available: false
  },

  log_in: function(e) {
      // 显示加载中提示框 toast
      wx.showToast({
          title: '登录...',
          icon: 'loading',
          duration: 5000
      });

      var login_url = getApp().globalData.api_host + '/account/log_in';
      console.log(login_url);
      wx.request({
          url: login_url,
          method: "POST",
          data: {
              login_type: 1,
              username: this.data.username,
              password: this.data.password
          },
          success: function (res) {
              console.log(res);
              var code = res.data.code;
              if (1 == code) {
                  // 保存cookie相关的东西。
                  wx.showToast({
                      title: '登录成功',
                      icon: 'success',
                      duration: 3000
                  });
              } else {
                  // 提示登录失败
                  wx.showToast({
                      title: '用户名或密码不可用',
                      icon: 'success',
                      duration: 3000
                  });
              }
          },
          fail: function(re) {

          }
      })
  },

  // 监听输入，更新username和password
  bindinput: function(e) {
    var fieldname = e.target.dataset.fieldname;
    var value = e.detail.value;
    if ("username" == fieldname) {
        this.setData({
            username: value
        });
    } else {
        this.setData({
            password: value
        });
    }
    // 如果username 和 password 均不为空，那么使提交按钮可用
    if (this.data.username && this.data.password) {
        // 使按钮可用
        this.setData({
            submit_available: true
        });
    } else {
        // 是按钮不可用
        this.setData({
            submit_available: false
        });
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