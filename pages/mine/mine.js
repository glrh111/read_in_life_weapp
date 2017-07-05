// mine.js

var user_service = require('../../utils/service/user.js');
var post_service = require('../../utils/service/post.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
      user_info: {},
      tab_cn: {
          published: '已发表文章',
          not_published: '私密文章'
      },
      post_list: {}, // 赋值在这个上面。published在前面。
      type_list: ['published', 'not_published'],

      selected_type: 'published'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // 请求用户信息
      var that = this;
      var fail_callback = function () {
          // 询问是否跳转
          wx.showModal({
              title: '未登录',
              content: '登录以查看个人页面',
              showCancel: true,
              cancelText: '首页',
              confirmText: '登录',
              success: function (e) {
                  if (e.confirm) {
                      // 登录
                      wx.redirectTo({
                          url: '/pages/login/login',
                      });
                  } else {
                      // 首页
                      wx.switchTab({
                          url: '/pages/index/index',
                      });
                  }

              }
          });
      };

      var success_callback = function () {
          // 留在本页面。没必要搞出来另一个页面

          // 拉取本人的文章列表
          post_service.get_user_post(
              that,
              'post_list',
              function() {},
              fail_callback
          );


      };
      
      // 请求用户信息
      user_service.get_my_user_info(that, 'user_info', success_callback, fail_callback);
      
          
      
  },
  
  // 点击tabbar触发这个东西
  bindtabtap: function (e) {
      var publish_type = e.currentTarget.dataset.publish_type;
      this.setData({
          selected_type: publish_type
      });
  },

  // 点击文章，触发这个东西
  bindposttap: function(e) {
      var post_id = e.currentTarget.dataset.post_id;
      // 存储起来, 然后跳转
      wx.setStorageSync('look_post_id', post_id);
      wx.navigateTo({
          url: '/pages/post/post_view',
      });
  },

  // 点击用户的信息区域，触发这个东西
  bindusertap: function(e) {
      wx.navigateTo({
          url: 'user_info_edit',
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