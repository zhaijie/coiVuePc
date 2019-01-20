/**
 * Created by Administrator on 2018/11/15 0015.
 */

import {checkCode, showCheckTip, checkPhone, checkLengthNull} from './utils'

export const formMixin = {
  data () {
    return {
      formArr: [],
      formType: '',
      resultErr: '',
    }
  },
  methods: {
    //检测输入框
    checkInputValue(formArr){
      let checkState = false;
      for (let i = 0, len = formArr.length; i < len; i++) {
        switch (formArr[i].name) {
          case 'username':
            checkState = checkLengthNull(formArr[i].value, formArr[i].title);
            showCheckTip.call(this, formArr[i], checkState);
            break;
          case 'userId':
            checkState = checkLengthNull(formArr[i].value, formArr[i].title);
            showCheckTip.call(this, formArr[i], checkState);
            break;
          case 'phone':
            checkState = checkPhone(formArr[i].value);
            showCheckTip.call(this, formArr[i], checkState);
            break;
          case 'password':
            checkState = this.checkPassword(formArr[i].value);
            showCheckTip.call(this, this.formArr[i], checkState);
            break;
          case 'repeatPassword':
            checkState = this.checkPassword(formArr[i].value);
            showCheckTip.call(this, formArr[i], checkState);
            break;
          case 'tradePassword':
            checkState = this.checkTradePassword(formArr[i].value);
            showCheckTip.call(this, formArr[i], checkState);
            break;
          case 'imgCode':
            checkState = checkCode(formArr[i].value);
            showCheckTip.call(this, formArr[i], checkState);
            break;
          case 'code':
            checkState = checkCode(formArr[i].value);
            showCheckTip.call(this, formArr[i], checkState);
            break;
          case 'turnNum':
            checkState = this.checkTurnNum(formArr[i].value);
            showCheckTip.call(this, formArr[i], checkState);
            break;
          case 'walletAddress':
            checkState = checkLengthNull(formArr[i].value, formArr[i].title);
            showCheckTip.call(this, formArr[i], checkState);
            break;
        }
        if (checkState) return false;
      }
      return true;
    },

    //检测密码
    checkPassword(password) {
      if (password.length === 0) {
        return '密码不能为空';
      }

      if (password.length < 6 || password.length > 16) {
        return '密码长度不正确';
      }
      return false;
    },

    //检测密码是否一致
    checkSamePassword(password1, password2){
      if (password1 !== password2) {
        this.resultErr = '两次密码不一致';
        return false;
      }

      this.resultErr = '';
      return password1
    },

    //检测交易密码
    checkTradePassword(password) {
      if (!password) {
        return '密码不能为空';
      }

      if (password.length !== 6) {
        return '交易密码长度不正确';
      }
      return false;
    },

    //检测验证码长度
    checkCode(code){
      if (code.length === 0) {
        return '请输入验证码';
      }
      return false;
    },

    checkTurnNum(num){
      if (num.length === 0) {
        return '请输入转出数量';
      }

      if (num < parseInt(this.$store.state.dealConfig.coiMinFunds)) {
        return '转出数量大于或等于' + this.$store.state.dealConfig.coiMinFunds;
      }
      return false;
    },

    //清空输入框
    clearFormValue(){
      this.formArr.forEach(function (item) {
        item.value = ''
      });
    },
  }
};
