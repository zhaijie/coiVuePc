<template>

  <div class="my_alert" v-if="alertState">
    <div class="alert_content text-center">
      <div class="alert_close" @click="alertState = false">
        <img src="../../../assets/images/icon_close.png">
      </div>

      <img v-if="confirmInfo.alertType" :src="require('../../../assets/images/'+confirmInfo.alertType+'.png')"
           class="alert_img">

      <p class="alert_text">{{confirmInfo.alertText}}</p>
      <p>{{confirmInfo.subText}}</p>


      <div class="alert_btn">
        <button v-for="item in confirmInfo.buttons" class="btn" @click="buttonClick(item.handle)"
                :class="item.addClass">
          {{item.text}}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="../../../assets/css/public/alert.scss">
</style>

<script>
  export default {
    data () {
      return {}
    },
    methods: {
      buttonClick(callback){
        this.alertState = !this.alertState;
        if (callback) {
          callback();
        }
      },
    }
  }
</script>
