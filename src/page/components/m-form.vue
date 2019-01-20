<template>
  <div>
    <m-input class="input_item" v-for="item in formInfo" :inputInfo="item" :key="item.name">
      <button slot="get_code" v-if="item.name === 'code'" class="btn code_btn" @click="getCode">
        {{codeText}}
      </button>

      <img slot="imgCode" v-if="item.name === 'imgCode'" class="img_code"
           :src="imgCodeSrc" @click="imgCodeSrc = imgCodeSrc+'?time=' + new Date().getTime()">

    </m-input>

    <slot name="protocol"></slot>
    <button class="btn submit_btn" @click="clickHandle">
      {{formType === '0' ? '登录' : formType === '1' ? '注册' : '重置登录密码'}}
    </button>
    <slot name="login_slot"></slot>
    <slot name="has_user"></slot>
  </div>
</template>

<style scoped lang="scss" src="../../assets/css/form.scss">
</style>
<script>

  import MInput from '../components/m-input.vue'
  import {getCodeMixin} from '../../utils/getCodeMixin'
  export default {
    mixins: [getCodeMixin],
    props: ['formInfo', 'formType'],
    data () {
      return {
        codeText: '获取验证码',
        getCodeState: false,
        codeTimer: ''
      }
    },

    methods: {
      clickHandle(){
        this.$emit('submitHandle')
      },
      codeType(){
        return this.formType
      }
    },
    components: {
      MInput
    }
  }
</script>
