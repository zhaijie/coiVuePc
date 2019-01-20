<template>
  <section ref="footer" class="footer" :class="{'footer_bottom':isBottom}">
    <footer class="container clearfix">
      <div class="coi_fl">
        <img src="../../assets/images/logo_footer.png">

        <div class="clearfix">
          <dl class="footer_list">
            <dt>关于我们</dt>
            <dd>白皮书下载</dd>
            <dd>COI介绍</dd>
          </dl>

          <dl class="footer_list">
            <dt>联系我们</dt>
            <dd>工作时间：09:00-18:00</dd>
            <dd>客服邮箱：2642965524@qq.com</dd>
            <dd>电话客服：400-088-6015</dd>
          </dl>

        </div>
      </div>

      <div class="coi_fr">
        <!--<div class="code">-->
        <!--<img src="../../assets/images/app.png">-->
        <!--<p>扫码关注微信号</p>-->
        <!--</div>-->

        <div class="code">
          <img src="../../assets/images/app.png">
          <p>扫码下载APP</p>
        </div>
      </div>
    </footer>

    <div class="copyright">文创链版权所有 ©2018. All Rights Reserved.</div>
  </section>

</template>

<style scoped lang="scss" src="../../assets/css/public/footer.scss">
</style>

<script>
  //获取浏览器高度
  let doc = document;
  let docHeight = doc.documentElement.clientHeight || doc.body.clientHeight;

  export default {
    data () {
      return {
        isBottom: false, //是否需要置底
        footerHeight: 0,
        timer: null
      }
    },

    methods: {
      setIsBottom(){
        //判断是否出现滚动条
        if (this.$refs.footer.offsetTop < (docHeight - this.footerHeight)) {
          this.isBottom = true;
        } else {
          this.isBottom = false;
        }
      },
    },

    mounted(){
      this.footerHeight = this.$refs.footer.offsetHeight;
      this.setIsBottom();
    }
  }
</script>
