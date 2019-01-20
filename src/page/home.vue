<template>

  <div class="home_box">
    <m-banner :bannerList="bannerList"></m-banner>
    <!--搜素与分类-->
    <div class="search_level">
      <div class="container">
        <m-search></m-search>
        <product-level :firstLevel="$store.state.productType"></product-level>
      </div>
    </div>

    <!--大礼包与新品速递-->
    <slide-product :productList="bigGiftBagList" :title="'消费大礼包'"></slide-product>
    <slide-product :productList="newProductList" :title="'新品速递'"></slide-product>

    <!--商品列表-->
    <div class="product_home container" ref="productHome">
      <div class="product_list" v-for="(item1,index) in indexProductList">
        <p class="title">
          <img src="../assets/images/product_title_img.png">
          <span>{{item1.categoryName}}</span>
          <img src="../assets/images/product_title_img.png" class="right_img">
        </p>

        <div class="clearfix" v-for="(item2,i) in item1.productList">
          <product-item v-for="item3 in item2" :key="item3.productId" :productItem="item3"></product-item>

          <div class="product_more" :class="{'second':(index+1)%2 === 0}" v-if="i+1 === item1.productList.length">
            <p>{{item1.categoryName}}</p>
            <p class="bold">MORE</p>
            <button class="btn" @click="$router.push('/productList/'+item1.categoryId+'/0')">
              查看更多商品
            </button>
          </div>
        </div>
      </div>

      <ul class="home_product_type" :style="{top:productTypeTop+'px'}">
        <li v-for="(item,i) in $store.state.productType" v-if="i !==0" @click="goTypePosition(i)"
            :class="{'active':currentType === i}">
          {{item.zwm}}
        </li>
      </ul>

    </div>
  </div>
</template>
<style scoped lang="scss" src="../assets/css/home.scss">

</style>
<script>

  import * as productServer from '../api/productServer'
  import {mapActions} from 'vuex'

  import MBanner from './components/m-banner.vue'
  import MSearch from './components/m-search.vue'
  import ProductLevel from './components/product-level.vue'
  import SlideProduct from './components/slide-product.vue'
  import ProductItem from './components/product-item.vue'

  export default {
    data () {
      return {
        productTypeTop: 90,
        productHomeTop: 0,
        bannerList: [],
        bigGiftBagList: [],
        newProductList: [],
        indexProductList: [],
        currentType: 1,
//        currentTypeHeight: 0
      }
    },

    methods: {

      ...mapActions({getProductType: 'SET_PRODUCT_TYPE'}),

      goTypePosition(i){
        let doc = document;
        doc.body.scrollTop = this.indexProductList[i - 1].top[1] - 110;
        doc.documentElement.scrollTop = this.indexProductList[i - 1].top[1] - 110;
        this.currentType = i;
      },

      //获取大礼包
      getBigGiftBagAndNew(){
        productServer.bigGiftBag(data => {
          this.bigGiftBagList = data
        });

        productServer.newProductList(data => {
          this.newProductList = data
        });
      },

      //获取首页类型和商品
      getIndexProduct(){
        productServer.indexProduct(data => {
          this.indexProductList = data;
          let productHome = this.$refs.productHome;
          //获取商品类型区间
          setTimeout(() => {
            this.productHomeTop = productHome.offsetTop;
            for (let i = 0, len = data.length; i < len; i++) {
              if (i === 0) {
                this.indexProductList[i].top = [0, productHome.children[i].offsetTop + this.productHomeTop];
              } else {
                this.indexProductList[i].top = [this.indexProductList[i - 1].top[1], productHome.children[i].offsetTop + this.productHomeTop];
              }
            }
          }, 1000)
        });
      }
    },

    mounted(){
      //获取商品一级类型和banner
      this.getProductType(data => {
        productServer.getBannerList({type: data[0].id}, banner => {
          this.bannerList = banner.item;
        });
      });

      this.getBigGiftBagAndNew();
      this.getIndexProduct();

      //监听滚动条
      window.addEventListener("scroll", () => {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let top = scrollTop - this.productHomeTop;
        if (top > -300) {
          this.productTypeTop = 390 + top;
        } else {
          this.productTypeTop = 90
        }

        //是否在第一个区间
        if (scrollTop < this.indexProductList[0].top[1]) {
          this.currentType = 1;
          return
        }

        //是否在最后一个区间
        if (scrollTop > this.indexProductList[this.indexProductList.length - 1].top[0]) {
          this.currentType = this.indexProductList.length;
        }

        //判断滑动到哪个区间
        for (let i = 0, len = this.indexProductList.length; i < len - 1; i++) {
          if (scrollTop > this.indexProductList[i].top[0] && scrollTop < this.indexProductList[i].top[1]) {
            this.currentType = i + 1;
            return
          }
        }
      });
    },

    components: {
      MBanner,
      MSearch,
      ProductLevel,
      SlideProduct,
      ProductItem
    }
  }

</script>



