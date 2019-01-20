<template>

  <div class="my_select" @click.stop :style="{width:width+'px',height: height+'px',lineHeight: height+'px'}">
    <span class="select_value" @click="showSelect()">
      {{selectValue}}
    </span>
    <img src="../../assets/images/icon_select.png" class="select_icon" @click="showSelect()">
    <ul v-if="selectListState">

      <li class="select_classify">
        <span v-for="item in selectClassify" :class="{'active':currentClassify === item.id}"
              @click="classifyClick(item)" v-if="selectClassify">
          {{item.title}}
        </span>
      </li>

      <li v-for="item in selectList.data" @click="selectItem(item)">
        {{item.value}}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .my_select {
    border: $border;
    cursor: pointer;
    z-index: 99;
    position: relative;

    .select_value {
      display: inline-block;
      width: 95%;
      padding-left: 10px;
    }

    .select_icon {
      right: 20px;
      position: absolute;
      top: 36%;
    }

    .select_classify {
      display: table;
      width: calc(100% + 10px);
      margin-left: -10px;
      &:hover {
        color: $fontColor;
      }
      span {
        display: table-cell;
        text-align: center;
        border-bottom: $border;
        background-color: $bodyBgColor;
        font-size: 12px;
        color: #999;
        &.active {
          font-size: 14px;
          background-color: #fff;
          color: $fontColor;
          border-bottom: none;
        }
      }

      span + span {
        border-left: $border;
      }
    }

    ul {
      padding-left: 10px;
      background-color: #fff;
      border: $border;
      height: 200px;
      overflow: auto;
      li:hover {
        color: $color;
      }
    }
  }
</style>

<script type="text/ecmascript-6">
  export default {
    props: ['selectList', 'height', 'width', 'selectClassify', 'defaultValue'],
    data(){
      return {
        selectListState: false,
        selectValue: '',
        currentClassify: '',
        currentClassifyIndex: 0,
      }
    },
    methods: {
      //显示下拉框
      showSelect(){
        this.selectListState = !this.selectListState;
        if (this.selectClassify) {
          this.currentClassifyIndex = 0;
          this.currentClassify = this.selectClassify[this.currentClassifyIndex].id;
          this.selectList.handle('', this.currentClassifyIndex)
        }
      },

      //点击选项
      selectItem(item){

        //是否是多选
        if (this.selectClassify) {

          if (this.selectList.handle) {
            this.selectList.handle(item, this.currentClassifyIndex)
          }

          if (this.currentClassifyIndex === 0) {
            this.selectValue = '';
          }
          this.currentClassifyIndex++;
          this.selectValue = this.selectValue + item.value;

          //最后一个选择类型是关闭选择框
          if (this.currentClassifyIndex >= this.selectClassify.length) {
            this.selectListState = false;
            this.currentClassifyIndex = 0;
            return
          }

          this.currentClassify = this.selectClassify[this.currentClassifyIndex].id;
          return
        }

        //单选
        this.selectListState = false;
        this.selectValue = item.value;
        if (this.selectList.handle) {
          this.selectList.handle(item)
        }
      },

      //选择类型
//      classifyClick(item){
//        this.currentClassify = item.id
//      }
    },
    mounted(){
      if (this.selectClassify) {
        this.currentClassify = this.selectClassify[this.currentClassifyIndex].id;
      }
      this.selectValue = this.defaultValue ? this.defaultValue : this.selectList.data[0].value;
    },

    created(){
      let self = this;
      this.$vue.$on('hideSelectList', () => {
        if (self.selectListState) {
          self.selectListState = false
        }
      })
    },
  }
</script>


