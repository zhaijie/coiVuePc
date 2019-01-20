<template>
  <div class="orderDetail">
    <button class="btn retBtn" @click="goBack">返回</button>
    <div v-if="orderDetail.orderId">
      <div class="orderBox">
        <div class="orderTitle clearfix">
          <p class="orderNum coi_fl">订单号：
            <span>{{orderDetail.orderId}}</span>
          </p>
          <p class="orderTime coi_fr">{{orderDetail.time}}&nbsp;&nbsp;【{{orderDetail.status}}】</p>
        </div>
        <div class="orderContent">
          <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0">
            <tbody>
            <tr>
              <th width="538px">

                <order-detail v-for="(product, i) in orderDetail.product" :orderProduct="product"
                              :key="orderDetail.orderId+i"></order-detail>
              </th>

              <th width="167px" class="allMon">
                <p>运费</p>
                <p class="coiPay marginT11">￥{{orderDetail.freightTotal.toFixed(2)}}</p>
              </th>
              <th width="167px" class="allMon">
                <p>合计总额
                  <span class="grayFont">（不含运费）</span>
                </p>
                <p class="coiPay marginT11">{{orderDetail.orderCnyPrice.toFixed(4)}} COI</p>
                <p>（￥{{orderDetail.total.toFixed(2)}}）</p>
              </th>
              <th width="124px">
                <p class="btnHandle">操作</p>
                <button class="btn orderDetailBtn" v-if="orderDetail.status === '待支付'" @click="getAssets(orderDetail)">
                  确认付款
                </button>
                <button class="btn orderDetailBtn" v-if="orderDetail.status === '已过期'"
                        @click="goOrderConfirm(orderDetail)">
                  重新购买
                </button>
                <button class="btn orderDetailBtn" v-if="orderDetail.status === '已发货'"
                        @click="updateOrder(orderDetail)">确认收货
                </button>
                <button class="btn orderDetailBtn" v-if="orderDetail.status === '待发货'" @click="remindOrder">
                  提醒发货
                </button>
                <button class="whiteBtn" v-if="orderDetail.status === '待支付'" @click="deleteOrder(orderDetail.orderId)">
                  {{orderDetail.minNum}}:{{orderDetail.secondNum}}取消订单
                </button>
                <button class="whiteBtn" v-if="orderDetail.status === '已过期'" @click="deleteOrder(orderDetail.orderId)">
                  删除订单
                </button>
                <button class="whiteBtn" @click="goOrderConfirm(orderDetail)"
                        v-if="orderDetail.status === '已完成'||orderDetail.status === '待收货'|| orderDetail.status ==='待发货'|| orderDetail.status ==='已发货'">
                  再次购买
                </button>
              </th>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="orderFooter">
        <img class="adressIcon" src="../../assets/images/icon_local.png">
        <span>收货地址</span>
        <span class="mar_l46">{{addressDetail.linkMan}}</span>
        <span>{{addressDetail.linkPhone}}</span>
        <span>{{addressDetail.detailAddress}}</span>
      </div>
    </div>
    <div class="notData" v-else>
      <img src="../../assets/images/null.png">
    </div>
    <trade-alert :balance="balance" ref="tradeAlert"></trade-alert>
  </div>
</template>
<style scoped lang="scss" src="../../assets/css/user/order.scss">
</style>

<style scoped>
  .orderBox {
    margin-bottom: 0;
  }
</style>

<script>

  import {orderMixin} from '../../utils/orderMixin'
  import {getOrderDetailsById} from '../../api/orderServer'
  import {getAddressById} from '../../api/addressServer'

  export default {
    mixins: [orderMixin],
    data() {
      return {
        orderDetail: {},
        timer: null,
        addressDetail: {}
      };
    },

    methods: {
      //返回
      goBack(){
        this.$router.go(-1);
      },

      //获取订单详情
      getOrderDetailsById(){
        getOrderDetailsById({orderId: this.$route.params.orderId}, data => {
          this.orderDetail = data;
          if (this.orderDetail.paymentState) {
            this.timer = setInterval(() => {
              this.timerFun(this.orderDetail);
            }, 1000)
          }
        });
      },

      //获取订单地址
      getAddressById(){
        let params = {
          addressId: this.$route.params.addressId
        };
        getAddressById(params, (data) => {
          this.addressDetail = data;
        })
      }
    },

    mounted(){
      this.getOrderDetailsById();
      this.getAddressById();
    },

    watch: {
      $route(to){
        if (to.name !== 'orderDetail') {
          this.$destroy();
        }
      }
    },
  };
</script>



