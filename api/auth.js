import request from '../utils/request';

function getToken(code) {
  return request.post({
    url: '/wechat/user/token',
    ignoreToken: true,
    // eslint-disable-next-line camelcase
    data: { code: code, is_visit: 'Y' },
  });
}

module.exports = {
  getToken,
};
