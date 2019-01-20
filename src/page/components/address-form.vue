<template>

  <div>
    <div class="input_item" v-for="item in addressForm">
      <span>{{item.title}}</span>
      <m-input :inputInfo="item" class="coi_fr"></m-input>
    </div>

    <div class="input_item">
      <span>所在地区</span>
      <m-select :width="352" :height="34" :selectList="selectList" :defaultValue="defaultSelectValue"
                :selectClassify="selectClassify" v-if="selectList.data.length" class="coi_fr">
      </m-select>
    </div>

    <div class="input_item clearfix">
      <span>详细地址</span>
      <textarea placeholder="请输入详细地址" v-model="detailAddress"></textarea>
    </div>

    <p class="set_default_address" @click="isSetDefault = !isSetDefault">
      <i :class="{'active':isSetDefault}">
        {{isSetDefault ? '·' : ''}}
      </i>
      设置为默认地址
    </p>
    <button class="btn submit_btn" @click="submit">保存</button>
  </div>

</template>

<style scoped lang="scss">

  .input_item {
    margin-top: 24px;
    position: relative;
    span {
      line-height: 36px;
    }
    textarea {
      width: 332px;
      height: 68px;
      padding: 10px;
      float: right;
      border: 1px solid #ccc;
    }
  }

  .set_default_address {
    margin-top: 10px;
    cursor: pointer;
    i {
      @include selectI();
      top: 3px;
      &.active {
        @include selection();
      }
    }
  }

  .submit_btn {
    margin-top: 25px;
    width: 120px;
    height: 36px;
  }

</style>
<script>

  import MSelect from './m-select.vue'
  import MInput from './m-input.vue'

  import * as addressServer from '../../api/addressServer';
  import {showCheckTip, checkPhone, checkLengthNull} from '../../utils/utils'

  export default {
    props: ['addressId'],
    data () {
      return {
        addressForm: [],
        selectList: {data: [], handle: this.selectHandle},
        selectClassify: [{id: 1, title: '省'}, {id: 2, title: '市'}, {id: 3, title: '区'}], //选择类型
        isSetDefault: '',
        detailAddress: '',
        defaultSelectValue: '',
        selectCityIdResult: []
      }
    },

    methods: {
      //获取省市区
      getArea(areaId){
        let params = {areaId: areaId || 1};
        let _this = this;
        addressServer.getArea(params, function (data) {
          _this.selectList.data = data;
        });
      },

      //选择处理函数
      selectHandle(item, index){
        let id = item ? item.id : 1;
        this.selectCityIdResult[index] = id;
        if (index < this.selectClassify.length - 1) {
          this.getArea(id)
        }
      },

      submit(){
        let checkState = false;
        for (let i = 0, len = this.addressForm.length; i < len; i++) {
          switch (this.addressForm[i].name) {
            case 'username':
              checkState = checkLengthNull(this.addressForm[i].value, this.addressForm[i].title);
              showCheckTip.call(this, this.addressForm[i], checkState);
              break;
            case 'phone':
              checkState = checkPhone(this.addressForm[i].value);
              showCheckTip.call(this, this.addressForm[i], checkState);
              break;
          }
        }
        if (checkState) return false;

        let params = {
          linkMan: this.addressForm[0].value,
          linkPhone: this.addressForm[1].value,
          provinceId: this.selectCityIdResult[0],
          cityId: this.selectCityIdResult[1],
          countyId: this.selectCityIdResult[2],
          detailAddress: this.detailAddress,
          isDefault: this.isSetDefault ? 'S' : 'F'
        };

        this.$emit('submitFun', params)
      }
    },
    mounted(){
      this.getArea();
      this.addressForm = addressServer.getAddressForm();

      if (this.addressId) {
        let _this = this;
        addressServer.getAddressById({addressId: this.addressId}, function (data) {
          _this.addressForm[0].value = data.linkMan;
          _this.addressForm[1].value = data.linkPhone;
          _this.detailAddress = data.detailAddress;
          _this.defaultSelectValue = data.province + data.city + data.county;
          _this.isSetDefault = data.isDefault === 'S';
          _this.selectCityIdResult[0] = data.provinceId;
          _this.selectCityIdResult[1] = data.cityId;
          _this.selectCityIdResult[2] = data.countyId;
        });
      } else {
        this.defaultSelectValue = '请选择地区'
      }
    },
    components: {
      MSelect, MInput
    }
  }
</script>
