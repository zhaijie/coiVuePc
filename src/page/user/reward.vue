<template>

  <div>
    <div :class="{'table_box':rewordRecord.item.length}">
      <table class="user_table" cellpadding="0" cellspacing="0">
        <thead>
        <tr>
          <td width="154">奖励时间</td>
          <td width="180" class="text-center">奖励金额（COI）</td>
          <td width="180">
            <m-select :height="22" :width="86" :selectList="selectList" class="form_select"></m-select>
          </td>
          <td width="410">奖励详情</td>
        </tr>
        </thead>
        <tbody v-if="rewordRecord.item.length">
        <tr v-for="item in rewordRecord.item">
          <td>{{item.time}}</td>
          <td class="rise_count text-center">+{{item.total.toFixed(4)}}</td>
          <td>{{item.type}}</td>
          <td>{{item.remark}}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-if="!rewordRecord.item.length" class="notData">
      <img src="../../assets/images/null.png">
    </div>


    <m-pagination @getPageData="setRewordRecord" :totalPage="rewordRecord.totalPage"
                  v-if="rewordRecord.totalPage">
    </m-pagination>
  </div>

</template>
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

  import {getRewordRecord} from '../../api/userServer'

  export default {
    data () {
      return {
        rewordRecord: {item: []},
        selectList: {
          data: [
            {id: 0, value: '全部'},
            {id: 1, value: '众筹奖励'},
            {id: 2, value: '文创星球'},
          ],
          handle: this.setType
        },
        currentType: 0
      }
    },

    methods: {
      setRewordRecord(page){
        let params = {
          start: page || 1,
          offset: 12,
          type: this.currentType || 0
        };
        getRewordRecord(params, data => {
          this.rewordRecord = data;
        });
      },
      setType(item){
        this.currentType = item.id;
        this.setRewordRecord(1)
      }
    },

    created(){
      this.setRewordRecord(1)
    },

    components: {
      MPagination, MSelect
    }
  }
</script>



