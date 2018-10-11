import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    openId: '',
    authUserInfo: false
  },
  getters: {
    isLogin: (state) => {
      return state.authUserInfo && !!state.openId
    }
  },
  mutations: {
    updateOpenId (state, openId) {
      state.openId = openId
    },
    updateAuthUserInfo (state, authUserInfo) {
      state.authUserInfo = authUserInfo
    }
  }
})

export default store
