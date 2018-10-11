<template>
  <div class="user-container">
    <div class="user-bg"></div>
    <div class="user-info">
      <button open-type="getUserInfo"
              @getuserinfo="getUserInfo">
        <block v-if="isLogin">
          <open-data type="userAvatarUrl"
                     class="user-avatar"></open-data>
          <open-data type="userNickName"
                     class="user-nickname"></open-data>
        </block>
        <block v-else>
          <i class="iconfont user-avatar icon-my" />
          <div class="user-nickname">点击登录</div>
        </block>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'user-info',
  computed: {
    ...mapGetters([
      'isLogin'
    ])
  },
  methods: {
    handleClick () {

    },
    logout () {
      this.WXP.showModal({
        title: '退出登录',
        content: '您确定要退出登录吗？'
      }).then(res => { })
    },
    getUserInfo (e) {
      wx.cloud
        .callFunction({ name: 'user' })
        .then(res => {
          console.log(res)
          this.$store.commit('updateOpenId', res.result)
          return this.WXP.getSetting()
        })
        .then(res => {
          const authUserInfo = res.authSetting['scope.userInfo']
          if (authUserInfo) {
            this.$store.commit('updateAuthUserInfo', authUserInfo)
          }
        })
        .catch(err => console.error(err))

      if (!this.isLogin) {

      } else {
        // this.logout()
      }
    }
  }
}
</script>

<style scoped lang="scss">
button::after {
  border: none;
}
button {
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
}
.user-container {
  width: 100%;
  position: relative;
  .user-bg {
    width: 100%;
    height: 30vh;
    position: absolute;
    z-index: -1;
    background: #f59aaa;
    // background: linear-gradient(#f59aaa, rgb(204, 228, 248))
  }
  .user-info {
    padding: 40rpx 0; //垂直居中
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #fff;
    box-shadow: 0 0 10rpx gray;
    font-size: 30px;
    color: #fff;
    line-height: 100rpx;
    text-align: center;
  }
  .user-nickname {
    color: #fff;
    margin: 10rpx 0;
  }
}
</style>
