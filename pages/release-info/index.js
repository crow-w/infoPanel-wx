// pages/release-info/index.js
import { infoApi } from '../../api/index';
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

const match = (v1, v2, size) => v1.toString().slice(0, size) === v2.toString().slice(0, size);

Page({
  /**
   * 页面的初始数据
   */
  data: {
    girdConfig: {
      column: 3,
      width: 210,
      height: 210,
    },
    model: {
      category: '',
      content: '',
      images: '',
      locaiton: '',
      tel: '',
      checked: false,
    },
    canSubmit: true,
    isLoading: false,
    locationFlag: true,
    originFiles: [],
    gridConfig: {
      column: 4,
      width: 160,
      height: 160,
    },
    config: {
      count: 1,
    },
    showConfirm: false,
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
  onReady() {
    console.log('ready');
    const { tag } = this.data;
    const { subTag } = this.getSubTags(tag[0].value);

    this.setData({
      subTag,
    });
  },
  observers: {
    model: function () {
      console.log('changed');
    },
  },
  async uploadFileAsync(filePath) {
    const app = getApp();
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: 'http://local.xinxi.com:8888/api/app/upload/image',
        filePath: filePath,
        name: 'file',
        header: {
          token: app.globalData.token, // 添加 token 到请求头,
          'content-type': 'application/json',
        },
        success: (res) => {
          console.log(`文件上传成功: ${filePath}`, JSON.parse(res.data));
          resolve(JSON.parse(res.data).data.code); // 上传成功时
        },
        fail: (err) => {
          console.error(`文件上传失败: ${filePath}`, err);
          reject(err); // 上传失败时
        },
      });
    });
  },
  async handleSubmit() {
    console.log('model', this.data.model);
    this.setData({
      isLoading: true,
    });
    if (this.data.model.images.length > 0) {
      const { images } = this.data.model;
      const promis = images.map((file) => this.uploadFileAsync(file.url));
      try {
        const results = await Promise.all(promis); // 等待所有文件上传完成
        console.log('所有文件上传完成:', results);
        const data = {
          // eslint-disable-next-line camelcase
          category_code: this.data.model.category,
          desc: this.data.model.content,
          phone: this.data.model.tel,
          // eslint-disable-next-line camelcase
          file_codes: results,
        };
        infoApi.createInfo(data).then((res) => {
          if (res.ret === 0 && res.sub === 0) {
            this.setData({
              showConfirm: true,
            });
          }
        });
      } catch (error) {
        console.error('部分文件上传失败:', error);
      }
    } else {
      const data = {
        // eslint-disable-next-line camelcase
        category_code: this.data.model.category,
        desc: this.data.model.content,
        phone: this.data.model.tel,
        // eslint-disable-next-line camelcase
      };
      infoApi.createInfo(data).then((res) => {
        if (res.ret === 0 && res.sub === 0) {
          this.setData({
            showConfirm: true,
          });
        }
      });
    }
  },
  handleInput(v) {
    console.log('input', v);
    this.setData({
      model: {
        ...this.data.model,
        content: v.detail.value,
      },
    });
  },
  continuePublic(e) {
    wx.reLaunch({
      url: '/pages/release-info/index',
    });
  },

  goInfoCenter() {
    console.log('gocenter');
    wx.reLaunch({
      url: '/pages/home/home',
    });
  },
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
              model: {
                ..._that.data.model,
                locaiton: data,
              },
            });
          },
        });
      },
    });
  },
  handleSuccess(e) {
    const { files } = e.detail;
    this.setData({
      model: {
        ...this.data.model,
        images: files,
      },
    });
  },
  handleRemove(e) {
    const { index } = e.detail;
    const files = this.data.model.images;
    files.splice(index, 1);
    this.setData({
      model: {
        ...this.data.model,
        images: files,
      },
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
    const isPhoneNumber = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
      e.detail.value,
    );
    if (phoneError === isPhoneNumber) {
      this.setData({
        phoneError: !isPhoneNumber,
      });
    }
    this.setData({
      model: {
        ...this.data.model,
        tel: e.detail.value,
      },
    });
  },
  getSubTags(tagValue) {
    const subTag = getOptions(tagList.subTag, (subTag) => match(subTag.value, tagValue, 2));
    return {
      subTag,
    };
  },
  handleCheck(e) {
    this.setData({
      model: {
        ...this.data.model,
        checked: e.detail.checked,
      },
    });
  },
  onColumnChange(e) {
    console.log('pick:', e.detail);
    const { column, index } = e.detail;
    const { tag, subTag } = this.data;
    console.log('subtag', subTag);
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
    this.setData({
      areaVisible: false,
      areaValue: value,
      category: label.join(' '),
      model: {
        ...this.data.model,
        category: value[1] ? value[1] : value[0],
      },
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoadLogin() {},

  onShow() {
    this.getTabBar().init();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  /**
   * 生命周期函数--监听页面显示
   */

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
