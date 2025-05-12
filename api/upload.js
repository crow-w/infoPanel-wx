import request from '../utils/request';

function uploadImages(files) {
  return request.post({
    url: '/upload/image',
    ignoreToken: false,
    // eslint-disable-next-line camelcase
    data: {
      file: files,
    },
  });
}

module.exports = {
  uploadImages,
};
