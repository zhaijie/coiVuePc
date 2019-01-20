<template>

  <div class="about">
    <div class="about_img">
      <img src="../assets/images/about_bg.png">
    </div>

    <div class="about_bg">
      <div class="about_introduce">
        <h3 class="title">介绍</h3>
        <div class="clearfix">
          <div class="coi_fl">
            <img src="../assets/images/about_introduce.png">
          </div>
          <div class="coi_fr">
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;“文创链”（Culture and Originality Industry，简称COI）是基于区块链技术打造的一个公开诚信的中国书画艺术品交易平台社区，以区块链智能合约来完善文化艺术品的溯源、防伪、交易环节，致力于让文化艺术领域颠覆传统内容行业巨头的商业模式，从而构建全球分布式的数字内容生态系统。
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;文创链解决了文创行业优质作品流通率低、难以变现、有价无市、作品抄袭以及盗版混乱等问题。广泛应用于书画艺术品的鉴定、保真、估值、交易、展览等，做到作品鉴真溯源、价格透明。同时依托平台优势，为书画艺术家和其作品提供数据档案，并开展推广宣传。
            </p>

            <div class="about_issue">
              <p>发行量：<span class="bold">1000亿枚</span></p>
              <p>流通量：<span class="bold">100亿枚</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="about_paper">
      <div class="container clearfix">
        <div class="coi_fl">
          <img src="../assets/images/about_paper.png">
          <button @click="lookPaper" class="btn">点击查看白皮书</button>
        </div>
        <div class="coi_fr">
          <img src="../assets/images/about_app_bg.png">
          <button class="btn" @mouseenter="showAppCode = !showAppCode" @mouseleave="showAppCode = !showAppCode">
            扫码下载APP
          </button>
          <transition name="about-fade">
            <div class="app_code" v-if="showAppCode">
              <img src="../assets/images/app.png" class="app_img">
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>

</template>
<style scoped lang="scss" src="../assets/css/about.scss">
</style>
<script>
  export default {
    data () {
      return {
        showAppCode: false
      }
    },

    methods: {
      lookPaper(){
        window.open("http://www.coit.vip/coi.pdf");
      }
    },
  }
</script>



