import request from '../utils/request';

function getCategory() {
  return request.get({
    url: '/category/tree_list',
    ignoreToken: false,
  });
}

module.exports = {
  getCategory,
};
