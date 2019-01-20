<template>

  <div class="product_item" :style="{width:width+'px',height:height+'px'}"
       @click="$router.push('/productDetail/'+productItem.productId)">
    <img v-lazy="productItem.productImage.paths[0]">
    <p class="product_name">{{productItem.productName}}</p>
    <p class="price_coi">{{productItem.cnyPrice ? parseFloat(productItem.cnyPrice).toFixed(4) : '0.0000'}} COI</p>
    <p class="price_cny">折合CNY：￥ {{productItem.price ? parseFloat(productItem.price).toFixed(2) : '0.00'}}</p>
    <!--{{parseFloat(productItem.cnyPrice).toFixed(2)}}-->
  </div>

</template>

<style scoped lang="scss">
  $productItemPadding: 12px;

  .product_item + .product_item {
    margin-left: 15px;
  }

  .product_item {
    cursor: pointer;
    padding: $productItemPadding;
    background-color: #fff;
    width: 204px;
    height: 284px;
    border-radius: $borderRadius;
    float: left;
    img {
      width: 100%;
      @include transition(all, .2s, linear);
      &:hover {
        @include transformScale(1.05)
      }
    }

    .product_name {
      margin: 12px 0;
      @include clamp(1)
    }

    .price_coi {
      color: $color;
      font-weight: bold;
      font-size: 16px;
    }

    .price_cny {
      font-size: 12px;
      color: #999;
    }
  }

</style>

<script>

  export default {
    props: ['width', 'height', 'productItem'],
    data () {
      return {}
    },

    methods: {},
  }
</script>
