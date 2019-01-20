<template>

  <aside>
    <dl v-for="item in menuList">
      <dt><i :class="'menu_icon'+item.id"></i>{{item.title}}</dt>
      <dd v-for="item2 in item.submenu" @click="setCurrentMenu(item2, item.title)"
          :class="currentMenuLink === item2.link?'active':''">

        <span>{{item2.title}}</span>
      </dd>
    </dl>
  </aside>

</template>

<style scoped lang="scss" src="../../assets/css/public/menu.scss">
</style>

<script>

  import {logout} from '../../api/userServer'
  import {mapMutations} from 'vuex'

  export default {
    props: ['menuList'],
    data () {
      return {
        currentMenuLink: ''
      }
    },

    methods: {
      ...mapMutations({
        loginState: 'SET_LOGIN_STATE'
      }),
      //设置当前菜单link
      setCurrentMenu(submenu, menuTitle){
        this.userSafeLink();
        //安全退出
        if (submenu.id === 14) {
          logout(() => {
            this.loginState(false);
            this.$router.push(submenu.link);
          });
          return
        }
        this.$router.push(submenu.link);
        this.currentMenuLink = submenu.link;
        this.$emit('setCrumbs', menuTitle, submenu.title);
      },

      userSafeLink(){
        if (this.$route.name === 'userSafe') {
          let type = this.$route.params.type;
          this.currentMenuLink = type === '3' ? '/user/userSafe/1' : this.currentMenuLink;
          this.currentMenuLink = (type === '5' || type === '4') ? '/user/userSafe/2' : this.currentMenuLink;
        }
      }
    },

    created(){
      this.currentMenuLink = this.$route.path;
      this.userSafeLink();
      //初始化面包屑
      for (let i = 0, len = this.menuList.length; i < len; i++) {
        for (let j = 0, len = this.menuList[i].submenu.length; j < len; j++) {
          if (this.menuList[i].submenu[j].link === this.currentMenuLink) {
            this.$emit('setCrumbs', this.menuList[i].title, this.$route.meta.title);
            return
          }
        }
      }
    }
  }
</script>
