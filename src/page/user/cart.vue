<template>
  <div class="cartBox">
    <div class="cart scrollbar">
      <!-- <div class="cart_header">
  </div> -->
      <table class="cart_table" width="945px" align="center" border="0" cellpadding="0" cellspacing="0">
        <thead class="cart_header">
        <tr height="48px">
          <th width="372px clearfix">
            <div class="cart_allCheck coi_fl">
              <label class="checklist iCheck">
                <input type="checkbox" class="check_box tui-checkbox" value="1" @click="allCheck"
                       :class="{'is_check': isAllCheck}">
                <label class="title">全选</label>
              </label>
            </div>
            <p class="coi_fl cart_proInfoTitle">商品信息</p>
          </th>
          <th>单价</th>
          <th>数量</th>
          <th>合计金额</th>
          <th width="138px">操作</th>
        </tr>
        </thead>

        <tbody v-if="shoppingList.length">
        <tr height="110px" v-for="(item, i) in shoppingList">
          <th width="372px" height="110px" align="left" class="clearfix">
            <div class="cart_itemBox">
              <div class="cart_itemCheck coi_fl">
                <label class="checklist iCheck">
                  <input type="checkbox" class="check_box tui-checkbox" value="1" @click="changeCheck(item)"
                         :class="{'is_check': item.checked}">
                </label>
              </div>
              <img class="coi_fl cart_itemImg " :src="item.goodsImage">
              <div class="coi_fl cart_proInfo">
                <p class="cart_proInfoText">{{item.goodsName}}</p>
                <p class="cart_spec">规格：{{item.specifications}}</p>
              </div>
            </div>
          </th>

          <th>
            <p class="cart_coiPrice">{{item.cnyPrice.toFixed(4)}} COI</p>
            <p>（￥{{item.goodsPrice.toFixed(2)}}）</p>
          </th>
          <th>
            <div class="cart_btnBox" v-if="item.inventory">
              <button class="cart_reduceBtn btn" @click="reduceProduct(item)">-</button>
              <span class="cart_nums">{{item.goodsNumber}}</span>
              <button class="cart_addBtn btn" @click="addProduct(item)">+</button>
            </div>
            <p v-if="!item.inventory">库存补给中</p>
          </th>
          <th>
            <p class="cart_coiPrice">{{(item.cnyPrice * item.goodsNumber).toFixed(4)}} COI</p>
            <p>（￥{{(item.goodsPrice * item.goodsNumber).toFixed(2)}}）</p>
          </th>
          <th width="138px">
            <button class="cart_handleBtn" @click="delShopping(item, i)"></button>
          </th>
        </tr>
        </tbody>
      </table>

      <div v-if="!shoppingList.length" class="notData">
        <img src="../../assets/images/null.png">
      </div>

      <!--失效商品-->
      <div class="err_ProductBox" v-if="loseList.length">
        <p class="err_ProductTitle">失效商品</p>
        <table width="945px" align="center" border="0" cellpadding="0" cellspacing="0">
          <tbody>
          <tr height="110px" v-for="(item,i) in loseList">
            <th width="372px" height="110px" align="left" class="clearfix">
              <div class="cart_itemBox">
                <div class="cart_itemCheck coi_fl">
                  <label class="checklist iCheck">
                    <input type="checkbox" class="check_box tui-checkbox" value="1">
                  </label>
                </div>
                <img class="coi_fl cart_itemImg" :src="item.goodsImage">
                <div class="coi_fl cart_proInfo">
                  <p class="cart_proInfoText">{{item.goodsName}}</p>
                  <p class="cart_spec">规格：{{item.specifications}}</p>
                </div>
              </div>
            </th>
            <th>
              <p class="cart_coiPrice">{{item.cnyPrice.toFixed(4)}} COI</p>
              <p>（￥{{item.goodsPrice.toFixed(2)}}）</p>
            </th>
            <th>
              <div class="cart_btnBox">
                失效商品
              </div>
            </th>
            <th>
              <p class="cart_coiPrice">{{item.cnyPrice.toFixed(4)}} COI</p>
              <p>（￥{{item.goodsPrice.toFixed(2)}}）</p>
            </th>
            <th width="138px">
              <button class="cart_handleBtn" @click="delShopping(item, i)"></button>
            </th>
          </tr>

          </tbody>
        </table>
      </div>

      <div class="cart_menuBox">
        <div class="cart_allCheck ">
          <label class="checklist iCheck">
            <input type="checkbox" class="check_box tui-checkbox" value="1" @click="allCheck"
                   :class="{'is_check': isAllCheck}">
            <label class="title">全选</label>
          </label>
        </div>
        <div class="cart_menuDelete" @click="delShopping()">删除</div>
        <div class="cart_clearErr" @click="clearFailure">清除失效商品</div>

        <div class="total_box">
          <div class="cart_selectShop">已选商品<span class="cart_orange">{{total.num}}</span>件</div>
          <div class="allPayText">
            <p>合计<span>（不含运费）：</span></p>
          </div>
          <div class="allPay">
            <p class="cart_orange">{{total.cnyPrice.toFixed(4)}} COI</p>
            <p class="cart_orange allPay_rmb">(￥{{total.coiPrice.toFixed(2)}})</p>
          </div>
        </div>

        <button class="btn payBtn" @click="goBalance()">结算</button>
      </div>
    </div>
  </div>

