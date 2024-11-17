import { infoApi } from '../../api/index';

export function fetchUnloginInfoList(pageIndex, pageSize, category) {
  return infoApi
    .getUnloginInfo(pageIndex, pageSize, category)
    .then((res) => {
      console.log('res', res);
      return res;
    })
    .catch((err) => {
      console.log('err', err);
    });
}
