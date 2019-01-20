<template>

  <div class="assets">
    <p class="title">COI 资产
      <img :src="require('../../assets/images/' + assetsSeeImg[isShowAssets][moveState] + '.png')"
           @mouseenter="moveState = 1" @mouseleave="moveState = 0" @click="isShowAssets = isShowAssets ? 0 : 1">
    </p>

    <div class="asset_count clearfix">
      <div class="coi_fl">
        <img src="../../assets/images/icon_coi.png">
        <p>COI</p>
      </div>

      <div class="coi_fr">
        <div>
          <p>总资产</p>
          <span class="count color">{{isShowAssets ? assetObj.total : hiddenText}}</span>
          <p class="count_cny">≈￥{{isShowAssets ? assetObj.zhrmb : hiddenText}}</p>
        </div>
        <div>
          <p>可用</p>
          <span class="count">{{isShowAssets ? assetObj.ysf.toFixed(4) : hiddenText}}</span>
        </div>
        <div>
          <p>未释放</p>
          <span class="count">{{isShowAssets ? assetObj.wsf.toFixed(4) : hiddenText}}</span>
        </div>

      </div>
    </div>

    <div class="turn_out">
      <p class="title">资产交易-转出 COI</p>
      <user-form :formInfo='formArr' :formRemind="remindInfo" :formType="6"
                 @submitHandle="turnOutSubmit">
        <p class="result_err" slot="result_err">{{resultErr}}</p>
      </user-form>
    </div>

    <div class="turn_in" v-if="false">
      <p class="title">资产交易-转入 COI</p>

      <div class="turn_in_info clearfix">
        <div class="coi_fl">
          <p>这是您的COI 钱包地址，请将您的 COI 转入此地址：</p>
          <p class="remind_text">（该地址仅能用于接收COI，不可接收其他币种的转入）</p>
          <p class="address">{{walletAddress.address}}</p>

          <button class="btn copy_btn" @click="copyAddress">
            复制钱包地址
          </button>
          <input type="text" :value="walletAddress.address" id="copyObj" class="copy_input" readonly>
        </div>

        <div class="coi_fr">
          <img :src="walletAddress.code">
          <p class="address_code">COI 钱包地址</p>
        </div>
      </div>
    </div>
  </div>

</template>
<style scoped lang="scss">
</style>
<script>
  import {getAssets, turnOutCOI, getFormRemind, getWalletAddress} from '../../api/userServer';
  import {mapActions} from 'vuex'

  import UserForm from '../components/user-form.vue'
  import {formMixin} from '../../utils/formMixin'
  import {copy, showRemindAlert} from '../../utils/utils'
  import QRCode from 'qrcode'

  export default {
    mixins: [formMixin],
    data () {
      return {
        assetObj: {},
        assetsSeeImg: [
          ['icon_nosee', 'icon_nosee02'],
          ['icon_see', 'icon_see02'],
        ],
        moveState: 0, //是否移入到资产密文
        isShowAssets: 0, //是否显示资产密文
        hiddenText: '*****', //密文代替字符
        remindInfo: {},
        walletAddress: {
          address: '',
          code: ''
        }
      }
    },

    methods: {
      ...mapActions({getDealConfig: 'DEAL_CONFIG'}),

      //获取资产数据
      setAssetObj(){
        getAssets(data => {
          data.total = (data.wsf + data.ysf).toFixed(4);
          data.zhrmb = data.zhrmb.toFixed(2);
          this.assetObj = data;
        });
      },

      copyAddress(){
        copy()
      },

//      qrCode (codeUrl) {
//        QRCode.toDataURL(codeUrl, (err, url) => {
//          this.walletAddress.code = url;
//        })
//      },

      //转出提交
      turnOutSubmit(){
        if (!this.checkInputValue(this.formArr)) return;
        let params = {
          trunoutnum: this.formArr[0].value,
          walletaddre: this.formArr[1].value,
          tradpassw: this.formArr[3].value,
          code: this.formArr[2].value,
        };

        turnOutCOI(params, (data, err) => {
          if (err) {
            showRemindAlert('warning', err);
            return
          }
          showRemindAlert('success', '提交成功');
          this.clearFormValue();
        })
      }
    },

    mounted(){

      this.setAssetObj();
      this.formArr = [
        {title: '转出数量', name: 'turnNum', type: 'number', placeholder: '请输入转出数量', value: '', class: ''},
        {title: '钱包地址', name: 'walletAddress', type: 'text', placeholder: '请输入接收的钱包地址', value: '', class: ''},
        {title: '验证码', name: 'code', type: 'text', placeholder: '请输入手机验证码', value: '', class: 'user_code_input'},
        {title: '交易密码', name: 'tradePassword', type: 'password', placeholder: '请输入交易密码', value: '', class: ''}
      ];

      this.getDealConfig(data => {
        this.remindInfo = getFormRemind(4, data);
      });

//      getWalletAddress(data => {
//        this.walletAddress.address = data.item;
//        this.qrCode(data.item);
//      })
    },
    components: {
      UserForm
    }
  }
</script>



