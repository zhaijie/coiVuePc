<template>
  <div id="app">
    <m-header></m-header>
    <router-view></router-view>
    <m-footer v-if="$store.state.footerShow"></m-footer>
    <m-contact v-if="$store.state.footerShow" :contactData="contactData"></m-contact>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from './page/components/m-header'
  import MFooter from './page/components/m-footer'
  import MContact from './page/components/m-contact.vue'
  import {mapMutations} from 'vuex'
  import {customerService} from  './api/userServer'

  export default {
    name: 'App',
    data(){
      return {
        contactData: [
          {title: '微信', showTitleState: false, info: ''},
          {title: '邮箱', showTitleState: false, info: ''},
          {title: 'QQ', showTitleState: false, info: ''},
          {title: '电话', showTitleState: false, info: ''}
        ]
      }
    },

    methods: {
      ...mapMutations({
        loginState: 'SET_LOGIN_STATE'
      }),
    },

    created(){
      customerService(data => {
        this.contactData[0].info = data.item.wx;
        this.contactData[1].info = data.item.email;
        this.contactData[2].info = data.item.qq;
        this.contactData[3].info = data.item.phone;
      });
      if (window.localStorage.getItem('userInfo') || window.sessionStorage.getItem('userInfo')) {
        this.loginState(true);
      }
    },
    components: {
      MHeader,
      MFooter,
      MContact
    }
  }
</script>

<style lang="scss">
  @import "./assets/css/theme.scss";
  @import "./assets/css/public/common.scss";
  @import "./assets/css/public/reset.scss";
  @import "./assets/css/public/animate.css";

  html {
    min-height: 100%;
    position: relative;
  }

  #app {
    padding-top: $navHeight;
    padding-bottom: 364px;
    /*height: calc(100% - 64px);*/
    /*position: relative;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
  }
</style>
