<template>

  <div>
    <input :type="inputInfo.type" :placeholder="inputInfo.placeholder" :value="inputInfo.value"
           :class="inputInfo.class" @input="$set(inputInfo, 'value', $event.target.value)"
           :style="{width:width + 'px'}"/>

    <slot name="get_code"></slot>

    <slot name="imgCode"></slot>
    <div class="check_tip" v-if="inputInfo.check">{{inputInfo.check}}</div>
  </div>
</template>

<style scoped lang="scss">
  input {
    width: 360px;
    padding: 0 20px;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    border-radius: 2px;
  }

  .code_btn {
    width: 120px;
  }

  .img_code {
    width: 120px;
    float: right;
    cursor: pointer;
  }

  .search_input {
    width: 374px;
    height: 34px;
    line-height: 34px;
    padding: 0 8px;
  }

  .product_search {
    width: 270px;
  }

  .address_input {
    width: 332px;
    padding: 0 10px;
    height: 36px;
  }

</style>
<script>

  import {api} from '../../api/api';
  export default {
    props: ['inputInfo', 'width'],
    data () {
      return {}
    },

    methods: {
      inputChange(e){
        this.$set(this.inputInfo, 'value', e.target.value)
      },
    },

    mounted(){
    }
  }
</script>
