import TabMenu from './data';
Component({
  data: {
    active: 0,
    list: TabMenu,
    isAuthorized: true, // 用户是否已授权
  },
  methods: {
    onChange(event) {
      // 这里本来是加了个授权跳转 结果发现微信授权的年代已经过去了 用不着了 哈哈哈 白写了
      if (this.data.isAuthorized === false) {
        wx.redirectTo({
          url: '/pages/Authorize/index',
        });
      } else {
        this.setData({ active: event.detail.value });
        wx.switchTab({
          url: this.data.list[event.detail.value].url.startsWith('/')
            ? this.data.list[event.detail.value].url
            : `/${this.data.list[event.detail.value].url}`,
        });
      }
    },

    init() {
      const page = getCurrentPages().pop();
      const route = page ? page.route.split('?')[0] : '';
      const active = this.data.list.findIndex(
        (item) => (item.url.startsWith('/') ? item.url.substr(1) : item.url) === `${route}`,
      );
      this.setData({ active });
    },
  },
});
