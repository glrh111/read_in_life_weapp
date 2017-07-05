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
      wemark: {},

      // 发布 转为私密
      publish_word: '',
      // is_available_to_other: '',
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
          // 处理发布按钮
          var is_available_to_other = that.data.post_info.is_available_to_other;
          var publish_word = '';
          if (is_available_to_other) {
              // 转为私密
              publish_word = '转为私密';
          } else {
              // 发布
              publish_word = '发布';
          }
          that.setData({
              publish_word: publish_word
          })


      });
  },
  // 编辑按钮 navigate to 某个页面
  bindedittap: function(e) {
      wx.redirectTo({
          url: 'post_edit',
      });
  },

  // 文章发布状态按钮
  bindpublishtap: function(e) {
      // is_available_to_other
      var that = this;
      var is_available_to_other = that.data.post_info.is_available_to_other;
      
      var title = '';
      var confirmText = '';
      var content = '';
      if (is_available_to_other) {
          title = '转为私密';
          confirmText = '转为私密';
          content = '文章转为私密后，可在我的页面查看。'
      } else {
          title = '发布';
          confirmText = '发布';
          content = '文章发布后，可供其他人查看。'
      }

      // 显示提示框
      wx.showModal({
          title: title,
          content: content,
          showCancel: true,
          cancelText: '取消',
          confirmText: confirmText,
          success: function (e) {
              if (e.confirm) {
                  // 执行更新操作
                  post_service.update_a_post(
                      that.data.look_post_id,
                      2,
                      {
                          available_to_other: !is_available_to_other
                      },
                      function () {
                          // 显示更新成功按钮，过一段时间，跳转到该post查看界面
                          wx.showToast({
                              title: title + '成功',
                              icon: 'success',
                              duration: 1000,
                              complete: function () {
                                  setTimeout(function () {
                                      wx.redirectTo({
                                          url: 'post_view',
                                      })
                                  }, 1000);

                              }
                          });
                      }
                  )
              } // end if (e.confirm)

          }
      })

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