<template>
  <div class="user_form clearfix">
    <div class="coi_fl form_box">
      <slot name="result_err"></slot>
      <slot name="real_select"></slot>
      <div class="input_item clearfix" v-for="(item, i) in formInfo">
        <span class="coi_fl">{{item.title}}</span>
        <m-input class="coi_fl" :inputInfo="item" :class="{'password': item.type === 'password'}">
          <button slot="get_code" v-if="item.name === 'code'" class="btn code_btn" @click="getCode">
            {{codeText}}
          </button>

          <img slot="imgCode" v-if="item.name === 'imgCode'" class="img_code"
               :src="imgCodeSrc" @click="imgCodeSrc = imgCodeSrc+'?time=' + new Date().getTime()">
        </m-input>

        <p class="forget_password" v-if="formType === '0' && i === 0" @click="$router.push('/form/2')">忘记密码</p>
        <p class="forget_password" v-if="formType === '1' && i === 0" @click="$router.push('/user/userSafe/3')">
          忘记交易密码
        </p>
      </div>
      <button class="btn submit_btn" @click="clickHandle">
        {{formType === '2' ? '下一步' : '确定'}}
      </button>

      <p class="change_phone" v-if="formType === '2'">若更换手机号码已停用，
        <span class="color" @click="$router.push('/user/userSafe/4')">请点击这里更换</span>
      </p>
    </div>

    <div class="coi_fl remind_box" :style="{height:formType ==='3' || formType ==='4'?'348px':''}">
      <p v-if="formRemind.remindText">温馨提示</p>
      <p class="remind_info" v-html="formRemind.remindText"></p>
      <img :src=formRemind.remindImg class="remind_img">
    </div>
  </div>
</template>

<style lang="scss" src="../../assets/css/public/user-form.scss">

</style>
<script>
  import MInput from '../components/m-input.vue'
  import {getCodeMixin} from '../../utils/getCodeMixin'

  export default {
    mixins: [getCodeMixin],
    props: ['formInfo', 'formType', 'formRemind'],
    data () {
      return {
        codeText: '获取验证码',
        getCodeState: false,
        codeTimer: ''
      }
    },
    methods: {

      //点击提交事件广播
      clickHandle(){
        if (this.formType === '2') {
          clearInterval(this.codeTimer);
          this.codeTimer = null;
        }
        this.$emit('submitHandle');
      },

      //获取验证码参数
      codeType(){
        let type = this.formType;
        //旧手机短信type
        if (this.formType === '2') {
          type = '4'
        }
        //新手机短信type
        if (this.formType === '4') {
          type = '5'
        }
        return type;
      },
    },

    components: {
      MInput
    }
  }
</script>