</template>
<style scoped lang="scss" src="../../assets/css/cart.scss"></style>
<script>
  import * as cartServer from "../../api/cartServer";
  import {showRemindAlert, showConfirmAlert, objDeepCopy} from '../../utils/utils'

  export default {
    data() {
      return {
        shoppingList: [],
        copyShoppingList: [],
        loseList: [],
        isAllCheck: false,
        total: {
          num: 0,
          cnyPrice: 0,
          coiPrice: 0,
        }
      };
    },

    methods: {

      //增加商品数量
      addProduct(item){
        if (item.goodsNumber === item.inventory) {
          showRemindAlert('warning', '库存数量为' + item.inventory);
          return
        }

        item.goodsNumber++;
        this.setTotal();
      },

      //减少商品数量
      reduceProduct(item){
        if (item.goodsNumber === 1) {
          return
        }
        item.goodsNumber--;
        this.setTotal();
      },

      //删除购物车
      delShopping(item, index){
        let params = {};
        //通过是否传item判断删除全部还是单个
        if (item !== undefined) {
          params.shoppingId = item.shoppingId;
        } else {
          //获取全选删除购物车id
          let shoppingId = [];
          this.shoppingList.forEach(function (v) {
            if (v.checked) {
              shoppingId.push(v.shoppingId);
            }
          });

          if (!shoppingId.length) {
            showRemindAlert('warning', '请选择删除商品');
            return
          }
          params.shoppingId = shoppingId.join(',');
        }

        showConfirmAlert('warning', '是否删除', () => {
          //删除请求
          cartServer.delShopping(params, err => {
            if (err) {
              showRemindAlert('warning', err);
              return
            }
            if (item !== undefined) {
              this.$store.state.shoppingCount--;
              if (item.shelves === 'S') {
                this.shoppingList.splice(index, 1);
                this.setTotal();
              } else {
                this.loseList.splice(index, 1)
              }
            } else {
              this.shoppingList.forEach((v, i) => {
                if (v.checked) {
                  this.shoppingList.splice(i, 1);
                  this.$store.state.shoppingCount--;
                }
              });
              this.setTotal();
              this.isAllCheck = false;
            }
          })
        });
      },

      //单选
      changeCheck(item){
        //判断是否存在库存
        if (item.inventory) {
          if (!item.checked) {
            this.$set(item, 'checked', true);
          } else {
            this.$set(item, 'checked', false);
          }
        } else {
          this.$set(item, 'checked', false);
        }
        this.setTotal();
      },

      //全选
      allCheck(){
        this.isAllCheck = !this.isAllCheck;
        this.shoppingList.forEach((v) => {
          if (this.isAllCheck && v.inventory) {
            this.$set(v, 'checked', true);
            this.setTotal();
          } else {
            this.$set(v, 'checked', false);
            this.total = {
              num: 0,
              cnyPrice: 0,
              coiPrice: 0,
            };
          }
        });
      },

      //结算
      goBalance(){
        let goodsNumber = [];
        let productId = [];
        let specificationsId = [];

        //获取已选择商品
        this.shoppingList.forEach(function (v) {
          if (v.checked) {
            goodsNumber.push(v.goodsNumber);
            productId.push(v.productId);
            specificationsId.push(v.specificationsId);
          }
        });

        //跳转到订单确认
        if (productId.length) {
          this.$router.push({
            name: 'orderConfirm',
            params: {
              productId: productId.join(','),
              specId: specificationsId.join(','),
              number: goodsNumber.join(','),
              type: 2
            }
          });
        } else {
          showRemindAlert('warning', '请选择结算商品');
        }
      },

      //清除已失效购物车
      clearFailure(){
        showConfirmAlert('warning', '是否清除', () => {
          cartServer.delFailure((err) => {
            if (err) {
              showRemindAlert('warning', err);
              return
            }
            this.loseList = [];
          })
        })
      },

      //计算总数量 总价格
      setTotal(){
        //获取已选择商品
        this.total = {
          num: 0,
          cnyPrice: 0,
          coiPrice: 0,
        };
        this.shoppingList.forEach((v) => {
          if (v.checked) {
            this.total.num += v.goodsNumber;
            this.total.coiPrice += (v.goodsPrice * v.goodsNumber);
            this.total.cnyPrice += (v.cnyPrice * v.goodsNumber);
          }
        });
      }
    },
    deactivated(){
      this.copyShoppingList.forEach((v, i) => {
        if (this.shoppingList[i].goodsNumber !== v.goodsNumber) {
          let params = {
            shoppingId: v.shoppingId,
            num: this.shoppingList[i].goodsNumber
          };
          cartServer.changeShoppingCount(params, err => {
            if (err) {
              showRemindAlert('warning', err)
            }
          })
        }
      })
    },

    mounted() {
      cartServer.getShoppingList((cartList, loseList) => {
        this.shoppingList = cartList;
        this.copyShoppingList = objDeepCopy(this.shoppingList);
        this.loseList = loseList;
      })
    },
  };
</script>



