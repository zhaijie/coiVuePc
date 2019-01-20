/**
 * Created by Administrator on 2018/11/8 0008.
 */
import Vue from 'vue'

const AlertConstructor = Vue.extend(require('./m-alert.vue').default); // 直接将Vue组件作为Vue.extend的参数
const AlertInstance = new AlertConstructor({
  data: {
    confirmInfo: {},
    alertState: false
  }
});

export default {
  install: (content) => {
    if (AlertInstance.alertState) {
      AlertInstance.confirmInfo = content;
      // 实例化一个带有content内容的
      AlertInstance.vm = AlertInstance.$mount(); //挂载但是并未插入dom，是一个完整的Vue实例
      AlertInstance.vm.visible = true;
      AlertInstance.dom = AlertInstance.vm.$el;
      document.body.appendChild(AlertInstance.dom);
    }
  },

  create(content){
    AlertInstance.alertState = true;
    this.install(content);
  }
}
//
// let alertInfo = {
//   alertIcon: 'success',
//   alertText: '交易密码设置成功',
//   subText: '',
//   buttons: [
//     {
//       text: '我知道了',
//     }]
// };
// MAlert.create(alertInfo);
