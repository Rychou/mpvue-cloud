<script>
export default {
  created () {
    // 获取openId
    wx.cloud
      .callFunction({ name: 'user' })
      .then(res => {
        this.$store.commit('updateOpenId', res.result)
      })
      .catch(err => console.error(err))
    this.WXP.getSetting().then(res => {
      console.log(res.authSetting)
      const authUserInfo = res.authSetting['scope.userInfo']
      if (authUserInfo) {
        this.$store.commit('updateAuthUserInfo', authUserInfo)
      }
    })
  }
}
</script>

<style>
page{
  background-color: rgb(204, 228, 248)
}
open-data{
  overflow: hidden;
  display: block;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
