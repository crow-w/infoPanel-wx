import { fetchHome } from '../../services/home/home';
import { fetchUnloginInfoList } from '../../services/info/fetchInfo';
import Toast from 'tdesign-miniprogram/toast/index';
// test

Page({
  data: {
    imgSrcs: [],
    tabList: [],
    goodsList: [],
    infoList: [],
    goodsListLoadStatus: 0,
    pageLoading: false,
    current: 1,
    autoplay: true,
    duration: '500',
    interval: 5000,
    navigation: {
      type: 'dots',
    },
    swiperImageProps: {
      mode: 'scaleToFill',
    },
  },

  goodListPagination: {
    index: 0,
    num: 5,
  },
  privateData: {
    tabIndex: {
      value: '',
      label: '',
    },
  },
  onLoadLogin() {
    //拿到token啦，可以使用token发起请求了
    this.init();
  },

  onShow() {
    this.getTabBar().init();
  },

  onReachBottom() {
    if (this.data.goodsListLoadStatus === 0) {
      this.loadGoodsList();
    }
  },

  onPullDownRefresh() {
    this.init();
  },

  init() {
    this.loadHomePage();
  },

  loadHomePage() {
    wx.stopPullDownRefresh();

    this.setData({
      pageLoading: true,
    });
    fetchHome().then(({ swiper, tabList }) => {
      this.setData({
        tabList,
        imgSrcs: swiper,
        pageLoading: false,
      });
      this.loadGoodsList(true);
    });
  },
  tabChangeHandle(e) {
    this.privateData.tabIndex = e.detail;
    console.log('tapTab', e.detail);
    this.loadGoodsList(true);
  },

  onReTry() {
    this.loadGoodsList();
  },

  async loadGoodsList(fresh = false) {
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }
    this.setData({
      goodsListLoadStatus: 1,
    });

    const pageSize = this.goodListPagination.num;
    let pageIndex = this.goodListPagination.index + 1;
    if (fresh) {
      pageIndex = 1;
    }

    try {
      console.log('privateData', this.privateData.tabIndex);
      const nextData = await fetchUnloginInfoList(pageIndex, pageSize, this.privateData.tabIndex.value);
      this.setData({
        infoList: fresh ? nextData.data.data : this.data.infoList.concat(nextData.data.data),
        goodsListLoadStatus: 0,
      });

      this.goodListPagination.index = pageIndex;
      this.goodListPagination.num = pageSize;
    } catch (err) {
      this.setData({
        goodsListLoadStatus: 3,
      });
    }
  },

  goodListClickHandle(e) {
    const { index } = e.detail;
    const { spuId } = this.data.goodsList[index];
    wx.navigateTo({
      url: `/pages/goods/details/index?spuId=${spuId}`,
    });
  },

  goodListAddCartHandle() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击加入购物车',
    });
  },

  navToSearchPage() {
    wx.navigateTo({
      url: '/pages/goods/search/index',
    });
  },

  navToActivityDetail({ detail }) {
    const { index: promotionID = 0 } = detail || {};
    wx.navigateTo({
      url: `/pages/promotion-detail/index?promotion_id=${promotionID}`,
    });
  },
});
