import { rpx2px } from '../../utils/util';
Component({
  options: {
    addGlobalClass: true,
  },

  properties: {
    id: {
      type: String,
      value: '',
      observer(id) {
        this.genIndependentID(id);
        if (this.properties.thresholds?.length) {
          this.createIntersectionObserverHandle();
        }
      },
    },
    data: {
      itemStates: {},
      isOverThreeLines: false,
      images: ['/path/to/image1.jpg'], // 图片数组
      imageMode: 'aspectFit', // 默认模式
      code: '',
      type: Object,
      observer(data) {
        if (!data) {
          return;
        }
        let isValidityLinePrice = true;
        if (data.originPrice && data.price && data.originPrice < data.price) {
          isValidityLinePrice = false;
        }
        this.setData({
          info: data,
          isValidityLinePrice,
        });
      },
    },
    currency: {
      type: String,
      value: '¥',
    },

    thresholds: {
      type: Array,
      value: [],
      observer(thresholds) {
        if (thresholds && thresholds.length) {
          this.createIntersectionObserverHandle();
        } else {
          this.clearIntersectionObserverHandle();
        }
      },
    },
  },

  data: {
    isExpanded: false,
    independentID: '',
    info: {
      id: '',
    },
    isValidityLinePrice: false,
  },

  lifetimes: {
    ready() {
      this.init();
      console.log('attached', this.checkTextOverflow());
    },
    attached() {},
    detached() {
      this.clear();
    },
  },

  pageLifeTimes: {},

  methods: {
    checkTextOverflow() {
      const query = this.createSelectorQuery();
      query
        .select(`#${this.data.independentID}`)
        .boundingClientRect((rect) => {
          console.log('rect', rect);
          if (rect) {
            const lineHeight = rpx2px(35); // 单行高度
            console.log('height', lineHeight, rect.height);
            const maxHeight = lineHeight * 3; // 三行的最大高度
            const isOverThreeLines = rect.height > maxHeight;
            console.log('item', isOverThreeLines);
            this.setData({
              [`itemStates.${this.data.independentID}`]: isOverThreeLines, // 判断是否超过三行
            });
          }
        })
        .exec();
    },

    onImageLoad(e) {
      const { width, height } = e.detail;
      const aspectRatio = width / height;

      // 判断图片比例，动态调整显示模式
      if (aspectRatio > 1) {
        this.setData({ imageMode: 'widthFix' }); // 宽图模式
      } else {
        this.setData({ imageMode: 'heightFix' }); // 长图模式
      }
    },
    showLocation(e) {
      const { location } = e.target.dataset;
      wx.openLocation({
        latitude: location.latitude,
        longitude: location.longitude,
      });
    },
    toDetail(e) {
      if (e.target.dataset.canexpanded) {
        this.setData({
          isExpanded: !this.data.isExpanded,
        });
      }

      // wx.navigateTo({
      //   url: '/pages/info-detail/index',
      // })
    },
    clickTel(e) {
      console.log('click', e.target.dataset.index);
      wx.makePhoneCall({
        phoneNumber: e.target.dataset.index,
      });
    },
    clickHandle() {
      this.triggerEvent('click', {
        goods: this.data.goods,
      });
    },

    clickThumbHandle() {
      this.triggerEvent('thumb', {
        goods: this.data.goods,
      });
    },

    addCartHandle(e) {
      const { id } = e.currentTarget;
      const { id: cardID } = e.currentTarget.dataset;
      this.triggerEvent('add-cart', {
        ...e.detail,
        id,
        cardID,
        goods: this.data.goods,
      });
    },

    genIndependentID(id) {
      let independentID;
      if (id) {
        independentID = id;
      } else {
        independentID = `goods-card-${~~(Math.random() * 10 ** 8)}`;
      }
      this.setData({
        independentID,
      });
    },

    init() {
      const { thresholds, id } = this.properties;
      this.genIndependentID(id);
      if (thresholds && thresholds.length) {
        this.createIntersectionObserverHandle();
      }
    },

    clear() {
      this.clearIntersectionObserverHandle();
    },

    intersectionObserverContext: null,

    createIntersectionObserverHandle() {
      if (this.intersectionObserverContext || !this.data.independentID) {
        return;
      }
      this.intersectionObserverContext = this.createIntersectionObserver({
        thresholds: this.properties.thresholds,
      }).relativeToViewport();

      this.intersectionObserverContext.observe(`#${this.data.independentID}`, (res) => {
        this.intersectionObserverCB(res);
      });
    },

    intersectionObserverCB() {
      this.triggerEvent('ob', {
        goods: this.data.goods,
        context: this.intersectionObserverContext,
      });
    },

    clearIntersectionObserverHandle() {
      if (this.intersectionObserverContext) {
        try {
          this.intersectionObserverContext.disconnect();
        } catch (e) {}
        this.intersectionObserverContext = null;
      }
    },
  },
});
