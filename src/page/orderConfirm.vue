<template>

  <div class="container order_confirm">
    <div class="crumbs">
      当前位置：
      <router-link to="/home">首页</router-link>
      > 行权流程
    </div>

    <div class="order_info">
      <table cellpadding="0" cellspacing="0">
        <thead>
        <tr>
          <td width="327">商品名称</td>
          <td width="200">已选规格</td>
          <td width="160" class="text-center">价格</td>
          <td width="180" class="text-center">购买数量</td>
          <td width="173" class="text-center">邮费</td>
          <td class="text-center">小计</td>
        </tr>
        </thead>

        <tbody>
        <tr v-for="(item, i) in orderDetail.item">
          <td>
            <div class="clearfix product_name">
              <img :src="item.goodsImage.paths[0]" class="coi_fl" width="88">
              <p class="coi_fl product_name">{{item.goodsName}}</p>
            </div>
          </td>
          <td>规格：{{item.specifications}}</td>
          <td class="text-center">
            <p class="coi_price">{{item.cnyPrice.toFixed(4)}} COI</p>
            <p>(￥{{item.goodsPrice.toFixed(2)}})</p>
          </td>
          <td class="text-center">x{{item.goodsNumber}}</td>
          <td class="text-center">￥{{item.freight.toFixed(2)}}</td>
          <td class="text-center" v-if="i === 0" :rowspan="orderDetail.item.length">
            <p class="coi_price">{{orderDetail.coiPriceTotal.toFixed(4)}} COI</p>
            <p>(￥{{orderDetail.cnyPriceTotal.toFixed(2)}})</p>
          </td>
        </tr>
        </tbody>
      </table>

      <div class="order_address clearfix">
        <div class="title coi_fl">
          <img src="../assets/images/icon_local.png">
          收货地址
        </div>

        <div class="address_list coi_fl">
          <ul>
            <li v-for="item in addressList" @click="currentSelectAddress = item.addressId">
              <i :class="{'active':currentSelectAddress === item.addressId}">
                {{currentSelectAddress === item.addressId ? '·' : ''}}
              </i>
              <span>{{item.linkMan}}</span>
              <span>{{item.linkPhone}}</span>
              <span>{{item.detailAddress}}</span>
              <button class="btn change_address_btn" @click="showAddressAlert(2)"
                      v-if="currentSelectAddress === item.addressId">
                修改地址
              </button>
            </li>
          </ul>

          <button class="btn new_address_btn" @click="showAddressAlert(1)">
            使用新地址
          </button>
        </div>
      </div>

      <div class="clearfix">
        <button class="btn submit_btn" @click="addOrder">确定付款</button>
      </div>
    </div>

    <!--地址弹框-->
    <div class="alert" v-if="addressAlertState">
      <div class="address_form">
        <p class="title">
          {{addressFormType === 1 ? '新增收货地址' : '修改收货地址'}}
          <img src="../assets/images/icon_close.png" @click="addressAlertState = false">
        </p>

        <address-form :addressId="addressFormType === 2?currentSelectAddress:false"
                      @submitFun="addOrUpdateAddress"></address-form>
      </div>
    </div>

    <!--确定付款弹框-->
    <trade-alert :balance="balance" ref="tradeAlert"></trade-alert>

  </div>
</template>

<style scoped lang="scss" src="../assets/css/orderConfirm.scss"></style>
<style>
  .trade_input input {
    background: url("../assets/images/icon_jp.png") no-repeat 98% 50%;
  }
</style>

<script>
  import AddressForm from './components/address-form.vue'
  import TradeAlert from './components/trade-alert.vue'

  import * as orderServer from '../api/orderServer'
  import * as addressServer from '../api/addressServer'
  import {showRemindAlert} from '../utils/utils'

  export default {
    data () {
      return {
        orderDetail: [],//订单详情
        addressFormType: 1, //1为添加  2为修改
        addressList: [], //地址列表
        currentSelectAddress: '', //当前选择地址id
        addressAlertState: false, //地址弹框状态
        tradeInput: {type: 'password', placeholder: '请输入交易密码', value: '', class: 'address_input'},
        balance: {}
      }
    },

    methods: {

      //获取订单详情
      setOrderDetail(){
        let params = {
          productId: this.$route.params.productId,
          specificationsId: this.$route.params.specId,
          type: this.$route.params.type || 1
        };

        orderServer.getOrderDetails(params, data => {
          this.orderDetail = data;
        })

      },

      //生成订单
      addOrder(){
        let params = {
          productId: this.$route.params.productId,
          addressId: this.currentSelectAddress,
          number: this.$route.params.number,
          specificationsId: this.$route.params.specId,
        };

        if (!params.addressId) {
          showRemindAlert('warning', '请选择地址');
          return
        }


        orderServer.addOrder(params, (data, err) => {
          if (err) {
            showRemindAlert('warning', err);
            return
          }
          this.$refs.tradeAlert.alertState = true;
          data.amount = parseFloat(data.amount).toFixed(4);
          data.cnyPrice = parseFloat(data.cnyPrice).toFixed(2);
          data.total = parseFloat(data.total).toFixed(4);
          this.balance = data;
        })
      },

      //获取用户地址列表
      getAddressList(){
        addressServer.getAddressList((data) => {
          if (data.item) {
            this.addressList = data.item;
            this.currentSelectAddress = this.addressList[0].addressId;
          }
        });
      },


      //显示地址弹框
      showAddressAlert(type){
        this.addressAlertState = true;
        this.addressFormType = type;
      },

      //添加或修改收货地址
      addOrUpdateAddress(params){
        //判断信息是否填写完整
        if (!params.provinceId || !params.cityId || !params.countyId || !params.isDefault || !params.detailAddress) {
          showRemindAlert('warning', '请填写完整地址信息');
          return
        }

        this.addressAlertState = false;
        let addressFun;

        if (this.addressFormType === 1) {
          addressFun = 'addAddress';
        } else {
          addressFun = 'updateAddress';
          params.addressId = this.currentSelectAddress
        }

        addressServer[addressFun](params, (data, err) => {
          if (err) {
            showRemindAlert('warning', err);
            return
          }

          //重新获取地址列表
          this.getAddressList()
        });
      },
    },
    mounted(){
      this.setOrderDetail();
      this.getAddressList();
    }
    ,
    components: {
      AddressForm, TradeAlert
    }
  }
</script>



