<template>
  <swiper :options="swiperOption" v-if="bannerList.length">
    <swiper-slide v-for="item in bannerList" :key="item.showTime">
      <img :src="item.image">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<style scoped lang="scss">
  img {
    width: 100%;
  }
</style>

<style>
  .swiper-pagination-bullet {
    width: 24px;
    height: 4px;
    border-radius: 2px;
    background-color: #3B92FC;
    opacity: .3;
  }

  .swiper-pagination-bullet-active {
    opacity: 1;
  }
</style>


<script>

  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css';

  export default {
    props: ['bannerList'],
    data () {
      return {
        swiperOption: {
          speed: 300,
          loop: true,
          autoplay: {
            delay: 3000
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        }
      }
    },

    methods: {},

    components: {
      swiper,
      swiperSlide
    }
  }
</script>
