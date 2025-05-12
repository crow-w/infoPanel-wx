import { infoApi } from '../../api/index';

export async function fetchUnloginInfoList(pageIndex, pageSize, category) {
  return await infoApi
    .getUnloginInfo(pageIndex, pageSize, category)
    .then((res) => {
      console.log('res', res);
      return res;
    })
    .catch((err) => {
      console.log('err', err);
    });
}
