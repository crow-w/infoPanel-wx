import request from '../utils/request';

function getUnloginInfo(pageIndex, pageSize, category) {
  return request.get({
    url: '/info-unlogin',
    ignoreToken: true,
    data: { page: pageIndex || 1, limit: pageSize || 20, category },
  });
}

module.exports = {
  getUnloginInfo,
};
