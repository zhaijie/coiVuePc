<template>

  <div>
    <div class="newsDetail container">
      <div class="newsD_header">
        <p class="crumbs">当前位置: 资讯 > {{crumbs1}} > {{crumbs2}}</p>
        <button class="btn goBack" @click="$router.go(-1)">返回上一级</button>
      </div>
      <div class="newsD_Content">
        <div class="newsD_ContentHeader clearfix">
          <p class="newsD_title coi_fl">{{newsData.title}}</p>
          <p class="newsD_time coi_fr">{{newsData.from_}}&nbsp;&nbsp;丨&nbsp;&nbsp;{{newsData.createTime}}</p>
        </div>

        <div v-html="newsData.content" style="word-break: break-all">

        </div>
      </div>
    </div>
    <div class="newsD"></div>
  </div>
</template>
<style scoped lang="scss" src="../assets/css/news.scss">
</style>
<script>
  import * as newsServer from "../api/newsServer";
  export default {
    data() {
      return {
        crumbs1: '',
        crumbs2: '',
        newsData: {},
        newsType: ''
      };
    },

    methods: {
      //设置面包屑
      setCrumbs(crumbs1, crumbs2){

      }
    },

    mounted() {
    },
    created() {
      this.newsType = this.$route.params.type;
      this.crumbs1 = newsServer.setTypeText(this.newsType);

      let detailFun = this.newsType === 'GG' ? 'getAnnouncementDetail' : 'getNewInfoDetail';

      newsServer[detailFun]({id: this.$route.params.id}, (res) => {
        this.crumbs2 = res.title;
        this.newsData = res;
      });
    },
  };
</script>



