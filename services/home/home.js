import { config, cdnBase } from '../../config/index';
import { infoApi } from '../../api/index';
import { categoryApi } from '../../api/index';

/** 获取首页数据 */
async function mockFetchHome() {
  infoApi
    .getUnloginInfo()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log('err', err);
    });
  const categoryData = await categoryApi.getCategory().catch((err) => {
    console.log('err', err);
  });
  const tabList = categoryData.data.map((r) => {
    return {
      text: r.name,
      key: r.code,
    };
  });
  tabList.unshift({ text: '最新信息', key: '' });
  const { delay } = require('../_utils/delay');
  const { genSwiperImageList } = require('../../model/swiper');
  return delay().then(() => {
    return {
      swiper: genSwiperImageList(),
      tabList: tabList,
      activityImg: `${cdnBase}/activity/banner.png`,
    };
  });
}

/** 获取首页数据 */
export function fetchHome() {
  // getUnloginInfo()
  //   .then((res) => {
  //     console.log('信息', res);
  //   })
  //   .catch((err) => {
  //     throw err;
  //   });
  if (config.useMock) {
    return mockFetchHome();
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
