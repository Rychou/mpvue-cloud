import Vue from 'vue'
import App from './App'
import WXP from '@/utils/wxp'
import store from '@/store/index'
import '../static/iconfont/iconfont.css'

Vue.config.productionTip = false
App.mpType = 'app'

wx.cloud.init({
  traceUser: true
})

Vue.prototype.WXP = WXP
Vue.prototype.$store = store
Vue.prototype.db = wx.cloud.database({
  env: 'meow-helper-1b5609'
})

const app = new Vue(App)
app.$mount()
