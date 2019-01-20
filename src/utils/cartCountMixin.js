/**
 * Created by Administrator on 2018/11/15 0015.
 */
import {mapActions} from 'vuex'


export const cartCountMixin = {
  data () {
    return {}
  },
  methods: {
    ...mapActions({getShoppingCount: 'SET_SHOPPING_COUNT'}),
  },
};
