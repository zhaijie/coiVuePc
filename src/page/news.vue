<template>

  <div class="news_bg">
    <div class="news">
      <div class="news_banner">
        <img src="../assets/images/banner_message.png">
      </div>
      <div class="news_Content">
        <div class="news_imgBox">
          <div class="news_img" v-for="item in newsImgList" :key="item.id"
               @click="$router.push('/newsDetail/'+item.id+'/'+item.type)">
            <img :src="item.imageUrl" alt="">
            <div class="news_imgTitle">{{item.typeText}}</div>
            <p class="news_imgInfo">{{item.title}}</p>
          </div>
        </div>
        <div class="news_ContentBox">
          <div class="news_menuBox">
            <p class="title">栏目列表</p>
            <ul class="news_menu">
              <li v-for="(item,i) in menuList" @click="clickActive(item)" :key="item.id"
                  :class="currentMenu === item.id ? 'newsActive' : ''">{{item.title}}
              </li>
            </ul>
            <img src="../assets/images/img_news.png">
          </div>
          <div class="news_infoBox" v-if="newsInfoList.item.length">
            <div class="news_info" v-for="item in newsInfoList.item">
              <div class="news_timeBox">
                <p class="news_month">2018-11</p>
                <p class="news_day">15</p>
                <p class="news_time">15:26:25</p>
              </div>
              <div class="news_infoTextBox">
                <p class="news_infoTitle">【{{item.typeText}}】{{item.title}}</p>
                <p class="news_infoSign">{{item.from_}}</p>
                <p class="news_infoText" v-html="item.content"></p>
                <button class="btn news_checkBtn" @click="$router.push('/newsDetail/'+item.id+'/'+item.type)">查看详情
                </button>
              </div>
            </div>
          </div>

          <div class="notData" v-else>
            <img src="../assets/images/null.png">
          </div>
        </div>

        <m-pagination :totalPage="newsInfoList.totalPage" @getPageData="getPageData"
                      v-if="newsInfoList.totalPage"></m-pagination>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss" src="../assets/css/news.scss">
</style>
<script>
  import * as newsServer from "../api/newsServer";
  import MPagination from "./components/m-pagination.vue";

  export default {
    data() {
      return {
        menuList: [
          {id: 0, title: "全部", type: 0},
          {id: 1, title: "公告", type: 'GG'},
          {id: 2, title: "文创资讯", type: 'WC'},
          {id: 3, title: "区块资讯", type: 'KX'}
        ],
        currentMenu: 0,
        currentNewsType: 0,
        newsImgList: [],
        newsInfoList: {item: []},
        totalPage: "1",
      };
    },

    methods: {

      //切换资讯类型
      clickActive(e) {
        this.currentMenu = e.id;
        this.currentNewsType = e.type;
        this.getNewsList(this.currentNewsType);
      },

      //获取最新资讯
      getNewsInfo() {
        newsServer.getNewInformation(data => {
          this.newsImgList = data;
        });
      },

      //获取资讯列表
      getNewsList(type, page){
        let params = {
          start: page || 1,
          offset: 10,
          type: type || 0,

        };
        newsServer.announcementList(params, data => {
          if (params.start === 1) {
            this.newsInfoList.totalPage = 0;
            this.$nextTick(() => {
              this.newsInfoList = data;
            });
          } else {
            this.newsInfoList = data;
          }
        })
      },

      //获取资讯列表分页数据
      getPageData(page){
        this.getNewsList(this.currentNewsType, page);
        let doc = document;
        doc.body.scrollTop = 0;
        doc.documentElement.scrollTop = 0;
      },
    },

    mounted() {
      this.getNewsInfo();
      this.getNewsList();
    },
    components: {
      MPagination
    }
  };
</script>



