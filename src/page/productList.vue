<template>

  <div>
    <m-banner :bannerList="bannerList"></m-banner>

    <!--搜素与分类-->
    <div class="search_level">
      <div class="container">
        <m-search></m-search>
        <product-level :firstLevel="$store.state.productType"></product-level>
      </div>
    </div>

    <!--2,3级分类-->
    <div class="product_list_class">
      <div class="container">
        <div class="title">当前位置:
          <router-link to="/home">首页</router-link>
          > {{currentTypeName}}
        </div>
        <div class="class_info clearfix" v-for="item1 in classList">
          <div class="class_title coi_fl">{{item1.dName}}:</div>
          <div class="class_content coi_fl">
            <span @click="$router.push('/productList/'+categoryId+'/0')">全部</span>
            <span :class="{'active':xId == item2.xId}" @click="$router.push('/productList/'+categoryId+'/'+item2.xId)"
                  v-for="item2 in item1.fenlei">
              {{item2.xName}}
            </span>
          </div>
        </div>

        <div class="class_info class_sort clearfix">
          <div class="class_title coi_fl">排序:</div>
          <div class="class_content coi_fl">
            <span :class="{'active':sortType === 0}" @click="sortTypeHandle(0)">默认</span>
            <span :class="{'active':sortType === 1}" @click="sortTypeHandle(1)">热度</span>
            <span :class="{'active':sortType === 3}" @click="sortTypeHandle(3)">价格</span>
            <span :class="{'active':sortType === 2}" @click="sortTypeHandle(2)">上架时间</span>
          </div>
        </div>
      </div>
    </div>

    <!--商品列表-->
    <div class="product_list clearfix">
      <product-item v-for="(item,i) in productList.item" :key="item.productId" :productItem="item"></product-item>
    </div>

    <m-pagination @getPageData="getProductList" :totalPage="productList.totalPage"
                  v-if="productList.totalPage">
    </m-pagination>
  </div>
</template>
<style scoped lang="scss">
  .search_level {
    padding: 35px 0 0;
    background-color: #fff;
    .container {
      margin-top: 20px;
    }
  }

  .product_list_class {
    margin-top: 7px;
    padding: 22px 0 25px;
    background-color: #fff;
    .title {
      margin-bottom: 22px;
    }

    .class_info {
      .class_title {
        width: 73px;
        color: #999;
        line-height: 30px;
      }

      .class_content {
        width: calc(100% - 73px);
        span {
          margin-right: 40px;
          cursor: pointer;
          line-height: 30px;
          &:hover, &.active {
            color: $color;
          }
        }
      }
    }

    .class_info + .class_info {
      margin-top: 10px;
    }
    .class_sort {
      margin-top: 14px !important;
      border-top: 1px dashed #ccc;
      padding-top: 10px;
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
  import * as productServer from '../api/productServer'
  import {mapActions} from 'vuex'

  import MBanner from './components/m-banner.vue'
  import MSearch from './components/m-search.vue'
  import ProductLevel from './components/product-level.vue'
  import ProductItem from './components/product-item.vue'
  import MPagination from './components/m-pagination.vue'

  export default {
    data () {
      return {
        bannerList: [],
        productList: [],
        classList: [],
        categoryId: '',
        xId: 0,
        currentTypeName: '',
        sortType: 0,
        priceInt: 0
      }
    },

    methods: {

      ...mapActions({getProductType: 'SET_PRODUCT_TYPE'}),

      //获取当前商品类型名称
      getCurrentTypeName(){
        for (let i = 0, len = this.$store.state.productType.length; i < len; i++) {
          if (this.$store.state.productType[i].id + '' === this.categoryId) {
            this.currentTypeName = this.$store.state.productType[i].zwm
          }
        }
      },

      //排序处理
      sortTypeHandle(type){
        this.priceInt = type === 3 ? 1 : 0;
        this.sortType = type;
        this.getProductList();
      },

      //获取商品列表
      getProductList(page){
        let doc = document;
        doc.body.scrollTop = 0;
        doc.documentElement.scrollTop = 0;
        let params = {
          start: page || 1,
          offset: 20,
          categoryId: this.categoryId,
          xId: this.xId,
          type: this.sortType,
        };

        if (this.priceInt) {
          params.priceInt = this.priceInt;
        }

        productServer.getProductList(params, data => {
          if (params.start === 1) {
            this.productList.totalPage = false;
            this.$nextTick(() => {
              this.productList = data
            });
          } else {
            this.productList = data
          }
        });
      },

      init(params){
        this.categoryId = params.categoryId;
        this.xId = params.xId;
        this.getProductList();

        //获取2，3级分类
        productServer.listClassification({categoryId: this.categoryId}, data => {
          this.classList = data;
        })
      }
    },

    mounted(){
      this.getProductType(() => {
        this.getCurrentTypeName();
        this.init(this.$route.params);
        //获取banner
        productServer.getBannerList({type: this.$store.state.productType[0].id}, banner => {
          this.bannerList = banner.item;
        });
      });
    },


    watch: {
      $route(to){
        if (to.params.categoryId !== this.categoryId) {
          this.categoryId = to.params.categoryId;
          this.xId = 0;
          this.getCurrentTypeName();
          this.init(to.params);
          return;
        }

        this.xId = to.params.xId;
        this.getProductList()

      }
    },
    components: {
      MBanner,
      MSearch,
      ProductLevel,
      ProductItem,
      MPagination
    }
  }
</script>

