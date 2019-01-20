<template>

  <div>
    <div :class="{'table_box':recordData.item}">

      <table class="user_table" cellpadding="0" cellspacing="0">
        <thead>
        <tr>
          <td width="98">交易时间</td>
          <td width="108">交易单号</td>
          <td width="128" class="text-right">交易金额(COI)</td>
          <td width="128" class="text-right">手续费(COI)</td>
          <td width="226" class="trade_td">交易对方</td>
          <td width="108">
            <m-select :height="22" :width="86" :selectList="selectList" class="form_select"></m-select>
          </td>
          <td width="108">交易状态</td>
        </tr>
        </thead>
        <tbody v-if="recordData.item.length">
        <tr v-for="item in recordData.item">
          <td>{{item.time}}</td>
          <td>{{item.orderNum}}</td>
          <td :class="item.class" class="text-right">{{item.number}}</td>
          <td class="text-right">{{item.cost}}</td>
          <td>
            <div class="trade_td">
              {{item.address}}
            </div>
          </td>
          <td>{{item.type}}</td>
          <td>{{item.status}}</td>
        </tr>
        </tbody>
      </table>

      <div v-if="!recordData.item.length" class="notData">
        <img src="../../assets/images/null.png">
      </div>

    </div>

    <m-pagination @getPageData="tradeCOIRecord" :totalPage="recordData.totalPage"
                  v-if="recordData.totalPage">
    </m-pagination>
  </div>

</template>


<style lang="scss" scoped>
  .trade_td {
    padding-left: 46px
  }

</style>

<style lang="scss">
  .form_select {
    background: #fff;
    color: $fontColor;
    .select_icon {
      top: 4px !important;
      right: 5px !important;
    }
    ul {
      height: auto !important;
    }
  }
</style>
<script>

  import MPagination from '../components/m-pagination.vue'
  import MSelect from '../components/m-select.vue'

  import {getTradeCOIRecord} from '../../api/userServer'

  export default {
    data () {
      return {
        recordData: {item: []},
        selectList: {
          data: [
            {id: 0, value: '全部'},
            {id: 1, value: '转出'},
            {id: 2, value: '转入'},
          ],
          handle: this.setType
        },
        currentType: 0
      }
    },

    methods: {
      tradeCOIRecord(page){
        let params = {
          start: page || 1,
          offset: 12,
          type: this.currentType
        };
        getTradeCOIRecord(params, data => {
          this.recordData = data;
        })
      },

      setType(item){
        this.currentType = item.id;
        this.tradeCOIRecord(1)
      }
    },

    created(){
      this.tradeCOIRecord();
    },

    components: {
      MPagination, MSelect
    }
  }
</script>



