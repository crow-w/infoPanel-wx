// pages/Authorize/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
    imageSrc: '/image/R-C.jpg',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},

  wechatLogin() {
    const res = wx.getUserProfile({
      desc: '获取用户信息',
      success: (res) => {
        console.log('logined', res);
      },
    });
    console.log('wechatLogin', res);
  },
  navBack() {
    console.log('navback');
    wx.redirectTo({
      url: 'pages/release-info/index',
    });
  },
});
