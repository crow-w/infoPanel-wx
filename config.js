const { ENV } = require('./env');
let BASEURL;

switch (ENV) {
  case 'production':
    BASEURL = 'http://localhost:3000/v1';
    break;
  case 'test':
    BASEURL = 'http://localhost:3000/v1';
    break;
  default:
    BASEURL = 'http://localhost:3000/v1';
    break;
}
module.exports = {
  BASEURL, // 项目接口地址，支持多域名
};
