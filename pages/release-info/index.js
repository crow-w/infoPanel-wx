// pages/release-info/index.js
const tagList = {
  tag: {
    1000: '顺风车',
    2000: '求职招聘',
    3000: '二手车',
    4000: '房屋租赁',
    5000: '生意转让',
    6000: '本地服务',
    7000: '物品买卖',
    8000: '寻人寻物',
  },
  subTag: {
    1010: '车找人',
    1020: '人找车',
    1030: '车找货',
    1040: '货找车',
    2010: '求职',
    2020: '招聘',
    3010: '买',
    3020: '卖',
    4010: '出租',
    4020: '求组',
    7010: '买',
    7020: '卖',
    8010: '寻人',
    8020: '寻物',
  },
};

const getOptions = (obj, filter) => {
  const res = Object.keys(obj).map((key) => ({
    value: key,
    label: obj[key],
  }));

  if (filter) {
    return res.filter(filter);
  }

  return res;
};

const match = (v1, v2, size) =>
  v1.toString().slice(0, size) === v2.toString().slice(0, size);

Component({
  /**
   * 页面的初始数据
   */
  data: {
    locationFlag: true,
    originFiles: [
      {
        url: 'https://tdesign.gtimg.com/miniprogram/images/example4.png',
        name: 'uploaded1.png',
        type: 'image',
      },
      {
        url: 'https://tdesign.gtimg.com/miniprogram/images/example6.png',
        name: 'uploaded2.png',
        type: 'image',
      },
      {
        url: 'https://tdesign.gtimg.com/miniprogram/images/example5.png',
        name: 'uploaded1.png',
        type: 'image',
      },
    ],
    gridConfig: {
      column: 4,
      width: 160,
      height: 160,
    },
    config: {
      count: 1,
    },
    subTag: [],
    tag: getOptions(tagList.tag),
    category: '',
    areaValue: [],
    phoneError: false,
    confirmBtn: {
      content: '同意协议',
      variant: 'base',
    },
    dialogKey: '',
    showMultiTextAndTitle: false,
  },

  lifetimes: {
    ready() {
      const { tag } = this.data;
      const { subTag } = this.getSubTags(tag[0].value);

      this.setData({
        subTag,
      });
    },
  },

  methods: {
    tapLocation() {
      console.log('clickLocation', this);
      const _that = this;
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          console.log('res', res);
          wx.chooseLocation({
            latitude: res.latitude,
            longitude: res.longitude,
            success: (data) => {
              console.log('data', data, _that);
              _that.setData({
                location: data,
              });
            },
          });
        },
      });
    },
    handleSuccess(e) {
      const { files } = e.detail;
      this.setData({
        originFiles: files,
      });
    },
    handleRemove(e) {
      const { index } = e.detail;
      const { originFiles } = this.data;
      originFiles.splice(index, 1);
      this.setData({
        originFiles,
      });
    },
    showDialog(e) {
      const { key } = e.currentTarget.dataset;
      console.log('close', e.currentTarget.dataset);
      this.setData({
        [key]: true,
        dialogKey: key,
      });
    },
    closeDialog() {
      const { dialogKey } = this.data;
      this.setData({
        [dialogKey]: false,
      });
    },
    onPhoneInput(e) {
      const { phoneError } = this.data;
      const isPhoneNumber =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
          e.detail.value,
        );
      if (phoneError === isPhoneNumber) {
        this.setData({
          phoneError: !isPhoneNumber,
        });
      }
    },
    getSubTags(tagValue) {
      const subTag = getOptions(tagList.subTag, (subTag) =>
        match(subTag.value, tagValue, 2),
      );
      return {
        subTag,
      };
    },

    onColumnChange(e) {
      console.log('pick:', e.detail);
      const { column, index } = e.detail;
      const { tag, subTag } = this.data;

      if (column === 0) {
        // 更改省份
        const { subTag } = this.getSubTags(tag[index].value);

        this.setData({
          subTag,
        });
      }

      if (column === 1) {
      }
    },
    onPickerChange(e) {
      const { value, label } = e.detail;

      console.log('picker confirm:', e.detail);
      this.setData({
        areaVisible: false,
        areaValue: value,
        category: label.join(' '),
      });
    },
    onPickerCancel(e) {
      console.log('picker cancel', e.detail);
      this.setData({
        areaVisible: false,
      });
    },

    onAreaPicker() {
      this.setData({
        areaVisible: true,
      });
    },
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
});
