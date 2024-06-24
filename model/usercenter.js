const userInfo = {
  avatarUrl: '/image/OIP-C.jpg',
  nickName: '测试用户',
  phoneNumber: '13438358888',
  gender: 2,
};
const countsData = [{
    num: 2,
    name: '积分',
    type: 'point',
  },
  {
    num: 10,
    name: '优惠券',
    type: 'coupon',
  },
];

const orderTagInfos = [{
    orderNum: 1,
    tabType: 5,
  },
  {
    orderNum: 1,
    tabType: 10,
  },
  {
    orderNum: 1,
    tabType: 40,
  },
  {
    orderNum: 0,
    tabType: 0,
  },
];

const customerServiceInfo = {
  servicePhone: '15771377335',
  serviceTimeDuration: '每周 8:30-12:00  14:00-18:00',
};

export const genSimpleUserInfo = () => ({
  ...userInfo
});

export const genUsercenter = () => ({
  userInfo,
  countsData,
  orderTagInfos,
  customerServiceInfo,
});