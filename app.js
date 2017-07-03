//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    // 从本地缓存中获取session信息，如果找到，携带session信息登录


  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    api_host: "https://glrh11.com"
  }
})

// login_openid 获取openid后存在这里
// login_username 用户输入username后存在这里
// login_ass_stage 关联第一步之后的code
// session 这时用户的登录凭证。
// offset_post_timeline 请求timeline_post 的数据偏移量