<template>
  <div class="order">
    <ul class="orderStatusList clearfix">
      <li class="orderItem" v-for="(item, i) in orderTitleList" @click="getOrderList(item.type)" :key="item.id"
          :class="{'active':currentOrderType === item.type}">
        <span>{{item.title}}</span>
      </li>
    </ul>

    <div v-if="orderList.item.length">
      <div class="orderBox" v-for="(item, i) in orderList.item" :key="item.orderId">
        <div class="orderTitle clearfix">
          <p class="orderNum coi_fl">订单号：
            <span>{{item.orderId}}</span>
          </p>
          <p class="orderTime coi_fr">{{item.time}}</p>
        </div>

        <div class="orderContent">
          <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0">
            <tbody>
            <tr>
              <th width="538px">
                <order-detail v-for="(product, i) in item.product" :orderProduct="product"
                              :key="item.orderId+i"></order-detail>
              </th>

              <th width="167px" class="allMon">
                <p>总额
                  <span class="grayFont">（不含运费）</span>
                </p>
                <p class="coiPay marginT11">{{item.orderCnyPrice.toFixed(4)}} COI</p>
                <p>（￥{{item.total.toFixed(2)}}）</p>
              </th>
              <th width="122px">
                <p>{{item.status}}</p>
                <button class="btn orderDetailBtn" @click="pushDetail(item)">订单详情</button>
              </th>
              <th width="124px">
                <p class="btnHandle">操作</p>
                <button class="btn orderDetailBtn" v-if="item.status === '待支付'" @click="getAssets(item)">确认付款
                </button>
                <button class="btn orderDetailBtn" v-if="item.status === '已过期'" @click="goOrderConfirm(item)">
                  重新购买
                </button>
                <button class="btn orderDetailBtn" v-if="item.status === '已发货'" @click="updateOrder(item)">确认收货</button>
                <button class="btn orderDetailBtn" v-if="item.status === '待发货'" @click="remindOrder">提醒发货</button>
                <button class="whiteBtn" v-if="item.status === '待支付'" @click="deleteOrder(item.orderId)">
                  {{item.minNum}}:{{item.secondNum}}取消订单
                </button>
                <button class="whiteBtn" v-if="item.status === '已过期'" @click="deleteOrder(item.orderId)">
                  删除订单
                </button>
                <button class="whiteBtn" @click="goOrderConfirm(item)"
                        v-if="item.status === '已完成'||item.status === '待收货'|| item.status ==='待发货'|| item.status ==='已发货'">
                  再次购买
                </button>
              </th>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <m-pagination :totalPage="orderList.totalPage" @getPageData="getPageData"></m-pagination>
    </div>

    <div class="notData" v-else>
      <img src="../../assets/images/null.png">
    </div>

    <trade-alert :balance="balance" ref="tradeAlert"></trade-alert>

  </div>
</template>
<style scoped lang="scss" src="../../assets/css/user/order.scss"></style>
<script>
  import MPagination from "../components/m-pagination.vue";

  import {getOrderList} from '../../api/orderServer'
  import {orderMixin} from '../../utils/orderMixin'

  export default {
    mixins: [orderMixin],
    data() {
      return {
        orderTitleList: [
          {title: "全部", id: "0", type: ''},
          {title: "待支付", id: "1", type: 'DZF'},
          {title: "待发货", id: "2", type: 'DFH'},
          {title: "待收货", id: "3", type: 'YFH'},
          {title: "已完成", id: "4", type: 'YWC'}
        ],
        currentOrderType: '',
        orderList: {item: []},
      };
    },

    methods: {
      // 进入订单详情
      pushDetail(orderItem){
        this.$router.push({
          name: 'orderDetail',
          params: {
            orderId: orderItem.orderId,
            addressId: orderItem.addressId
          }
        })
      },


      //获取订单列表分页数据
      getPageData(page){
        this.getOrderList(this.currentOrderType, page)
      },

      //获取订单列表
      getOrderList(type, page){
        this.currentOrderType = type || '';
        let params = {
          start: page || 1,
          offset: 10,
          type: this.currentOrderType
        };
        getOrderList(params, (data) => {
          this.orderList = data;
          if (this.orderList.paymentState) {
            this.timer = setInterval(() => {
              this.timerFun(this.orderList);
            }, 1000)
          }
        })
      }
    },

    mounted() {
      this.getOrderList();
    },
    components: {
      MPagination
    }
  };
</script>



