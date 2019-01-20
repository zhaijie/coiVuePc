<template>

  <div class="addree">
    【{{addressFormType === 1 ? '新增' : '修改'}}收货地址】
    <div class="address_form">
      <address-form :addressId="currentSelectAddress" @submitFun="addAddress" v-if="renderingState"></address-form>
    </div>

    <div class="address_list">

      <p class="title">【我的收货地址】（{{addressList.length}}/20）</p>

      <table class="user_table" cellpadding="0" cellspacing="0">
        <thead>
        <tr>
          <td width="85">收货人</td>
          <td width="180">所在地方</td>
          <td width="280">详细地址</td>
          <td width="160" class="text-center">手机号码</td>
          <td class="text-center">操作</td>
        </tr>
        </thead>
        <tbody>

        <tr v-for="item in addressList">
          <td>{{item.linkMan}}</td>
          <td>
            <p>{{item.province + item.city}}</p>
            <p>{{item.county}}</p>
          </td>
          <td>{{item.detailAddress}}</td>
          <td class="text-center">{{item.linkPhone}}</td>
          <td>
            <i class="icon_edit" @click="editAddress(item.addressId)"></i>
            <i class="icon_del" @click="delAddress(item.addressId)"></i>

            <button class="btn default_btn" :class="{'is':item.isDefault === 'S'}"
                    @click="setDefaultAddress(item)">
              {{item.isDefault === 'S' ? '默认' : '设为默认'}}
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>
<style scoped lang="scss">
  .address_form {
    padding: 10px 25px 30px;
    width: 430px;
    background-color: $bodyBgColor;
    margin-top: 12px;
  }

  .address_list {
    margin-top: 50px;
    .title {
      margin-bottom: 10px;
    }
    .user_table {
      width: 950px;

      i {
        display: inline-block;
        margin-top: 10px;
        /*margin-left: 15px;*/
        width: 18px;
        height: 18px;
        background: url('../../assets/images/icon_edit.png') no-repeat;
        margin-right: 38px;
        &.icon_del {
          background-position: -48px -10px;
        }

        &.icon_del:hover {
          background-position: -10px -10px;
        }
        &.icon_edit {
          background-position: -10px -48px;
          margin-left: 20px;
        }
      }

      .default_btn {
        width: 64px;
        height: 24px;
        line-height: 24px;
        position: relative;
        top: -5px;
        font-size: 12px;
        &.is {
          background-color: #FCAD3B;
        }
      }
    }
  }

</style>
<script>

  import AddressForm from '../components/address-form.vue'
  import Alert from '../components/alert'

  import {showRemindAlert} from '../../utils/utils'

  import * as addressServer from '../../api/addressServer'

  export default {
    data () {
      return {
        addressList: [],
        currentSelectAddress: '',
        renderingState: true,
        addressFormType: 1  //1是添加 2是修改
      }
    },

    methods: {

      //添加地址
      addAddress(params){
        //判断信息是否填写完整
        if (!params.provinceId || !params.cityId || !params.countyId || !params.isDefault) {
          showRemindAlert('warning', '请填写完整地址信息');
          return
        }

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
          this.resForm();
        });
      },

      resForm(){
        //重新获取地址列表
        this.currentSelectAddress = '';
        this.renderingState = false;
        this.addressFormType = 1;
        this.$nextTick(() => {
          this.renderingState = true;
        });
        this.getAddressList()
      },


      //删除收货地址
      delAddress(addressId){
        let alertInfo = {
          alertText: '是否删除该地址',
          alertType: 'warning',
          buttons: [
            {
              text: '确定', handle: () => {
              addressServer.delAddress({addressId: addressId}, (err) => {
                if (err) {
                  showRemindAlert('warning', err);
                  return
                }
                this.resForm();
              })
            }
            },
            {text: '取消'}
          ]
        };
        Alert.create(alertInfo);
      },

      //设置为默认地址
      setDefaultAddress(item){

        if (item.isDefault === 'S') {
          return
        }

        addressServer.getAddressById({addressId: item.addressId}, (data, err) => {
          data.isDefault = 'S';
          if (!err) {
            addressServer.updateAddress(data, (data, err) => {
              if (err) {
                showRemindAlert('warning', err);
                return
              }
              showRemindAlert('success', '设置成功');
              this.getAddressList();
            })
          }
        });
      },

      //修改地址
      editAddress(addressId){
        this.addressFormType = 2;
        this.currentSelectAddress = addressId;

        this.renderingState = false;
        this.$nextTick(() => {
          this.renderingState = true;
        });
      },

      //获取地址列表
      getAddressList(){
        addressServer.getAddressList(data => {
          this.addressList = data.item
        })
      }
    },

    mounted(){
      this.getAddressList();
    },
    components: {
      AddressForm
    }

  }
</script>



