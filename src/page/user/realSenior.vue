<template>

  <div>
    <div class="primary_real">
      <p class="title">
        <img
          :src="primaryRealState?require('../../assets/images/icon_realOk.png'):require('../../assets/images/icon_notice.png')">
        【初级实名认证】
      </p>
      <user-form :formInfo='formArr' :formRemind="formRemind" @submitHandle="primaryRealSubmit"
                 v-if="!primaryRealState">
        <div class="input_item clearfix" slot="real_select">
          <span class="coi_fl">认证方式</span>
          <div class="real_mode">
            <div class="user_ID" @click="primaryRealType='SFZ'">
              <i :class="{'active':primaryRealType==='SFZ'}"><span v-if="primaryRealType === 'SFZ'"></span></i>
              身份证
            </div>
            <div class="user_passport" @click="primaryRealType='HZ'">
              <i :class="{'active':primaryRealType==='HZ'}"><span v-if="primaryRealType === 'HZ'"></span></i>
              护照
            </div>
          </div>
        </div>
        <p class="result_err" slot="result_err">{{resultErr}}</p>
      </user-form>

      <div class="user_form clearfix" v-if="primaryRealState">
        <div class="coi_fl form_box primary_real_info">
          <p class="result_err"></p>
          <div class="input_item clearfix">
            <span class="coi_fl">认证方式</span>
            <div class="real_mode">{{realInfo.type === 'SFZ' ? '身份证' : '护照'}}</div>
          </div>
          <div class="input_item clearfix">
            <span class="coi_fl">真实姓名</span>
            <div class="real_mode">{{realInfo.name}}</div>
          </div>
          <div class="input_item clearfix">
            <span class="coi_fl">身份号码</span>
            <div class="real_mode">{{realInfo.idCard}}</div>
          </div>
          <div class="input_item clearfix">
            <span class="coi_fl">认证时间</span>
            <div class="real_mode">{{realInfo.date}}</div>
          </div>
        </div>
        <div class="coi_fl remind_box">
          <p v-if="formRemind.remindText">温馨提示</p>
          <p class="remind_info">{{formRemind.remindText}}</p>
          <img :src=formRemind.remindImg class="remind_img">
        </div>
      </div>
    </div>

    <div class="real_senior">
      <p class="title">
        <img
          :src="seniorRealState === '1'?require('../../assets/images/icon_realOk.png'):require('../../assets/images/icon_notice.png')">
        <span v-if="seniorRealState === '1'">已通过</span>
        <span v-if="seniorRealState === '2'">审核中</span>
        【高级实名认证】
      </p>

      <!--seniorRealState !=='2'&& seniorRealState !=='1' && primaryRealState-->
      <div class="senior_form" v-if="true">
        <div class="senior_img clearfix">
          <div class="img_item">
            <div v-if="!seniorImg[0].file64">
              <img src="../../assets/images/icon_add.png" class="add_img">
              <p>点击添加证件正面照</p>
              <p>（图片不大于1M）</p>
            </div>

            <img :src="seniorImg[0].file64" width="240" height="135" v-if="seniorImg[0].file64">
            <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" @change="changeImage($event,0)">
          </div>
          <div class="img_item">
            <div v-if="!seniorImg[1].file64">
              <img src="../../assets/images/icon_add.png" class="add_img">
              <p>点击添加证件背面照</p>
              <p>（图片不大于1M）</p>
            </div>

            <img :src="seniorImg[1].file64" width="240" height="135" v-if="seniorImg[1].file64">
            <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" @change="changeImage($event,1)">
          </div>

          <div class="img_item">
            <div v-if="!seniorImg[2].file64">
              <img src="../../assets/images/icon_add.png" class="add_img">
              <p>点击添加手持证件正面照</p>
              <p>（图片不大于1M）</p>
            </div>

            <img :src="seniorImg[2].file64" width="240" height="135" v-if="seniorImg[2].file64">
            <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" @change="changeImage($event,2)">
          </div>
        </div>

        <button class="btn upload_btn" @click="seniorRealSubmit">确定上传</button>

        <div class="senior_remind">
          <p class="">温馨提示</p>
          <ol>
            <li>
              请上传您本人证件正反面及手持身份证的照片，务必与上方认证信息一致，务必保证身份证上的文字信息无遮挡且清晰可读，否则影响您的身份认证。
            </li>
            <li>证件照确认上传后，客服会进行审核，审核时间为1-3个工作日；</li>
            <li>审核不通过时，请您根据提示信息重新提交申请。</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  $realModeW: 340px;
  .primary_real {
    margin-bottom: 50px;
    .title {
      margin-bottom: 12px;
    }
    .real_mode {
      width: $realModeW;
      float: left;
      height: 38px;
      line-height: 38px;
      .user_ID, .user_passport {
        cursor: pointer;
        width: $realModeW/2;
        float: left;
        i {
          position: relative;
          top: 3px;
          margin-right: 5px;
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid #999;
          &.active {
            border-color: $color;
            span {
              position: absolute;
              top: 3px;
              left: 3px;
              display: inline-block;
              width: 6px;
              height: 6px;
              background-color: $color;
              border-radius: 50%;
            }
          }
        }
      }
    }

    .primary_real_info {
      .input_item {
        margin-bottom: 0;
      }
    }
  }

  .senior_form {
    width: 900px;
    height: 360px;
    padding: 24px;
    background-color: $bodyBgColor;
    margin-top: 16px;
    .senior_img {
      text-align: center;
      .img_item {
        position: relative;
        border: 1px dashed #eee;
        float: left;
        width: 240px;
        height: 135px;
        background-color: #fff;
        border-radius: $borderRadius;
        color: #999;
        .add_img {
          margin-top: 27px;
          margin-bottom: 10px;
        }
        input {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          opacity: 0;
          cursor: pointer;
        }
      }
      .img_item + .img_item {
        margin-left: 24px;
      }
    }
    .upload_btn {
      margin-top: 24px;
      width: 120px;
      height: 36px;
      line-height: 36px;
    }

    .senior_remind {
      margin-top: 24px;
      ol {
        margin-left: 14px;
      }
      li {
        list-style: decimal;
        line-height: 22px;
      }
    }
  }

