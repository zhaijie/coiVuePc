<template>

  <div class="market">

    <div class="kine_header clearfix">
      <div class="coi_fl">
        <img src="../assets/images/icon_coi.png" width="36">
        <span class="name">COI/CNY</span>
        <span><i class="rise">0.0000</i>≈￥0.00</span>
        <span class="rise">+0.00%  ↑</span>
        <!--↓-->
      </div>

      <div class="coi_fr">

        <div>
          <p>24H最高价</p>
          <span>0.0000</span>
        </div>
        <div>
          <p>24H最高价</p>
          <span>0.0000</span>
        </div>
        <div>
          <p>24H最高价</p>
          <span>0.0000</span>
        </div>

      </div>
    </div>
    <div class="k_iframe">
      <iframe src="http://192.168.2.179:8020/Kline/saved_resource.html" width="1175"
              height="530"></iframe>
    </div>

    <button class="btn trade_btn" @click="goTrade">去交易</button>
  </div>

</template>
<style scoped lang="scss" src="../assets/css/market.scss">
</style>
<script>

  import {showRemindAlert} from '../utils/utils'

  export default {
    data () {
      return {}
    },

    methods: {
      goTrade(){
        showRemindAlert('warning', '暂未登录交易所')
      }
    },
  }
</script>



