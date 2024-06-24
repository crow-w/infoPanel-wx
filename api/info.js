import request from '../utils/request';

function getUnloginInfo() {
  return request.get({ url: '/info-unlogin', ignoreToken: true });
}

module.exports = {
  getUnloginInfo,
};
