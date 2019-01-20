/**
 * Created by Administrator on 2018/11/13 0013.
 */


//我的资产
const Asset = (resolve) => {
  import ('../page/user/asset').then((module) => {
    resolve(module)
  })
};

//线下众筹
const Fundraising = (resolve) => {
  import ('../page/user/fundraising').then((module) => {
    resolve(module)
  })
};

//交易记录
const Record = (resolve) => {
  import ('../page/user/record').then((module) => {
    resolve(module)
  })
};

//奖励记录
const Reward = (resolve) => {
  import ('../page/user/reward').then((module) => {
    resolve(module)
  })
};

//邀请好友
const Invite = (resolve) => {
  import ('../page/user/invite').then((module) => {
    resolve(module)
  })
};

//------------订单中心----------------
//我的订单
const Order = (resolve) => {
  import ('../page/user/order').then((module) => {
    resolve(module)
  })
};
//订单详情
const OrderDetail = (resolve) => {
  import ('../page/user/orderDetail').then((module) => {
    resolve(module)
  })
};
//我的地址
const Address = (resolve) => {
  import ('../page/user/address').then((module) => {
    resolve(module)
  })
};

//购物车
const Cart = (resolve) => {
  import ('../page/user/cart').then((module) => {
    resolve(module)
  })
};


// ----------安全中心 ------------
//安全中心
const UserSafe = (resolve) => {
  import ('../page/user/userSafe').then((module) => {
    resolve(module)
  })
};

//实名认证
const RealSenior = (resolve) => {
  import ('../page/user/realSenior').then((module) => {
    resolve(module)
  })
};

const userRouter = [
  {path: '/user', redirect: '/user/asset', meta: {requireAuth: true}},
  {path: '/user/asset', name: 'asset', meta: {title: 'COI资产'}, component: Asset},
  {path: '/user/fundraising', name: 'fundraising', meta: {title: '线下众筹'}, component: Fundraising},
  {path: '/user/record', name: 'record', meta: {title: '交易记录'}, component: Record},
  {path: '/user/reward', name: 'reward', meta: {title: '奖励记录'}, component: Reward},
  {path: '/user/invite', name: 'invite', meta: {title: '邀请好友'}, component: Invite},
  {path: '/user/order', name: 'order', meta: {title: '我的订单'}, component: Order},
  {path: '/user/cart', name: 'cart', meta: {title: '购物车'}, component: Cart},
  {path: '/user/address', name: 'address', meta: {title: '收货地址'}, component: Address},
  {path: '/user/userSafe/:type', name: 'userSafe', meta: {title: '安全中心'}, component: UserSafe},
  {path: '/user/realSenior', name: 'realSenior', meta: {title: '实名认证'}, component: RealSenior},
  {path: '/user/OrderDetail/:orderId/:addressId', name: 'orderDetail', meta: {title: '订单详情'}, component: OrderDetail},
];


export default userRouter;
