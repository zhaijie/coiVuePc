<template>

  <div class="invite">
    <div class="invite_info">
      <p>您的专属邀请码：<span>{{inviteData.wdyqm}}</span></p>
      <p>邀请链接：<span>{{inviteData.link}}</span>
        <button class="btn" @click="copyUrl">复制链接</button>
        <input type="text" :value="inviteData.link" id="copyObj">
      </p>
    </div>

    <div class="invite_friend">
      <p class="title">我邀请的好友（{{inviteData.item.length}}）</p>
      <div class="invite_table">
        <div class="table_title clearfix">
          <div>好友名称</div>
          <div>注册账号</div>
          <div>注册时间</div>
        </div>

        <div class="table_body scrollbar" v-if="inviteData.item">
          <div class="table_item clearfix" v-for="item in inviteData.item">
            <div>{{item.xm || '未实名'}}</div>
            <div>{{item.sjh}}</div>
            <div>{{item.zcsj}}</div>
          </div>
        </div>

        <div class="notData" v-if="!inviteData.item">
          <img src="../../assets/images/null.png">
        </div>
      </div>
    </div>

    <img src="../../assets/images/icon_invite.png" class="invite_img">

  </div>
</template>
<style lang="scss">

</style>
<script>

  import {inviteInfo} from '../../api/userServer'
  import {copy} from '../../utils/utils'

  export default {
    data () {
      return {
        inviteData: {item: []}
      }
    },

    methods: {
      //复制邀请链接
      copyUrl(){
        copy()
      },
    },

    mounted(){
      inviteInfo(data => {
          this.inviteData = data
        }
      )
    },

  }
</script>



