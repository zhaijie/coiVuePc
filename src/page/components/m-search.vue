<template>

  <div class="my_search">
    <m-input class="coi_fl" :inputInfo="inputInfo"></m-input>
    <button class="btn search_btn" @click="goSearch()">搜索</button>
    <button class="btn cart_btn" @click="goCart()">
      <img src="../../assets/images/icon_cart.png">
      我的购物车（{{$store.state.shoppingCount || 0}}）
    </button>
  </div>
</template>

<style scoped lang="scss">

  .my_search {
    width: 670px;
  }

  .search_btn {
    height: 36px;
    width: 90px;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    font-size: 16px;
  }

  .cart_btn {
    height: 36px;
    width: 160px;
    float: right;
    /*margin-left: 24px;*/
    img {
      position: relative;
      top: -2px;
    }
  }

</style>

<script>
  //  import {mapActions} from 'vuex'
  import MInput from './m-input.vue'
  import {getUserInfo, showRemindAlert} from '../../utils/utils'
  export default {
    props: ['inputClass'],
    data () {
      return {
        inputInfo: {
          type: 'text',
          value: '',
          placeholder: '请输入关键词/名称',
          class: ['search_input', this.inputClass]
        }
      }
    },

    methods: {
//      ...mapActions({getShoppingCount: 'SET_SHOPPING_COUNT'}),

      goCart(){
        if (this.$store.state.shoppingCount === null) {
          showRemindAlert('warning', '请先登录')
        } else {
          this.$router.push('/user/cart')
        }
      },

      goSearch(){
        if (this.inputInfo.value) {
          this.$router.push('/search/' + this.inputInfo.value)
        } else {
          showRemindAlert('warning', '请输入搜索内容')
        }
      }
    },

//    mounted(){
//      this.getShoppingCount()
//    },

    components: {
      MInput
    }
  }
</script>
