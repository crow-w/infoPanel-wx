import request from '../utils/request';

function getUnloginInfo(pageNum, limitNum, categoryCode) {
  return request.get({
    url: '/information/list',
    ignoreToken: false,
    // eslint-disable-next-line camelcase
    data: { page_num: pageNum || 1, limit_num: limitNum || 20, category_code: categoryCode },
  });
}

function createInfo(data) {
  return request.post({
    url: '/information/create',
    ignoreToken: false,
    data: data,
  });
}

module.exports = {
  getUnloginInfo,
  createInfo,
};
