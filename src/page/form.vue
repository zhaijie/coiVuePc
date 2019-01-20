<template>
  <div class="form">
    <div class="form_content">
      <p class="result_err">{{resultErr}}</p>
      <m-form :formInfo="formArr" :formType="formType" @submitHandle="submit" v-if="!registerState">

        <!--注册slot-->
        <p slot="protocol" class="protocol" v-if="formType === '1'">
          注册即视为同意 <span>《用户注册协议》</span>
        </p>

        <p slot="has_user" class="has_user text-center" v-if="formType === '1'">
          已有账号，
          <router-link to="/form/0">立即登录</router-link>
        </p>

        <!--登录slot-->
        <div slot="login_slot" class="login_remind" v-if="formType === '0'">
          <div class="coi_fl" @click="isRemindName = !isRemindName">
          <span class="remind_icon">
            <img src="../assets/images/hook.png" v-if="isRemindName">
          </span>
            记住用户名
          </div>

          <div class="coi_fr">
            <router-link to="/form/2">忘记密码</router-link>
            |
            <router-link to="/form/1">注册</router-link>
          </div>
        </div>
      </m-form>

      <div class="text-center register_success" v-if="registerState">
        <img src="../assets/images/success.png">
        <p>恭喜您注册成功</p>
        <button class="btn" @click="$router.push('/user/asset');">查看我的个人中心</button>
      </div>

    </div>
  </div>
</template>
<style lang="scss" src="../assets/css/form.scss">

</style>
<script>

  import {mapMutations} from 'vuex'
  import {formMixin} from '../utils/formMixin'
  import {cartCountMixin} from '../utils/cartCountMixin'
  import {removeUserInfo, showRemindAlert} from '../utils/utils'
  import * as formServer from '../api/formServer'

  import MForm from './components/m-form.vue'
  import {getFormInput} from '../api/formServer'

  export default {
    mixins: [formMixin, cartCountMixin],
    data () {
      return {
        isRemindName: false,
        registerState: false
      }
    },

    methods: {
      ...mapMutations({
        footerShow: 'SET_FOOTER_SHOW', //vuex将`this.footerShow()`映射为`this.$store.commit('SET_FOOTER_SHOW')`
        loginState: 'SET_LOGIN_STATE'
      }),

      //登录提交
      loginSubmit(){
        //请求参数
        let params = {
          username: this.formArr[0].value,
          password: this.formArr[1].value,
          imageCode: this.formArr[2].value,
        };

        //登录请求
        formServer.login(params, this.isRemindName, (data, err) => {
          if (err) {
            this.resultErr = err;
            return
          }
          this.loginState(true);
          this.getShoppingCount();
          this.$router.push('/user/asset');
        });
      },

      //注册提交
      registerSubmit(){
        let params = {
          phone: this.formArr[0].value,
          passWord: this.formArr[2].value,
          userCode: this.formArr[3].value || '',
          code: this.formArr[5].value
        };

        formServer.register(params, (data, err) => {
          if (data) {
            let loginParams = {
              username: params.phone,
              password: params.passWord,
            };
            //自动登录
            formServer.login(loginParams, this.isRemindName, (data, err) => {
              if (err) {
                this.resultErr = err;
                return
              }
              this.loginState(true);
              this.getShoppingCount();
              this.registerState = true;
            });
            return
          }
          this.resultErr = err;
        });
      },

      //忘记密码提交
      forgetSubmit(){
        let passWord = this.checkSamePassword(this.formArr[1].value, this.formArr[2].value);
        if (!passWord) return;
        let params = {
          phone: this.formArr[0].value,
          passWord: passWord
        };
        formServer.forgetPwd(params, (err) => {
          if (err) {
            this.resultErr = err;
            return
          }
          showRemindAlert('success', '修改成功,请重新登录');
          this.loginState(false);
          removeUserInfo();
          this.$router.push('/form/0');
        });
      },

      submit(){
        //检测是否填入请求所需参数
        if (!this.checkInputValue(this.formArr)) return;
        switch (this.formType) {
          case '0':
            this.loginSubmit();
            break;
          case '1':
            this.registerSubmit();
            break;
          case '2':
            this.forgetSubmit();
            break;
        }
      }
      ,
    },

    created(){
      this.footerShow(false);
      this.formType = this.$route.params.type;
      this.formArr = getFormInput(this.formType);

      //判断注册是否存在邀请码
      if (this.formType === '1' && this.$route.params.invite) {
        for (let i = 0, len = this.formArr.length; i < len; i++) {
          if (this.formArr[i].name === 'invite') {
            this.formArr[i].value = this.$route.params.invite;
          }
        }
      }
    },

    destroyed(){
      this.footerShow(true);
    },

    watch: {
      $route(to){
        this.formType = to.params.type;
        this.formArr = getFormInput(this.formType);
        this.resultErr = '';
      }
    },

    components: {
      MForm
    }
  }
</script>



