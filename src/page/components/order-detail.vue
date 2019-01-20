<template>

  <div class="clearfix order_info"
       @click="$router.push('/productDetail/'+ orderProduct.productId)">
    <div>
      <img :src="orderProduct.goodsImage" class="product_img">
    </div>

    <div class="order_dec">
      <p>{{orderProduct.goodsName}}</p>
      <p class="coi_spec">规格：{{orderProduct.specifications}}</p>
    </div>

    <div class="order_price">
      <p class="coiPay">{{orderProduct.cnyPrice.toFixed(4)}} COI</p>
      <p>（￥{{orderProduct.goodsPrice.toFixed(2)}}）</p>
    </div>

    <div class="order_num">×{{orderProduct.goodsNumber}}</div>
  </div>

</template>

<style scoped lang="scss">

  .order_info > div {
    display: table-cell;
    vertical-align: middle;
  }

  .order_info + .order_info {
    margin-top: 10px;
  }

  .order_info {
    display: table;
    &:hover {
      color: $color;
    }

    .product_img {
      width: 88px;
      height: 88px;
      border-radius: $borderRadius;
    }

    .order_dec {
      width: 163px;
      text-align: left;
      padding-left: 16px;
    }

    .coi_spec {
      margin-top: 10px;
    }

    .order_price {
      width: 150px;
      text-align: right;
    }

    .order_num {
      padding-left: 60px;
    }
  }
</style>
<script>

  import * as orderServer from '../../api/orderServer'
  import Alert from '../components/alert'

  export default {
    props: ['orderProduct'],
    data () {
      return {}
    },

    methods: {
      // 删除订单
      deleteOrder(orderId){
        this.showRemindAlert('warning', '是否删除该订单', () => {
          orderServer.delOrder({orderId: orderId}, err => {
            if (!err) {
              this.$emit('getOrderList');
            }
          })
        })
      },

      //显示提示框
      showRemindAlert(type, remind, handle){
        let alertInfo = {
          alertText: remind,
          alertType: type,
          buttons: [{
            text: '确定', handle: handle
          }, {
            text: '取消'
          }]
        };
        Alert.create(alertInfo);
      },
    },

    mounted(){
    }
  }
</script>