</style>
<script>

  import UserForm from '../components/user-form.vue'
  import {getFormRemind, getUserForm, authentication, isRealAuth, authDetail, seniorReal} from '../../api/userServer'
  import {formMixin} from '../../utils/formMixin'
  import {getUserInfo, setUserInfo} from '../../utils/utils'
  export default {
    mixins: [formMixin],
    data () {
      return {
        formRemind: {},
        primaryRealState: false,
        seniorRealState: true,
        primaryRealType: 'SFZ',
        seniorImg: [{}, {}, {}],
        realInfo: {}
      }
    },

    methods: {

      //上传图片文件
      changeImage(e, index){
        let file = e.target.files[0];
        console.log(file);
        this.seniorImg[index].file = file;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        let _this = this;
        reader.onload = function (e) {
          _this.$set(_this.seniorImg[index], 'file64', this.result);
        }
      },

      //初级实名认证
      primaryRealSubmit(){
        if (!this.checkInputValue(this.formArr)) return;
        let params = {
          type: this.primaryRealType,
          name: this.formArr[0].value,
          idCard: this.formArr[1].value
        };

        //提交初级实名
        authentication(params, err => {
          if (!err) {
            authDetail((data) => {
              this.primaryRealState = true;
              this.realInfo = data.item;
              let userInfo = getUserInfo();
              userInfo.isAuthority = '2';
              setUserInfo(userInfo)
            });
            return;
          }
          this.resultErr = err;
        })
      },

      //高级实名认证
      seniorRealSubmit(){
        let formData = new FormData();
        formData.append('oneAddress', this.seniorImg[0].file, this.seniorImg[0].file.name);
        formData.append('twoAddress', this.seniorImg[1].file, this.seniorImg[0].file.name);
        formData.append('threeAddress', this.seniorImg[2].file, this.seniorImg[0].file.name);
        seniorReal(formData, err => {
          if (!err) {
            this.seniorRealState = '2';
            return
          }
          alert(err)
        })
      },
    },

    mounted(){
      this.primaryRealState = (getUserInfo().isAuthority + '' === '2');

      //已经初级实名再获取是否高级实名认证
      if (this.primaryRealState) {
        authDetail((data) => {
          this.realInfo = data.item;
        });
        isRealAuth(data => {
          if (data.item.twoAuth) {
            this.seniorRealState = data.item.twoAuth;
          } else {
            this.seniorRealState = false;
          }
        });
      }
      this.formRemind = getFormRemind(3);
      this.formArr = getUserForm(7);
    },
    components: {
      UserForm
    },
  }
</script>



