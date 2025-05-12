import updateManager from './common/updateManager';
import { getToken } from './api/auth';
import CustomHook from 'spa-custom-hooks';
const globalData = {
  // 是否已拿到token
  token: '',
  // 用户信息
  userInfo: {
    userId: '',
    head: '',
  },
};
CustomHook.install(
  {
    Login: {
      name: 'Login',
      watchKey: 'token',
      onUpdate(token) {
        //有token则触发此钩子
        return !!token;
      },
    },
    // 暂时没有要用的需求
    // User: {
    //   name: 'User',
    //   watchKey: 'userInfo',
    //   onUpdate(user) {
    //     //获取到userinfo里的userId则触发此钩子
    //     return !!user.userId;
    //   },
    // },
  },
  globalData,
);
App({
  globalData,
  onLaunch() {
    //发起异步登录拿token
    // login((token) => {
    //   this.globalData.token = token;
    //   //使用token拿用户信息
    //   getUser((user) => {
    //     this.globalData.user = user;
    //   });
    // });
    wx.login({
      success: async (res) => {
        // console.log('code', res.code);
        // return;
        const resp = await getToken(res.code);
        this.globalData.token = resp.data.token;
      },
    });
  },
  onShow: function () {
    updateManager();
  },
});
