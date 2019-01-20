<template>
  <div class="user_bg">
    <div class="container clearfix">

      <p class="crumbs">当前位置: 个人中心 > {{crumbs1}} > {{crumbs2}}</p>

      <m-menu ref="menu" :menuList="menuList" @setCrumbs="setCrumbs"></m-menu>

      <section class="user_content" :style="{minHeight:menuHeight+'px'}">
        <keep-alive exclude="orderDetail">
          <router-view></router-view>
        </keep-alive>
      </section>
    </div>
  </div>
</template>
<style lang="scss" src="../assets/css/user.scss">
</style>
<script>

  import MMenu from './components/m-menu.vue'
  import * as userServer from '../api/userServer'

  export default {
    data () {
      return {
        menuList: [],
        crumbs1: '',
        crumbs2: '',
        menuHeight: 0
      }
    },

    methods: {
      //设置面包屑
      setCrumbs(crumbs1, crumbs2){
        this.crumbs1 = crumbs1;
        this.crumbs2 = crumbs2;
      }
    },

    mounted(){
      this.menuHeight = this.$refs.menu.$el.offsetHeight - 48;
    },

    created(){
      this.menuList = userServer.getMenu();
    },
    components: {
      MMenu
    }
  }
</script>



