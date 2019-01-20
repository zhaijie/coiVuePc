<template>
  <user-form :formInfo='formArr' :formRemind="formRemind" :formType="formType" @submitHandle="submit"
             v-if="renderState">
    <p class="result_err" slot="result_err">{{resultErr}}</p>
  </user-form>
</template>
<style scoped lang="scss">
</style>
<script>

  import {mapMutations} from 'vuex'

  import UserForm from '../components/user-form.vue'

  import * as userServer from '../../api/userServer'
  import {getUserInfo, setUserInfo, removeUserInfo, showRemindAlert} from '../../utils/utils'
  import {formMixin} from '../../utils/formMixin'

  export default {
    mixins: [formMixin],
    data () {
      return {
        formRemind: {},
        renderState: true,
        recordOldPhone: ''
      }
    },

    methods: {
      ...mapMutations({
        loginState: 'SET_LOGIN_STATE'
      }),

      //获取表单信息
      getFormArr(type){
        //判断是否已经设置交易密码
        if (type === '1') {
          let isPwd = getUserInfo().ispwd;
          if (isPwd === '1') {
            this.formType = '6'
          }
        }

        this.formArr = userServer.getUserForm(this.formType);
        //重新刷新组件
        this.renderState = false;
        this.$nextTick(() => {
          this.renderState = true
        })
      },

      //修改登录密码
      changePassword(){
        let passWord = this.checkSamePassword(this.formArr[1].value, this.formArr[2].value);
        if (!passWord) return;
        if (!passWord) return;

        let params = {
          oldPassword: this.formArr[0].value,
          newPassword: passWord
        };

        userServer.updatePwd(params, (data, err) => {
          this.clearFormValue();
          //修改成功返回登录
          if (data) {
            window.localStorage.clear();
            this.$router.push('/form/0');
            this.loginState(false);
            showRemindAlert('success', '修改成功，请重新登录');
            return
          }
          //显示返回错误的信息
          this.resultErr = err;
        })
      },

      //设置交易密码
      setTradePassword(){
        let passWord = this.checkSamePassword(this.formArr[0].value, this.formArr[1].value);
        if (!passWord) return;

        //更新用户信息存储
        userServer.setTradePwd({password: passWord}, (data, err) => {
          if (err) {
            this.resultErr = err;
            return
          }

          //更新用户信息存储
          let userInfo = getUserInfo();
          userInfo.ispwd = '2';
          setUserInfo(userInfo);

          //重新获取表单信息
          this.formType = '1';
          this.getFormArr(this.formType);
          this.resultErr = '';
          showRemindAlert('success', '交易密码设置成功')
        })
      },

      //修改交易密码
      changeTradePassword(){
        let passWord = this.checkSamePassword(this.formArr[1].value, this.formArr[2].value);
        if (!passWord) return;

        let params = {
          oldPassword: this.formArr[0].value,
          newPassword: passWord
        };
        userServer.updateTradePwd(params, err => {
          this.clearFormValue();
          if (err) {
            this.resultErr = err;
            return
          }
          showRemindAlert('success', '交易密码修改成功')
        })
      },

      //忘记交易密码
      forgetTradePwd(){
        let passWord = this.checkSamePassword(this.formArr[1].value, this.formArr[2].value);
        if (!passWord) return;

        let params = {passWord: passWord, phone: this.formArr[0].value};
        userServer.forgetTradePwd(params, err => {
          this.clearFormValue();
          if (err) {
            this.resultErr = err;
            return
          }
          showRemindAlert('success', '交易密码修改成功')
        })
      },

      //修改电话号码--旧手机验证
      checkChangePhone(){
        let params = {
          phone: this.formArr[0].value,
          type: 4,
          code: this.formArr[1].value
        };
        userServer.checkCode(params, err => {
          this.recordOldPhone = params.phone;
          this.clearFormValue();
          if (err) {
            this.resultErr = err;
            return
          }
          this.$router.push('/user/userSafe/5');
        });
      },

      //修改电话号码--新手机验证
      changePhone(){
        let params = {
          oldPhone: this.recordOldPhone,
          newPhone: this.formArr[0].value,
          code: this.formArr[1].value
        };
        userServer.changePhone(params, err => {
          this.clearFormValue();
          if (err) {
            this.resultErr = err;
            return
          }
          removeUserInfo();
          this.$router.push('/form/0');
          this.loginState(false);
          showRemindAlert('success', '修改成功，请重新登录');
        });
      },

      //修改停机电话号码
      updatePhone(){
        let params = {
          userName: this.formArr[0].value,
          idCard: this.formArr[1].value,
          newPhone: this.formArr[2].value,
        };

        userServer.updatePhone(params, err => {
          this.clearFormValue();
          if (err) {
            this.resultErr = err;
            return
          }
          removeUserInfo();
          this.$router.push('/form/0');
          showRemindAlert('success', '更换手机成功,请重新登录');
        })
      },

      submit(){
        //检测是否填入请求所需参数
        if (!this.checkInputValue(this.formArr)) return;
        switch (this.formType) {
          case '0': //修改登录密码
            this.changePassword();
            break;
          case '1': //修改交易密码
            this.changeTradePassword();
            break;
          case '2': //修改手机--旧手机
            this.checkChangePhone();
            break;
          case '3': //忘记交易密码
            this.forgetTradePwd();
            break;
          case '4': //修改手机--停机手机
            this.updatePhone();
            break;
          case '5': //修改手机--新手机
            this.changePhone();
            break;
          case '6': //设置交易密码
            this.setTradePassword();
            break;
        }
      },

      //页面数据初始化
      init(type){
        this.formType = type;
        this.formRemind = userServer.getFormRemind(this.formType);
        this.getFormArr(this.formType);
        if (this.formType === '5' && this.recordOldPhone === '') {
          this.$router.push('/user/userSafe/2')
        }
      },
    },
    created(){
      this.init(this.$route.params.type);
    },
    watch: {
      '$route' (to, from) {
        if (to.name === 'userSafe' && from.name !== null) {
          this.init(to.params.type);
        }
      }
    },
    components: {
      UserForm
    }
  }
</script>



