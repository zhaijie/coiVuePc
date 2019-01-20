<template>
  <div>
    <div class="product_detail container">
      <div class="crumbs clearfix">
        <div class="coi_fl">
          当前位置:
          <router-link to="/home">首页</router-link>
          <span v-if="currentProductType.zwm"> > </span>
          <router-link :to="'/productList/'+currentProductType.id+'/0'">{{currentProductType.zwm}} </router-link>
          > {{productDetail.name}}
        </div>
        <div class="coi_fr">
          <m-search class="product_search" :inputClass="'product_search'"></m-search>
        </div>
      </div>

      <div class="product_info clearfix">
        <div class="product_img">
          <div class="main_img" @mouseenter="magnifierIn($event)" @mouseleave="magnifierOut($event)"
               @mousemove="magnifierMove($event)">
            <div class="magnifier" v-if="magnifierState"
                 :style="{top:magnifierTop+'px', left:magnifierLeft+'px'}">
            </div>
            <img :src="mainImg">
          </div>

          <div class="img_list" v-if="productDetail.imagePath">
            <div class="img_item" v-for="item in productDetail.imagePath.paths">
              <img :src="item" @click="mainImg = item">
            </div>
          </div>
        </div>
        <div class="detail">
          <div class="magnifier_img" v-if="magnifierState">
            <img :src="mainImg" :style="{top:-(magnifierTop * 2)+'px', left:-(magnifierLeft * 2)+'px'}">
          </div>

          <p class="name">{{productDetail.name}}</p>

          <p class="price_coi">
            <span class="title">商品售价：</span>{{productDetail.cnyPrice}} {{productDetail.bName}}
          </p>
          <p class="price_cny"><span class="title">折合CNY：</span>￥{{productDetail.coiPrice}}</p>

          <div class="spec">
            <span class="title">规格：</span>

            <i :class="{'active':specId === item.specificationsId}" @click="changeSpecId(item)"
               v-for="item in productDetail.specifications">{{item.ggName}}
            </i>
          </div>
          <div class="number">
            <span class="title">数量：</span>

            <button class="btn" @click="reduceProductNum">-</button>
            <i>{{inventory === 0 ? inventory : productNumber}}</i>
            <button class="btn" @click="addProductNum">+</button>

            <span class="inventory">（库存：还剩 {{inventory}} 件！）</span>

          </div>

          <div class="handle_btn">
            <button class="btn" v-if="inventory !== 0"
                    @click="$router.push('/orderConfirm/'+productDetail.productId+'/'+specId+'/'+productNumber+'/1')">
              立即购买
            </button>
            <button class="btn cart_btn" @click="addCart">加入购物车</button>
          </div>
        </div>
      </div>
    </div>

    <div class="product_dec">
      <div class="container clearfix">
        <!--商品详情-->
        <div class="dec">
          <div class="title">商品详情</div>
          <div class="content" v-html="productDetail.info">

          </div>
        </div>

        <!--推荐商品-->
        <div class="recommend">
          <div class="title text-center">推荐商品</div>
          <div class="content clearfix">

            <div class="new_product_item" v-for="item in $store.state.recommendProduct"
                 @click="$router.push('/productDetail/'+item.productId);getProductDetail(item.productId)">
              <div class="new_product_name">
                <div>
                  <p class="product_price">
                    <span class="bold">{{item.price.toFixed(4)}} COI</span>(￥{{item.price.toFixed(2)}})
                  </p>
                  <p>{{item.productName}}</p>
                </div>
              </div>
              <img :src="item.productImage">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss" src="../assets/css/productDetail.scss"></style>

<style>
  .product_dec .dec img {
    width: 100%;
  }
</style>

