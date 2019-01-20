<template>

  <div class="fundraising">
    <p class="color">您若需购买 COI，请联系以下客服进行咨询交易：</p>

    <ul class="fundraising_contact">
      <li><i class="wx"></i> 微信客服：{{fundraising.wx}}</li>
      <li><i class="phone"></i> 电话号码：{{fundraising.phone}}</li>
      <li><i class="qq"></i> QQ客服：{{fundraising.qq}}</li>
      <li><i class="email"></i> 邮箱客服：{{fundraising.email}}</li>
    </ul>
    <img src="../../assets/images/icon_fundraising.png" class="fundraising_img">
  </div>
</template>
<style scoped lang="scss">
</style>
<script>

  import {customerService} from '../../api/userServer'

  export default {
    data () {
      return {
        fundraising: {}
      }
    },

    methods: {},

    mounted(){
      let _this = this;
      customerService(function (data) {
        _this.fundraising = data.item;
      })
    },
  }
</script>



