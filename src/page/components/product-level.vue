<template>
  <div class="home_classify">
    <ul class="clearfix" @mouseleave="hideClass">
      <li v-for="(item, i) in firstLevel" class="type_item" @click="goProductList(item.id, i)"
          @mouseenter="firstIn(i,$event.target,item)">
        <span
          :class="{'active':$route.params.categoryId == item.id || ($route.params.categoryId == undefined && i === 0)}">
          {{item.zwm}}
        </span>
      </li>
    </ul>

    <div class="class_level clearfix" ref="classLevel" @mouseenter="clearTimer"
         @mouseleave="showClassState = false" v-if="showClassState">
      <div class="class_list" v-for="item1 in classList">
        <p class="title" @click="$router.push('/productList/'+currentCategoryId+'/0')">
          {{item1.dName}}</p>
        <ul class="class_item" v-for="item2 in item1.levelThree">
          <li v-for="item3 in item2"
              @click="$router.push('/productList/'+currentCategoryId+'/'+item3.xId);showClassState = false">
            {{item3.xName}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  $level_shadow: 0px 3px 10px 0px rgba(59, 146, 252, 0.2);

  .home_classify {
    margin-top: 35px;
    position: relative;
    width: max-content;
    .type_item {
      float: left;
      cursor: pointer;
      span {
        display: inline-block;
        padding: 0 24px;
        &.active {
          color: $color;
        }
      }

      &:hover span {
        color: $color;
      }
    }

    .type_item + .type_item {
      padding-bottom: 35px;
      span {
        border-left: 1px solid #eee;
      }
    }
  }

  .class_level {
    position: absolute;
    background-color: #fff;
    text-align: center;
    font-size: 14px;
    border-radius: 3px;
    padding: 5px 24px 47px;
    box-shadow: $level_shadow;
    -o-box-shadow: $level_shadow;
    -moz-box-shadow: $level_shadow;
    -webkit-border-shadow: $level_shadow;
    z-index: 9;
    top: 65px;
    display: flex;
    &:before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border: 10px solid;
      border-bottom-color: #fff;
      color: transparent;
      top: -20px;
      left: calc(50% - 5px);
    }

    .class_list {
      display: flex;
      text-align: left;
      min-width: 126px;
      .title {
        position: absolute;
        width: 102px;
        border-bottom: 1px solid #ccc;
        font-weight: bold;
        line-height: 36px;
        height: 36px;
        cursor: pointer;
      }
      .class_item {
        line-height: 22px;
        float: left;
        width: 126px;
        margin-top: 60px;
        li:hover {
          color: $color;
          cursor: pointer;
        }
      }
    }

    .class_list + .class_list {
      padding-left: 20px;
    }
  }

</style>
<script>

  import {listClassification} from '../../api/productServer'

  export default {
    props: ['firstLevel'],
    data () {
      return {
        showClassState: false,
        hideClassTimer: null,
        allClassList: {}, //记录请求过的分类
        classList: [],
        currentCategoryId: ''
      }
    },

    methods: {
      //一级菜单点击事件
      goProductList(id, i){
        if (i) {
          this.$router.push('/productList/' + id + '/0')
        } else {
          this.$router.push('/home')
        }
      },

      //一级菜单移入事件
      firstIn(index, target, item){
        this.currentCategoryId = item.id;
        if (index) {
          //判断是否请求过
          if (this.allClassList[item.id]) {
            this.classList = this.allClassList[item.id];
            if (this.classList.length) {
              this.showClass(target);
            } else {
              this.showClassState = false
            }
            return
          }

          //发送请求
          listClassification({categoryId: item.id}, data => {
            this.classList = data;
            this.allClassList[item.id] = data;
            if (this.classList.length) {
              this.showClass(target);
            } else {
              this.showClassState = false
            }
          });
        } else {
          this.showClassState = false
        }
      },

      //隐藏二级菜单
      hideClass(){
        this.hideClassTimer = setTimeout(() => {
          this.showClassState = false
        }, 200)
      },

      //显示二级菜单
      showClass(e){
        this.showClassState = true;
        setTimeout(() => {
          this.$refs.classLevel.style.left = -(this.$refs.classLevel.offsetWidth / 2 - e.offsetLeft - (e.offsetWidth / 2)) + 'px'
        });
      },

      //清除timer
      clearTimer(){
        clearTimeout(this.hideClassTimer);
        this.hideClassTimer = null;
      },
    }
  }
</script>
