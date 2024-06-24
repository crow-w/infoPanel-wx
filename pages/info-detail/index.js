// pages/info-detail/index.js
Component({

  /**
   * 页面的初始数据
   */
  data: {
    image: 'https://tdesign.gtimg.com/miniprogram/images/avatar1.png',
    visible: false,
    showIndex: false,
    closeBtn: false,
    deleteBtn: false,
    images: [],
    img1: 'https://tdesign.gtimg.com/miniprogram/images/example1.png',
    img2: 'https://tdesign.gtimg.com/miniprogram/images/example2.png',
    img3: 'https://tdesign.gtimg.com/miniprogram/images/example3.png',
    location: {
      address: "内蒙古自治区锡林郭勒盟苏尼特右旗赛汉路19号",
      errMsg: "chooseLocation:ok",
      latitude: 42.74658,
      longitude: 112.658371,
      name: "苏尼特右旗苏尼特宾馆"
    }
  },

  methods: {
    clickview() {
      console.log('clickview')
      this.setData({
        visible: false,
      });
    },
    showLocation() {
      wx.openLocation({
        latitude: this.data.location.latitude,
        longitude: this.data.location.longitude,
      })
      console.log('showLocation')
    },
    clickImg(e) {
      console.log('imgClicked', e)
    },
    onClick(e) {
      this.setData({
        images: [
          '/image/1.jpg',
          '/image/2.jpg',
          '/image/3.jpg',
          '/image/4.jpg',
          '/image/5.jpg',
          '/image/6.jpg',
          '/image/7.jpg',
        ],
        showIndex: true,
        visible: true,
      });
    },
    onChange(e) {
      const {
        index
      } = e.detail;

      console.log('change', index);
    },
    onClose(e) {
      console.log('close')
      const {
        trigger
      } = e.detail;
      console.log(trigger);
      this.setData({
        visible: false,
      });
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})