<script>

  import {mapActions} from 'vuex'

  import MSearch from './components/m-search.vue'
  import {getProductDetail} from '../api/productServer'
  import {addShopping} from '../api/cartServer'
  import {showRemindAlert} from '../utils/utils'

  export default {
    data () {
      return {
        productNumber: 1,
        productDetail: {},
        specId: '',
        mainImg: '',
        inventory: 0,
        currentProductType: {},
        magnifierState: false,
        magnifierWidth: 200,  //放大镜width
        magnifierLeft: 0, //放大镜左边距离
        magnifierTop: 0, //放大镜顶部距离
        mainBoxWidth: 400, //主图宽度
        mainBoxLeft: 0, //主图左边距离
        mainBoxTop: 0,//主图顶部距离
      }
    },

    methods: {
      ...mapActions({getRecommendProduct: 'RECOMMEND_PRODUCT'}),
      ...mapActions({getProductType: 'SET_PRODUCT_TYPE'}),
      ...mapActions({addCartCount: 'SET_SHOPPING_COUNT'}),

      //放大镜移入
      magnifierIn(e){
        this.magnifierState = true;
        this.mainBoxTop = e.target.offsetTop;
        this.mainBoxLeft = e.target.offsetLeft;
      },

      //放大镜移动
      magnifierMove(e){
        //鼠标距离 - 主图offset距离 - 放大镜width = 放大镜中间距离
        let left = (e.clientX - this.mainBoxLeft - this.magnifierWidth / 2);
        let top = (e.clientY - this.mainBoxTop - this.magnifierWidth / 2);

        //判断X轴是否出界
        if (left < 0) {
          left = 0
        }

        if (left > this.mainBoxWidth - this.magnifierWidth) {
          left = this.mainBoxWidth - this.magnifierWidth;
        }

        //判断Y轴是否出界
        if (top < 0) {
          top = 0;
        }

        if (top > this.mainBoxWidth - this.magnifierWidth) {
          top = this.mainBoxWidth - this.magnifierWidth;
        }

        this.magnifierLeft = left;
        this.magnifierTop = top;
      },

      //放大镜移出
      magnifierOut(e){
        this.magnifierState = false;
      },

      //添加商品数量
      addProductNum(){
        if (this.productNumber >= this.inventory) {
          showRemindAlert('warning', '库存数量不足');
          return
        }
        this.productNumber++;
      },

      //减少商品数量
      reduceProductNum(){
        if (this.productNumber === 1) {
          return
        }
        this.productNumber--;
      },

      //选择规格
      changeSpecId(specItem){
        this.specId = specItem.specificationsId;
        this.productDetail.coiPrice = parseFloat(specItem.presentPrice).toFixed(4);
        this.productDetail.cnyPrice = specItem.cnyPrice.toFixed(2);
        this.inventory = specItem.inventory;
      },

      //获取商品详情
      getProductDetail(productId){
        let params = {
          productId: productId
        };
        getProductDetail(params, data => {
          this.productDetail = data;
          this.specId = this.productDetail.specifications[0].specificationsId;
          this.mainImg = this.productDetail.imagePath.paths[0];
          //获取当前规格价格
          this.productDetail.coiPrice = parseFloat(this.productDetail.specifications[0].presentPrice).toFixed(4);
          this.inventory = this.productDetail.specifications[0].inventory;
          this.productDetail.cnyPrice = this.productDetail.specifications[0].cnyPrice.toFixed(2);

          this.getProductType(productType => {
            for (let i = 0; i < productType.length; i++) {
              if (productType[i].id === data.lbId) {
                this.currentProductType = productType[i];
              }
            }
          })
        });
      },

      //加入购物车
      addCart(){
        let params = {
          productId: this.productDetail.productId,
          specificationsId: this.specId
        };

        addShopping(params, err => {
          if (err) {
            showRemindAlert('warning', err);
          } else {
            showRemindAlert('success', '加入购物车成功');
            this.addCartCount();
          }
        })
      }
    },

    mounted(){
      this.getRecommendProduct();
      this.getProductDetail(this.$route.params.productId);
    },

    components: {
      MSearch
    }
  }
</script>

