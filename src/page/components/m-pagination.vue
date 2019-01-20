<template>

  <div class="pagination">
    <p class="coi_fl">第{{currentPage}}页/共{{totalPage}}页</p>

    <button class="page_btn" :class="{'active': currentPage === 1}" @click="currentPage = 1">1</button>

    <span v-if="pagesReduceState" @click="currentPage = currentPage - 4">...</span>

    <button v-for="item in btnArr" class="page_btn" :class="{'active': item === currentPage}"
            @click="currentPage = item">
      {{item}}
    </button>

    <span v-if="pagesAddState" @click="currentPage = currentPage + 4">...</span>

    <button class="page_btn" @click="currentPage = totalPage"
            :class="{'active': totalPage === currentPage}" v-if="totalPage>1">
      {{totalPage}}
    </button>

    <button class="page_btn" @click="prePage">上一页</button>
    <button class="page_btn" @click="nextPage">下一页</button>
  </div>
</template>
<style scoped lang="scss">
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .page_btn, span {
    margin-left: 10px;
    cursor: pointer;
  }

  .page_btn {
    display: inline-block;
    height: 24px;
    padding: 0 8px;
    border-radius: 0;
    border: 1px solid #4786EF;
    background-color: #fff;
    color: $color;
    &.active {
      background-color: #4786EF;
      color: #fff;
    }
  }


</style>
<script>
  export default {
    props: ['totalPage'],
    data () {
      return {
        currentPage: 1, //当前页数
//        totalPage: 19, //总页数
        btnArr: [], //显示页数按钮
        showBtnNum: 6, //显示页面按钮数量
        pagesAddState: false, //是否显示向下翻页
        pagesReduceState: false //是否显示向上翻页
      }
    },

    methods: {
      //上一页
      prePage(){
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },

      //下一页
      nextPage(){
        if (this.currentPage < this.totalPage) {
          this.currentPage++;
        }
      },

      setBtnArr(){
        let showNumCenter = (this.showBtnNum / 2);
        let btnCenterNum = this.btnArr[this.btnArr.length - 1] - (showNumCenter - 1);

        if (this.currentPage >= btnCenterNum) {
          //如果已经是尾页就return
          if (this.btnArr[this.btnArr.length - 1] === this.totalPage - 1) {
            return
          }

          let end = this.currentPage + this.showBtnNum / 2;
          let start = end - (showNumCenter + 1);

          //防止大于总页数
          if (end >= this.totalPage - 1) {
            start = this.totalPage - this.showBtnNum + 1;
            end = this.totalPage - 1;
            this.pagesAddState = false;
          }

          //重新获取按钮
          this.pagesReduceState = true;
          this.btnArr = [];
          for (let i = start; i <= end; i++) {
            this.btnArr.push(i);
          }
        } else if (this.currentPage <= btnCenterNum - (showNumCenter - 1)) {
          //如果已经是首页就return
          if (btnCenterNum < 5) {
            return
          }

          let end = this.currentPage + 1;
          let start = end - (showNumCenter + 1);
          //防止出现小于1
          if (start <= 2) {
            start = 2;
            end = this.showBtnNum;
            this.pagesReduceState = false;
          }
          this.pagesAddState = true;
          this.btnArr = [];
          for (let i = start; i <= end; i++) {
            this.btnArr.push(i);
          }
        }
      },
    },

    created(){
      //判断显示翻页
      if (this.showBtnNum + 1 < this.totalPage) {
        this.pagesAddState = true;
        for (let i = 2; i <= this.showBtnNum; i++) {
          this.btnArr.push(i);
        }
      } else {
        for (let i = 2; i < this.totalPage; i++) {
          this.btnArr.push(i);
        }
      }
    },

    watch: {
      currentPage: function () {
        this.setBtnArr();
        this.$emit('getPageData', this.currentPage)
      }
    }

  }
</script>
