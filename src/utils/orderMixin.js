/**
 * Created by Administrator on 2018/12/04 0015.
 */

import * as orderServer from '../api/orderServer'
import {getAssets} from '../api/userServer'

import OrderDetail from "../page/components/order-detail.vue";
import TradeAlert from "../page/components/trade-alert.vue";
import Alert from '../page/components/alert'
import {showConfirmAlert} from './utils'

export const orderMixin = {
  data () {
    return {
      balance: {},
      timer: null
    }
  },
  methods: {
    //重新购买
    goOrderConfirm(orderItem){
      let params = {
        productId: orderItem.product[0].productId,
        specId: orderItem.product[0].specificationsId,
        number: orderItem.product[0].goodsNumber
      };
      this.$router.push({
        name: 'orderConfirm',
        params: params
      })
    },

    // 删除订单
    deleteOrder(orderId){
      showConfirmAlert('warning', '是否删除该订单', () => {
        orderServer.delOrder({orderId: orderId}, err => {
          if (!err) {
            if (this.$route.name === 'orderDetail') {
              this.$router.go(-1)
            } else {
              this.getOrderList();
            }
          }
        })
      });
    },

    //提醒发货
    remindOrder(){
      let alertInfo = {
        alertText: '提醒成功',
        alertType: 'success',
        buttons: [{text: '确定'}]
      };
      Alert.create(alertInfo);
    },

    //确定收货
    updateOrder(item){
      // item.status = '已完成';
      this.balance.orderId = item.orderId;
      this.$refs.tradeAlert.alertState = true;
    },

    //获取总资产
    getAssets(orderItem){
      this.balance.orderId = orderItem.orderId;
      getAssets((data) => {
        this.balance.total = orderItem.total.toFixed(4);
        this.balance.cnyPrice = orderItem.orderCnyPrice.toFixed(4);
        this.balance.amount = (data.wsf + data.ysf).toFixed(4);
        this.$refs.tradeAlert.alertState = true;
      });
    },

    //待支付倒计时
    timerFun(orderDetail){
      orderDetail = orderServer.timerFun(orderDetail);

      //如果没有待支付状态则清除线程
      if (!orderDetail.paymentState) {
        window.clearInterval(this.timer);
        this.timer = null;
      }
    }
  },

  components: {
    OrderDetail, TradeAlert
  }
};
