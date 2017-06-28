function login_by_username(username, password) {
    
}

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
    
  }
})