// mine.js

var user_service = require('../../utils/service/user.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      user_info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // 请求用户信息
      var that = this;
      var user_info = user_service.get_my_user_info();
      if (user_info) {
          // 赋值
          that.data.setData({
              user_info: user_info
          })
      } else {
          // 跳转到登录页面
          wx.redirectTo({
              url: '/pages/login/login',
          })
      }
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