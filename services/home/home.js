import { config, cdnBase } from '../../config/index';
import { infoApi } from '../../api/index';

/** 获取首页数据 */
function mockFetchHome() {
  infoApi
    .getUnloginInfo()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log('err', err);
    });
  const { delay } = require('../_utils/delay');
  const { genSwiperImageList } = require('../../model/swiper');
  return delay().then(() => {
    return {
      swiper: genSwiperImageList(),
      tabList: [
        // {
        //   categoryName: ‘顺风车’,
        //   categpryIdentifier: 1000,
        // },
        {
          text: '最新信息',
          key: 0,
        },
        {
          text: '顺风车',
          key: 1,
        },
        {
          text: '求职招聘',
          key: 2,
        },
        {
          text: '二手车',
          key: 3,
        },
        {
          text: '房屋租赁',
          key: 4,
        },
        {
          text: '生意转让',
          key: 5,
        },
        {
          text: '本地服务',
          key: 6,
        },
        {
          text: '物品买卖',
          key: 7,
        },
        {
          text: '寻人寻物',
          key: 8,
        },
      ],
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
