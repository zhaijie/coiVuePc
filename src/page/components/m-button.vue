<template>

  <button class="btn" @click="clickHandle" :class="buttonInfo.addClass" v-html="text"></button>

</template>

<style scoped lang="scss">

</style>

<script>

  export default {
    props: ['buttonInfo'],
    data () {
      return {
        text: this.buttonInfo.text,
        clickState: true,
        buttonLoadingImg: require('../../assets/images/button_loading.gif'),
      }
    },

    methods: {
      async clickHandle(){
        if (this.clickState) {
          this.clickState = false;
          this.text = '<img src=' + this.buttonLoadingImg + ' width="20">';
          await this.buttonInfo.handle();
//          this.text = this.buttonInfo.text;
//          this.clickState = true;
        }
      }
    },

    mounted(){
    }
  }
</script>
