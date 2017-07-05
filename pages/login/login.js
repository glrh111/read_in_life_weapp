var net = require('../../utils/net.js');
var util = require('../../utils/util.js');
var session = require('../../utils/session.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  nav_to_login_page: function(e) {
    // paget_type: 1 to wechat login page
    //             2 to username login page 

    console.log(e);
    var login_type = parseInt(e.target.dataset.login_type);
    if (1 == login_type) {
        // 下面进行两个请求，需要一个提示的加载框
        net.net_loading();
        wx.login({
            success: function(res) {
                console.log(res);
                var js_code = res.code;
                // request for /account/log_in
                wx.request({
                    url: getApp().globalData.api_host + '/account/log_in',
                    method: "POST",
                    data: {
                        "js_code": js_code,
                        "platform": 2,
                        "login_type": 2
                    },
                    success: function(res) {
                        console.log(res);
                        var success_code = res.data.code;
                        if (1 == success_code) {
                            // 登录成功。以前登录过
                            // 存储session。与使用用户名登录成功使用同一个东西。
                            session.login_success(res);
                            // 跳转到index
                            wx.switchTab({
                                url: '/pages/index/index',
                            });






                            
                        } else if (2 == success_code) {
                            // 提示需要关联账号。调到另一个页面上面。
                            var openid = res.data.openid;
                            console.log('openid', openid);

                            wx.setStorageSync(
                                'login_openid',
                                openid,
                            );

                            // 跳转到关联页面
                            wx.navigateTo({
                                url: 'login_page_weapp_ass',
                            });

                        } else {
                            // todo 提示获取openid失败
                        }
                    },
                    fail: function(res) {
                        // 提示网络连接失败
                    }
                })


            },
            fail: function(res) {
                // 提示网络连接失败
            }
        })
    } else {
        wx.navigateTo({
            url: 'login_page_username',
        })
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
      return {
          
      }
  }
})