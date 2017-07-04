// post_view.js
var post_service = require("../../utils/service/post.js");
var wemark = require("../../utils/wemark/wemark.js");
var util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
      look_post_id: null,
      post_info: { user_info:{}},
      datestr: '',
      wemark: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var look_post_id = wx.getStorageSync('look_post_id');
      this.setData({
          look_post_id: look_post_id
      });
      // 请求一个post
      var that = this;

      // 请求到之后，渲染文章内容
      post_service.get_a_post(that, 'post_info', look_post_id, function() {
          var title = that.data.post_info.title;
          if (title) {
              wx.setNavigationBarTitle({
                  title: title,
              })
          } 
          // 处理内容
          var content = that.data.post_info.content;
          if (content) {
              wemark.parse(content, that)
          } else {
              // 提示文章没有内容
          }
          // 处理时间
          that.setData({
              datestr: util.format_timestamp(that.data.post_info.utime)
          });
      });
  },
  // 编辑按钮 navigate to 某个页面
  bingedittap: function(e) {
      wx.redirectTo({
          url: 'post_edit',
      });
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