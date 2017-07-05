// post_edit.js

var post_service = require("../../utils/service/post.js");
var wemark = require("../../utils/wemark/wemark.js");
var util = require("../../utils/util.js");
var util_ui = require("../../utils/util_ui.js");
var net = require('../../utils/net.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
      look_post_id: null,
      post_info: {},
      focus: false,
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

      // 请求一个post
      var that = this;

      // 请求到之后，渲染文章内容
      post_service.get_a_post(that, 'post_info', look_post_id, function () {
        
          // 将内容填入相应的框框中
          that.setData({
              title: that.data.post_info.title,
              content: that.data.post_info.content,
              abstract: that.data.post_info.abstract
          })


      });


  },


  // 三个内容输入框的
  bindinput: function(e) {
      var submit_type = e.currentTarget.dataset.submit_type;
      var that = this;
      if ('title' == submit_type) {
          that.setData({
              title: e.detail.value
          })
      } 
      if ('abstract' == submit_type) {
          that.setData({
              abstract: e.detail.value
          })
      }
      if ('content' == submit_type) {
          that.setData({
              content: e.detail.value
          })
      }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  // 两个提交按钮    
  commit: function(e) {
      // 三个输入框的内容不能为空
      //   title: '',
      //   content: '',
      //   abstract: ''
      // 首先得让上面三个输入框都失去焦点。 为了触发blur事件
      this.setData({
          focus: false
      });

      // 这里需要设置一个timeout。等待ui更新。
      // 显示网络正在加载中.
      net.net_loading();
      var that = this;
      setTimeout(function() {
      
          if (!(that.data.title && that.data.content && that.data.abstract)) {
                util_ui.show_ok_message("缺少信息", "以上三项均不能为空。")
                return false
            } 
            
            post_service.update_a_post(
                that.data.look_post_id, 
                1, 
                {
                    title: that.data.title,
                    content: that.data.content,
                    abstract: that.data.abstract
                },
                function() {
                    // 显示更新成功按钮，过一段时间，跳转到该post查看界面
                    wx.showToast({
                        title: '更新成功',
                        icon: 'success',
                        duration: 1000,
                        complete: function() {
                            setTimeout(function(){
                                wx.redirectTo({
                                    url: 'post_view',
                                })
                            }, 1000);
                            
                        }
                    });
                }
            )
      }, 1000);
  },

  // 取消编辑
  cancel: function(e) {
      // 提示用户保存内容
      wx.showModal({
          title: '取消编辑',
          content: '请妥善保存编辑内容',
          showCancel: true,
          cancelText: '离开',
          confirmText: '留下',
          success: function(e) {
              if (e.confirm) {
                  // 留下. 什么都不干
              } else {
                  // 离开
                  wx.redirectTo({
                      url: 'post_view',
                  })
              }
              
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