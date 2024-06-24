import {
  config
} from '../../config/index';

/** 获取商品列表 */
function mockFetchGoodsList(pageIndex = 1, pageSize = 20) {
  const {
    delay
  } = require('../_utils/delay');
  const {
    getGoodsList
  } = require('../../model/goods');
  return delay().then(() =>
    getGoodsList(pageIndex, pageSize).map((item) => {
      return {
        subTag: item.subTag,
        spuId: item.spuId,
        thumb: item.primaryImage,
        releaseTime: item.releaseTime,
        viewNum: item.viewNum,
        tag: item.tag,
        tel: item.tel,
        location: item.location,
        userName: item.userName,
        userImages: item.userImages,
        title: item.title,
        price: item.minSalePrice,
        originPrice: item.maxLinePrice,
        tags: item.spuTagList.map((tag) => tag.title),
      };
    }),
  );
}

/** 获取商品列表 */
export function fetchGoodsList(pageIndex = 1, pageSize = 20) {
  if (config.useMock) {
    return mockFetchGoodsList(pageIndex, pageSize);
  }
  return new Promise((resolve) => {
    
  });
}