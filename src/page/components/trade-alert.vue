<template>
  <div class="alert" v-if="alertState" @touchmove.prevent>
    <div class="order_alert">
      <img src="../../assets/images/icon_close.png" @click="alertState = false" class="close_img">

      <div v-if="balance.cnyPrice">
        <p class="coi_price">{{balance.cnyPrice}} COI</p>
        <p class="cny_price">（折合CNY:￥{{balance.total}}）</p>
        <p class="coi_balance">可用余额：{{balance.amount}} COI</p>
      </div>

      <div class="trade_form" :class="{'border':balance.cnyPrice}">
        <div>
          <span>请输入交易密码</span>
          <router-link to="/user/userSafe/1" class="coi_fr">忘记密码</router-link>

          <m-input :width="290" class="trade_input"
                   :inputInfo="tradeInput">
          </m-input>
          <button class="btn payment_btn" @click="paymentSubmit">
            {{balance.cnyPrice ? '立即付款' : '确认收货'}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .order_alert {
    width: 360px;
    padding-bottom: 30px;
    background-color: #fff;
    border-radius: $borderRadius;
    .close_img {
      @include closeImg(12px)
    }

    p {
      text-align: center;
    }

    .coi_price {
      font-size: 24px;
      font-weight: bold;
      color: $color;
      margin-top: 48px;
    }

    .coi_balance {
      margin-top: 20px;
      color: #999;
    }

    .trade_form {
      &.border {
        border-top: solid 1px #eee;
      }

      margin-top: 20px;
      padding: 24px 24px 0;
      a {
        color: $color;
      }
      .trade_input {
        margin-top: 5px;
      }

      .payment_btn {
        margin-top: 24px;
        width: 313px;
        height: 36px;
        font-size: 16px;
      }
    }
  }
</style>
<script>
  import MInput from './m-input.vue'

  import {addPayment, updateOrder} from '../../api/orderServer'
  import {showRemindAlert} from '../../utils/utils'

  export default {
    props: ['balance'],
    data () {
      return {
        tradeInput: {type: 'password', placeholder: '', value: '', class: 'address_input'},
        alertState: false
      }
    },

    methods: {
      //支付
      paymentSubmit(){
        if (this.tradeInput.value === '') {
          showRemindAlert('warning', '请输入交易密码');
          return
        }

        if (this.tradeInput.value.length !== 6) {
          showRemindAlert('warning', '交易密码长度不正确');
          return
        }

        this.alertState = false;

        let params = {
          orderId: this.balance.orderId,
          password: this.tradeInput.value
        };
        this.tradeInput.value = '';
        if (this.balance.cnyPrice) {
          addPayment(params, (data, err) => {
            this.resultHandle(err);
          })
        } else {
          updateOrder(params, (err) => {
            this.resultHandle(err)
          })
        }
      },

      resultHandle(err){
        if (err) {
          showRemindAlert('warning', err);
          return
        }
        showRemindAlert('success', '购买成功');
        if (this.$route.name === 'orderConfirm') {
          this.$router.push('/user/order');
        } else {
          this.$router.go(0)
        }
      }
    },

    components: {
      MInput,
    }
  }
</script>
