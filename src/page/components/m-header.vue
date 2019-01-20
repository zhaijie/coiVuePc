<template>
  <section class="header">
    <div class="header_top" v-if="$store.state.loginState">
      <div class="container clearfix">
        <img src="../../assets/images/icon_news.png" class="coi_fl">
        <router-link :to="'/newsDetail/'+noticeObj.id+'/'+noticeObj.type">
          {{noticeObj.title}}
        </router-link>

        <span class="coi_fr" @click="goCart">
          <img src="../../assets/images/header_cart.png">
          我的购物车（{{$store.state.shoppingCount || 0}}）
        </span>
      </div>
    </div>

    <header class="container clearfix">
      <router-link to="/home">
        <img src="../../assets/images/logo.png" class="coi_fl logo_img">
      </router-link>

      <div class="coi_fr form_box" v-if="!$store.state.loginState" @click="currentNav = 99">
        <router-link to="/form/0">登录</router-link>
        |
        <router-link to="/form/1">注册</router-link>
      </div>

      <nav class="coi_fr">
        <router-link v-for="item in navList" :class="item.id === currentNav?'active':''" :to="item.link"
                     :key="item.title" @click.native="switchNav(item.id)">
          {{item.title}}
        </router-link>
        <!--<transition name="slide">-->
        <!--<p></p>-->
        <!--</transition>-->
      </nav>
    </header>

  </section>
</template>

<style lang="scss" scoped src="../../assets/css/public/header.scss">
</style>
<script>

  import {showRemindAlert} from '../../utils/utils'
  import {cartCountMixin} from '../../utils/cartCountMixin'
  import {announcementList} from '../../api/newsServer'

  export default {
    mixins: [cartCountMixin],
    data () {
      return {
        navList: [
          {id: 0, title: '行权中心', link: '/home'},
          {id: 1, title: '关于COI', link: '/about'},
          {id: 2, title: 'COI行情', link: '/market'},
          {id: 3, title: '资讯', link: '/news'},
        ],
        currentNav: 0,
        noticeObj: {}
      }
    },

    methods: {
      switchNav(navId){
        this.currentNav = navId;
      },

      goCart(){
        if (this.$store.state.shoppingCount === null) {
          showRemindAlert('warning', '请先登录')
        } else {
          this.$router.push('/user/cart')
        }
      },

      //显示导航active
      setCurrentNav(route){
        //如果form则不显示导航active
        if (route.name === 'form') {
          this.currentNav = 99;
        }

        this.currentNav = route.meta.id;
        if (route.matched.length > 1) {
          this.currentNav = route.matched[0].meta.id;
        }
      },

      pushUser(){
        if (this.$store.state.loginState && this.navList[this.navList.length - 1].id !== 4) {
          this.navList.push(
            {id: 4, title: '个人中心', link: '/user'},
          );
          this.getShoppingCount();
        }

        if (!this.$store.state.loginState && this.navList[this.navList.length - 1].id === 4) {
          this.navList.splice(this.navList.length - 1, 1);
        }

      },

      //查询第一条公告
      announcementListFirst(){
        let params = {
          start: 1,
          offset: 1,
          type: 'GG'
        };

        announcementList(params, (data) => {
          this.noticeObj = data.item[0]
        })
      }
    },

    created(){
      this.setCurrentNav(this.$route);
      //如果已经登录显示个人中心
      this.pushUser();
      this.announcementListFirst();
    },

    watch: {
      $route(to){
        this.setCurrentNav(to);
        this.pushUser();
      }
    },
  }
</script>



