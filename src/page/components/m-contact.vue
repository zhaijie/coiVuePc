<template>
  <ul class="contact">
    <li @click="goTop">
      <i class="icon_top"></i>
    </li>
    <li v-for="(item, i) in contactData" @mouseenter="item.showTitleState = true"
        @mouseleave="item.showTitleState = false">
      <i v-if="!item.showTitleState" :class="'contact_icon'+i"></i>
      <span v-if="item.showTitleState">{{item.title}}</span>

      <transition name="contact-fade">
        <div class="contact_info" v-if="item.showTitleState">
          <p>{{item.title}}：{{item.info}}</p>
        </div>
      </transition>
    </li>
  </ul>
</template>
<style scoped lang="scss" src="../../assets/css/public/contact.scss">

</style>
<script>

  import {customerService} from  '../../api/userServer'

  export default {
    props: ['contactData'],
    data () {
      return {}
    },

    methods: {
      goTop(){
        let doc = document;
        doc.body.scrollTop = 0;
        doc.documentElement.scrollTop = 0;
      }
    },

    mounted(){

    }
  }
</script>
