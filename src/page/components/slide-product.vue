<template>
  <div class="new_product container">
    <p class="title">
      <img src="../../assets/images/recommend_title.png" class="left_img">
      {{title}}
      <img src="../../assets/images/recommend_title.png" class="right_img">
    </p>

    <img src="../../assets/images/icon_arrow.png" class="arrow_img left" @click="slideLeft">
    <img src="../../assets/images/icon_arrow.png" class="arrow_img right" @click="slideRight">

    <div class="product_slide">
      <div class="product_list clearfix" :style="{marginLeft:marginLeftPx+'px'}" v-if="title === '消费大礼包'">
        <product-item :width="176" :height="256" :productItem="item"
                      v-for="item in productList" :key="item.productId">
        </product-item>
      </div>

      <div class="product_list clearfix" :style="{marginLeft:marginLeftPx+'px'}" v-if="title === '新品速递'">


        <div class="new_product_item" v-for="item in productList"
             @click="$router.push('/productDetail/'+item.productId)">
          <div class="new_product_name">
            <p>{{item.productName}}</p>
          </div>
          <img :src="item.productImage.paths[0]">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

  $titleImgRotate: rotate(180deg);
  @mixin newProductBox($position) {
    width: 200px;
    height: 200px;
    position: $position;
    cursor: pointer;
  }

  @mixin titleImg {
    position: relative;
    top: -10px;
  }

  .new_product {
    position: relative;
    .title {
      margin: 50px 0 20px;
      text-align: center;
      font-size: 28px;
      font-weight: 400;
      .left_img {
        @include titleImg;
        left: 28px;
      }

      .right_img {
        @include titleImg;
        @include transformRotate(rotateY(-180deg));
        right: 28px;
      }
    }

    .arrow_img {
      position: absolute;
      top: 50%;
      opacity: .7;
      cursor: pointer;
      z-index: 9;
      &:hover {
        opacity: 1;
      }

      &.right {
        right: 0;
      }
      &.left {
        @include transformRotate(rotate(-180deg));
        left: 0;
      }
    }

    .product_slide {
      width: 1060px;
      margin: 0 auto;
      overflow: hidden;
    }

    .product_list {
      width: max-content;
      @include transition(all, .4s, ease);

      .new_product_item + .new_product_item {
        margin-left: 15px;
      }

      .new_product_item {
        @include newProductBox(relative);
        float: left;
        .new_product_name {
          @include newProductBox(absolute);
          z-index: 1;
          display: flex;
          align-items: flex-end;
          background-color: rgba(0, 0, 0, .4);
          p {
            margin: 0 0 12px 12px;
            color: #fff;
            @include clamp(1)
          }
        }
        img {
          @include newProductBox(absolute);
        }
      }

    }
  }
</style>
<script>

  import ProductItem from './product-item.vue'
  export default {
    props: ['title', 'productList'],
    data () {
      return {
        marginLeftPx: 0,
        currentSlideEnd: 5
      }
    },

    methods: {
      slideLeft(){
        if (this.marginLeftPx) {
          this.marginLeftPx = this.marginLeftPx + 215
        }
      },

      slideRight(){
        if (this.currentSlideEnd === this.productList.length) {
          return
        }
        if (this.productList.length > 5) {
          this.marginLeftPx = this.marginLeftPx - 215;
          this.currentSlideEnd++;
        }
      },
    },

    components: {
      ProductItem
    }
  }
</script>
