// post_edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      look_post_id: null,
      post_info: {},
      title: '',
      content: '',
      abstract: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var look_post_id = wx.getStorageSync('look_post_id');
      this.setData({
          look_post_id: look_post_id
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  // 两个提交按钮    
  commit: function(e) {
    
  },

  cancel: function(e) {

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