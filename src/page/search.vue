<template>
  <div>
    <div class="search container">
      <div class="crumbs clearfix">
        <div class="coi_fl">
          当前位置:
          <router-link to="/home">首页</router-link>
          > {{$route.params.searchText}}
        </div>
        <div class="coi_fr">
          <m-search class="product_search" :inputClass="'product_search'"></m-search>
        </div>
      </div>
    </div>

    <div class="class_info clearfix">
      <div class="container">
        <div class="class_title coi_fl">排序:</div>
        <div class="class_content coi_fl">
          <span :class="{'active':sortType === 0}" @click="sortTypeHandle(0)">默认</span>
          <span :class="{'active':sortType === 1}" @click="sortTypeHandle(1)">热度</span>
          <span :class="{'active':sortType === 3}" @click="sortTypeHandle(3)">价格</span>
          <span :class="{'active':sortType === 2}" @click="sortTypeHandle(2)">上架时间</span>
        </div>
      </div>
    </div>


    <!--商品列表-->
    <div class="product_list clearfix" v-if="productList.item.length">
      <product-item v-for="item in productList.item" :key="item.productId" :productItem="item"></product-item>
    </div>

    <div class="notData" v-else>
      <img src="../assets/images/null.png">
    </div>

    <m-pagination @getPageData="searchResult" :totalPage="productList.totalPage"
                  v-if="productList.totalPage">
    </m-pagination>

  </div>
</template>
<style scoped lang="scss">
  .search {
    margin-top: 35px;
  }

  .crumbs {
    .coi_fl {
      line-height: 36px;
    }
    .col_fr {
      width: 50%;
    }
  }

  .product_search {
    width: 550px !important;
  }

  .class_info {
    margin-top: 36px;
    line-height: 62px;
    background-color: #fff;

    .class_title {
      width: 73px;
      color: #999;
    }

    .class_content {
      width: calc(100% - 73px);
      span {
        margin-right: 40px;
        cursor: pointer;
        &:hover, &.active {
          color: $color;
        }
      }
    }
  }

  .product_list {
    width: $container + 15px;
    margin: 35px auto;
    .product_item {
      margin: 0 15px 15px 0 !important;
    }
  }

  .pagination {
    margin-bottom: 35px;
  }
</style>
<script>

  import MSearch from './components/m-search.vue'
  import ProductItem from './components/product-item.vue'
  import MPagination from './components/m-pagination.vue'

  import {searchProduct} from '../api/productServer'

  export default {
    data () {
      return {
        sortType: 0,
        productList: {item: []},
        priceInt: false,
      }
    },

    methods: {
      searchResult(page, type){
        let doc = document;
        doc.body.scrollTop = 0;
        doc.documentElement.scrollTop = 0;
        let params = {
          start: page || 1,
          offset: 20,
          keyword: this.$route.params.searchText,
          type: type || 0
        };

        if (type === 3) {
          this.priceInt = !this.priceInt;
          params.type = 0;
          params.priceInt = this.priceInt ? 1 : 2
        }

        searchProduct(params, data => {
          this.productList = data;
        })
      },

      sortTypeHandle(type){
        this.sortType = type;
        this.searchResult(1, type)
      }
    },

    mounted(){
      this.searchResult();
    },

    watch: {
      $route(){
        this.searchResult();
      }
    },

    components: {
      MSearch, ProductItem, MPagination
    }
  }
</script>

