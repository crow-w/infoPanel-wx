import { infoApi } from '../../api/index';

export function fetchUnloginInfoList() {
  return infoApi
    .getUnloginInfo()
    .then((res) => {
      console.log('res', res);
      return res;
    })
    .catch((err) => {
      console.log('err', err);
    });
}
