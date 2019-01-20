/**
 * Created by Administrator on 2018/11/15 0015.
 */

import {getCode} from '../api/formServer';
import {api} from '../api/api';
import {checkCode, showCheckTip, checkPhone, getUserInfo} from './utils'
const timerSecond = 60;

export const getCodeMixin = {
  data () {
    return {
      codeText: '获取验证码',
      getCodeState: false,
      codeTimer: '',
      imgCodeSrc: api + '/app/user/imageCode',
    }
  },
  methods: {

    //获取验证码参数
    getCodeParams(){
      let checkState = false;
      let params = {
        phone: '',
        type: this.codeType(),
        imageCode: '',
      };

      if (this.codeType() + '' === '6') {
        params.phone = getUserInfo().account;
        return params;
      }

      for (let i = 0; i < this.formInfo.length; i++) {
        switch (this.formInfo[i].name) {
          case 'phone':
            params.phone = this.formInfo[i].value;
            checkState = checkPhone(params.phone);
            showCheckTip.call(this, this.formInfo[i], checkState);
            break;
          case 'imgCode':
            params.imageCode = this.formInfo[i].value;
            checkState = checkCode(params.imageCode);
            showCheckTip.call(this, this.formInfo[i], checkState);
            break;
        }
        if (checkState) return false;
      }

      return params;
    },

    //获取验证码
    getCode(){
      let params = this.getCodeParams();
      if (!params) return;

      if (this.getCodeState) return;

      //获取短信验证码请求
      let timer = timerSecond;
      this.getCodeState = true;
      getCode(params, (data, err) => {
        if (!data) {
          this.$parent.resultErr = err;
          if (this.imgCodeSrc) {
            this.imgCodeSrc = api + '/app/user/imageCode?time=' + new Date().getTime();
          }
          return
        }

        this.codeText = timer + 's';
        this.codeTimer = setInterval(() => {
          timer--;
          this.codeText = timer + 's';
          if (timer < 0) {
            timer = timerSecond;
            this.codeText = '重新获取';
            this.getCodeState = false;
            clearInterval(this.codeTimer);
            this.codeTimer = null;
          }
        }, 1000);
      });
    },
  },
};
